# PaddlePaddle Badges

[![Built with PaddlePaddle](./public/v1/built-with-paddlepaddle/small.svg)](http://paddlepaddle.org)

This project aims to celebrate the contributions of the [PaddlePaddle](http://paddlepaddle.org) community.

Get badges to show off on your sites and READMEs!  
👉 **<https://paddlepaddle-badge.vercel.app>** 👈

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command        | Action                                       |
| :------------- | :------------------------------------------- |
| `pnpm i`       | Installs dependencies                        |
| `pnpm start`   | Starts local dev server at `localhost:4321`  |
| `pnpm build`   | Build your production site to `./dist/`      |
| `pnpm preview` | Preview your build locally, before deploying |

### Data collection

This project uses the GitHub REST API to gather public data about contributions to [the `PaddlePaddle` org](https://github.com/PaddlePaddle/). Data collection is run once per day in a GitHub action and automatically committed to this repository.

You can run `pnpm collect-stats` to run data collection locally (for example to test changes to the script), but should first ensure a `GITHUB_TOKEN` [environment variable](https://docs.astro.build/en/guides/environment-variables/) is set up, containing a GitHub personal access token.
