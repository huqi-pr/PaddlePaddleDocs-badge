import type { InferStaticAPIRoute, InferStaticContext } from '../../../types';
import { contributors, type EnhancedContributor } from "../../../util/getContributors";

export function getStaticPaths() {
  return contributors.map(({ username }) => ({ params: { username } }));
}
export type Context = InferStaticContext<typeof getStaticPaths>;

const icons = {
  commits:
    '',
  issues:
    `<path d="M6 7.125a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z"/>
    <path d="M6 0a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm-4.875 6a4.875 4.875 0 1 0 9.75 0 4.875 4.875 0 0 0-9.75 0Z"/>`,
  pulls:
    '<path d="M4.088 4.865a3.187 3.187 0 0 0 2.85 1.76h1.033a1.688 1.688 0 1 1 0 1.125h-1.034a4.302 4.302 0 0 1-3.187-1.408v2.629a1.688 1.688 0 1 1-1.125 0v-3.942a1.687 1.687 0 1 1 1.463-.163Zm-.9 6.26a.563.563 0 1 0 0-1.125.563.563 0 0 0 0 1.125Zm6.374-3.375a.563.563 0 1 0 0-1.125.563.563 0 0 0 0 1.125Zm-5.812-4.313a.563.563 0 1 0 0 .004v-.004Z"/>',
  reviews:
    '<path d="M 1.313 1.5 h 9.374 c 0.725 0 1.313 0.588 1.313 1.312 v 6.376 a 1.314 1.314 0 0 1 -1.313 1.312 h -4.641 l -1.93 1.93 a 1.097 1.097 0 0 1 -1.19 0.235 a 1.09 1.09 0 0 1 -0.676 -1.008 v -1.157 h -0.938 a 1.313 1.313 0 0 1 -1.312 -1.312 v -6.376 c 0 -0.724 0.588 -1.312 1.313 -1.312 z m -0.188 1.312 v 6.376 c 0 0.103 0.084 0.187 0.188 0.187 h 1.5 a 0.56 0.56 0 0 1 0.562 0.563 v 1.642 l 2.04 -2.04 a 0.561 0.561 0 0 1 0.398 -0.165 h 4.875 a 0.188 0.188 0 0 0 0.187 -0.187 v -6.376 a 0.187 0.187 0 0 0 -0.188 -0.187 h -9.375 a 0.188 0.188 0 0 0 -0.187 0.187 z m 3.96 1.29 a 0.565 0.565 0 0 1 0 0.796 l -1.103 1.102 l 1.103 1.103 a 0.56 0.56 0 0 1 -0.402 0.945 a 0.558 0.558 0 0 1 -0.393 -0.151 l -1.5 -1.499 a 0.565 0.565 0 0 1 0 -0.796 l 1.5 -1.5 a 0.563 0.563 0 0 1 0.795 0 z m 1.83 0 a 0.563 0.563 0 0 1 0.795 0 l 1.5 1.5 a 0.565 0.565 0 0 1 0 0.796 l -1.5 1.499 a 0.56 0.56 0 0 1 -0.795 -0.794 l 1.102 -1.103 l -1.102 -1.102 a 0.565 0.565 0 0 1 0 -0.796 z"/>'
};

const Stat = ({ count, type }: { count: string; type: keyof typeof icons }, i: number) => `<svg x="11" y="${39 + i * 30}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
${icons[type]}
</svg>
<text font-weight="500" font-size="8.5" x="17" y="${61 + i * 30}" text-anchor="middle">${count}</text>`

const Achievement = ({ achievements }: EnhancedContributor['achievements'][number], i: number) =>
`<text x="41" y="${41 + i * 17.5}"><tspan font-weight="500">${achievements[0].title}</tspan> <tspan dx="2" fill="#BFC1C9">${achievements[0].details}</tspan></text>`

export async function getSvg(ctx: Context): Promise<string> {
  const { username } = ctx.params;
  const { achievements, stats, getBase64Avatar } = contributors.find((c) => c.username === username)!;
  const b64 = await getBase64Avatar();

  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 260 156" width="260" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'" direction="ltr">
  <!--solid backdrop-->
  <rect width="259" height="155" x=".5" y=".5" fill="#1A1B1E" rx="3.5"/>
  <!--gradient background-->
  <rect width="259" height="155" x=".5" y=".5" fill="url(#a)" fill-opacity=".5" rx="3.5"/>
  <!--left panel background-->
  <path fill="#17191E" fill-opacity=".5" d="M0 4a4 4 0 0 1 4-4h30v156H4a4 4 0 0 1-4-4V4Z"/>
  <!--gradient border-->
  <rect width="259" height="155" x=".5" y=".5" stroke="url(#a)" rx="3.5"/>
 
   <!--PaddlePaddle logo-->
  <g clip-path="url(#clip0_110_282)">
  <path
      d="M256 0.5H4C2.067 0.5 0.5 2.067 0.5 4V152C0.5 153.933 2.067 155.5 4 155.5H256C257.933 155.5 259.5 153.933 259.5 152V4C259.5 2.067 257.933 0.5 256 0.5Z"
      fill="#1A1B1E" />
  <path
      d="M256 0.5H4C2.067 0.5 0.5 2.067 0.5 4V152C0.5 153.933 2.067 155.5 4 155.5H256C257.933 155.5 259.5 153.933 259.5 152V4C259.5 2.067 257.933 0.5 256 0.5Z"
      fill="url(#paint0_linear_110_282)" fill-opacity="0.5" />
  <path
      d="M0 4C0 2.93913 0.421427 1.92172 1.17157 1.17157C1.92172 0.421427 2.93913 0 4 0L34 0V156H4C2.93913 156 1.92172 155.579 1.17157 154.828C0.421427 154.078 0 153.061 0 152V4Z"
      fill="#17191E" fill-opacity="0.5" />
  <g clip-path="url(#clip1_110_282)">
      <path fill-rule="evenodd" clip-rule="evenodd"
          d="M18.871 132.595C19.5859 132.595 20.1655 132.014 20.1655 131.297C20.1655 130.581 19.5859 130 18.871 130C18.1559 130 17.5764 130.581 17.5764 131.297C17.5764 132.014 18.1559 132.595 18.871 132.595ZM24.826 133.546H22.7547L17.1448 146H19.2162L24.826 133.546ZM31.5579 131.297C31.5579 132.014 30.9782 132.595 30.2633 132.595C29.5482 132.595 28.9687 132.014 28.9687 131.297C28.9687 130.581 29.5482 130 30.2633 130C30.9782 130 31.5579 130.581 31.5579 131.297ZM15.7208 135.103L16.4478 133.546L16.4544 133.546C18.2656 133.546 19.734 135.017 19.734 136.832C19.734 138.648 18.2656 140.119 16.4544 140.119H11.4223L12.2014 138.389H16.4544C17.3124 138.389 18.0079 137.692 18.0079 136.832C18.0079 135.973 17.3606 135.333 16.4976 135.189C16.1465 135.131 15.7208 135.103 15.7208 135.103ZM27.8401 133.546L27.1131 135.103C27.1131 135.103 27.5389 135.131 27.8899 135.189C28.7529 135.333 29.4002 135.973 29.4002 136.832C29.4002 137.692 28.7047 138.389 27.8467 138.389H23.5938L22.8146 140.119H27.8467C29.6579 140.119 31.1263 138.648 31.1263 136.832C31.1263 135.017 29.6579 133.546 27.8467 133.546L27.8401 133.546ZM11.3623 133.546H13.4337L7.82382 146H5.75248L8.40158 140.119H4L4.77915 138.389H9.18073L11.3623 133.546Z"
          fill="white" />
  </g>
  <path
      d="M256 0.5H4C2.067 0.5 0.5 2.067 0.5 4V152C0.5 153.933 2.067 155.5 4 155.5H256C257.933 155.5 259.5 153.933 259.5 152V4C259.5 2.067 257.933 0.5 256 0.5Z"
      stroke="url(#paint1_linear_110_282)" />
  <path
      d="M17 31.5C23.3513 31.5 28.5 26.3513 28.5 20C28.5 13.6487 23.3513 8.5 17 8.5C10.6487 8.5 5.5 13.6487 5.5 20C5.5 26.3513 10.6487 31.5 17 31.5Z"
      stroke="#17191E" stroke-opacity="0.18" />
</g>
  <!--avatar image-->
  <image href="data:image/jpeg;base64,${b64}" x="5" y="8" width="24" height="24" clip-path="url(#avatar-clip)" />
  <!--avatar stroke-->
  <circle cx="17" cy="20" r="11.5" stroke="#17191E" stroke-opacity=".18"/>


  <g fill="white">
    ${stats.map(Stat).join('')}
    <g font-size="10">
      <text x="41" y="22" font-family="'IBM Plex Mono', monospace" font-size="13">@${username}</text>
      ${achievements.slice(0, 7).map(Achievement)}
    </g>
  </g>
  <defs>
    <clipPath id="avatar-clip"><circle cx="17" cy="20" r="12" /></clipPath>
    <linearGradient id="a" x1="0" x2="259.859" y1="156" y2="108.389" gradientUnits="userSpaceOnUse">
      <stop stop-color="#3245FF"/>
      <stop offset="1" stop-color="#BC52EE"/>
    </linearGradient>
  </defs>
</svg>`;
}

export const GET: InferStaticAPIRoute<typeof getStaticPaths> = async (ctx) => {
  const body = await getSvg(ctx);
  return new Response(body, { headers: { 'Content-Type': 'image/svg+xml' }});
}

export const HEAD = GET;
