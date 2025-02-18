import { Octokit } from '@octokit/core';
import type { Endpoints } from '@octokit/types';
import { writeFile } from 'node:fs/promises';
import { minimatch } from 'minimatch';
import pRretry from 'p-retry';
import type { Contributor } from '../src/types';

type APIData<T extends keyof Endpoints> = Endpoints[T]['response']['data'];
type Repo = APIData<'GET /orgs/{org}/repos'>[number];
type CustomCategories = {
  [key: string]: {
    [key: string]: string[]
  },
}
interface AugmentedRepo extends Repo {
  reviews: APIData<'GET /repos/{owner}/{repo}/pulls/comments'>;
  issues: APIData<'GET /repos/{owner}/{repo}/issues'>;
}

const retry: typeof pRretry = (fn, opts) =>
  pRretry(fn, {
    onFailedAttempt: (e) =>
      console.log(
        `Attempt ${e.attemptNumber} failed. There are ${e.retriesLeft} retries left.\n `,
        e.message
      ),
    ...opts,
  });

class StatsCollector {
  #org: string;
  #app: Octokit;
  #customCategories: CustomCategories;

  constructor(opts: { org: string; token: string | undefined, customCategories: CustomCategories}) {
    this.#org = opts.org;
    this.#app = new Octokit({ auth: opts.token });
    this.#customCategories = opts.customCategories;
  }

  async run() {
    const repos = await this.#getReposWithExtraStats();

    const contributors: Record<string, Contributor> = {};

    console.log('Processing data...');
    for (const repo of repos) {
      for (const issue of repo.issues) {
        const { user, pull_request, labels } = issue;
        if (!user) {
          console.warn(`No user found for ${repo.full_name}#${issue.number}`);
          continue;
        }
        const { avatar_url, login } = user;
        const contributor =
          contributors[login] =
            contributors[login] || this.#newContributor({ avatar_url });
        if (pull_request) {
          contributor.pulls[repo.name] =
            (contributor.pulls[repo.name] || 0) + 1;
          if (pull_request.merged_at) {
            contributor.merged_pulls[repo.name] =
              (contributor.merged_pulls[repo.name] || 0) + 1;
            if (labels.length) {
              if (!contributor.merged_pulls_by_label[repo.name]) {
                contributor.merged_pulls_by_label[repo.name] = {};
              }
                for (const label of labels) {
                  const name = typeof label === 'string' ? label : label.name;
                  if (!name) continue;
                  contributor.merged_pulls_by_label[repo.name]![name] = 
                    (contributor.merged_pulls_by_label[repo.name]![name] || 0) + 1;
                }
            }
          }
        } else {
          contributor.issues[repo.name] =
            (contributor.issues[repo.name] || 0) + 1;
        }
      }

      /** Temporary store for deduplicating multiple reviews on the same PR. */
      const reviewedPRs: Record<string, Set<string>> = {};

      const customCategories = this.#customCategories;

      for (const review of repo.reviews) {
        const { user, pull_request_url, path } = review;
        if (!user) {
          console.warn(`No user found for PR review: ${review.url}`);
          continue;
        }
        const { avatar_url, login } = user;
        const contributor =
          contributors[login] =
            contributors[login] || this.#newContributor({ avatar_url });
        const contributorReviews =
          reviewedPRs[login] = reviewedPRs[login] || new Set();
        if (!contributorReviews.has(pull_request_url)) {
          contributor.reviews[repo.name] =
            (contributor.reviews[repo.name] || 0) + 1;

          if (!contributor.reviews_by_category[repo.name]) {
            contributor.reviews_by_category[repo.name] = {};
          }

          for (const categoryName in customCategories) {
            for (const repoName in customCategories[categoryName]) {
              if (repoName !== repo.name) continue;
              for (const glob of customCategories[categoryName]![repoName]!) {
                if (minimatch(path, glob)) {
                  contributor.reviews_by_category[repo.name]![categoryName] =
                    (contributor.reviews_by_category[repo.name]![categoryName] || 0) + 1;
                }
              }
            }
          }
          contributorReviews.add(pull_request_url);
        }
      }
    }
    console.log('Done processing data!');

    console.log('Writing to disk...');
    await this.#writeData(contributors);
    console.log('Mission complete!');
  }

  #newContributor({ avatar_url }: { avatar_url: string }): Contributor {
    return { avatar_url, issues: {}, pulls: {}, merged_pulls: {}, merged_pulls_by_label: {}, reviews: {}, reviews_by_category: {} };
  }

  async #getRepos() {
    const request = () =>
      this.#app.request(`GET /orgs/{org}/repos`, {
        org: this.#org,
        type: 'sources',
      });
    return (await retry(request)).data.filter((repo) => !repo.private);
  }

  async #getAllIssues(repo: string, page = 1) {
    if (page === 1) console.log(`Fetching issues for ${this.#org}/${repo}...`);
    const per_page = 100;

    const { data: issues, headers } = await retry(() =>
      this.#app.request('GET /repos/{owner}/{repo}/issues', {
        owner: this.#org,
        repo,
        page,
        per_page,
        state: 'all',
      })
    );

    if (headers.link?.includes('rel="next"')) {
      const nextPage = await this.#getAllIssues(repo, page + 1);
      issues.push(...nextPage);
    }

    if (page === 1)
      console.log(
        `Done fetching ${issues.length} issues for ${this.#org}/${repo}`
      );
    return issues;
  }

  async #getAllReviews(repo: string, page = 1) {
    if (page === 1)
      console.log(`Fetching PR reviews for ${this.#org}/${repo}...`);
    const per_page = 100;

    const { data: reviews, headers } = await retry(() =>
      this.#app.request('GET /repos/{owner}/{repo}/pulls/comments', {
        owner: this.#org,
        repo,
        page,
        per_page,
      })
    );

    if (headers.link?.includes('rel="next"')) {
      const nextPage = await this.#getAllReviews(repo, page + 1);
      reviews.push(...nextPage);
    }

    if (page === 1)
      console.log(
        `Done fetching ${reviews.length} PR reviews for ${this.#org}/${repo}`
      );
    return reviews;
  }

  async #getReposWithExtraStats() {
    console.log('Fetching repos...');
    const repos = await this.#getRepos();
    console.log('Done fetching repos!');
    const reposWithStats: AugmentedRepo[] = [];
    for (const repo of repos) {
      reposWithStats.push({
        ...repo,
        issues: await this.#getAllIssues(repo.name),
        reviews: await this.#getAllReviews(repo.name),
      });
    }
    return reposWithStats;
  }

  async #writeData(data: any) {
    return await writeFile(
      'src/data/contributors.json',
      JSON.stringify(data),
      'utf8'
    );
  }
}

const collector = new StatsCollector({
  org: 'PaddlePaddle',
  token: process.env.GITHUB_TOKEN,
  customCategories: {}
});
await collector.run();
