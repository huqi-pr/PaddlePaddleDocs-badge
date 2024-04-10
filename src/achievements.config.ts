import { AchievementSpec } from './util/achievementsHelpers';

export default AchievementSpec({
  'repos-with-merges': {
    getCount: ({ merged_pulls }) => Object.keys(merged_pulls).length,
    achievements: [
      { count: 2, title: 'Gemini', details: 'PRs in 2 PaddlePaddle repos' },
      { count: 3, title: 'Paddlenomer', details: 'PRs in 3 PaddlePaddle repos' },
      {
        count: 6,
        title: 'Craftsman',
        details: 'PRs in 6 PaddlePaddle repos',
      },
    ],
  },
  'total-reviews': {
    stat: 'reviews',
    achievements: [
      { count: 2, title: 'Spot Check', details: 'Reviewed 2+ PRs' },
      { count: 100, title: 'Copilot', details: 'Reviewed 100+ PRs' },
      { count: 1024, title: 'PR Perfectionist', details: 'Reviewed 1024+ PRs' },
    ],
  },
  'paddle-merges': {
    repo: 'Paddle',
    stat: 'merges',
    achievements: [
      { count: 1, title: 'Space Cadet', details: 'First Paddle PR' },
      { count: 50, title: 'Technician', details: '50+ Paddle PRs' },
      { count: 300, title: 'Rocket Scientist', details: '300+ Paddle PRs' },
    ],
  },
  'docs-merges': {
    repo: 'docs',
    stat: 'merges',
    achievements: [
      { count: 1, title: 'Docs Padawan', details: 'First docs PR' },
      { count: 10, title: 'Scholar', details: '10+ docs PRs' },
      { count: 30, title: 'Galactic Librarian', details: '30+ docs PRs' },
    ],
  },
  'Paddle-Lite-merges': {
    repo: 'Paddle-Lite',
    stat: 'merges',
    achievements: [
      { count: 1, title: 'Lite Ace', details: 'First Lite PR' },
      { count: 50, title: 'Lite Specialist', details: '50+ Lite PRs' },
      { count: 300, title: 'Lite Maestro', details: '300+ Lite PRs' },
    ],
  },
  'PaddleHub-merges': {
    repo: 'PaddleHub',
    stat: 'merges',
    achievements: [
      { count: 1, title: 'Junior Alchemist', details: 'First PaddleHub PR' },
      { count: 10, title: 'Adept Alchemist', details: '10+ PaddleHub PRs' },
      { count: 100, title: 'Master Alchemist', details: '100+ PaddleHub PRs' },
    ],
  },
  'ERNIE-merges': {
    repo: 'ERNIE',
    stat: 'merges',
    achievements: [
      { count: 1, title: 'Visionary', details: 'First ERNIE PR' },
      { count: 5, title: 'Pioneer', details: '5+ ERNIE PRs' },
      { count: 15, title: 'Innovator', details: '15+ ERNIE PRs' },
    ],
  },
  'PaddleSpeech-merges': {
    repo: 'PaddleSpeech',
    stat: 'merges',
    achievements: [
      { count: 1, title: 'Trailblazer', details: 'First PaddleSpeech PR' },
      { count: 5, title: 'Articulator', details: '5+ PaddleSpeech PRs' },
      { count: 80, title: 'Soundwave', details: '80+ PaddleSpeech PRs' },
    ],
  },
  'Paddle2ONNX-merges': {
    repo: 'Paddle2ONNX',
    stat: 'merges',
    achievements: [
      { count: 1, title: 'Converter', details: 'First Paddle2ONNX PR' },
      { count: 5, title: 'Transformer', details: '5+ Paddle2ONNX PRs' },
      { count: 99, title: 'BridgeBuilder', details: '99+ Paddle2ONNX PRs' },
    ],
  },
  'X2Paddle-merges': {
    repo: 'X2Paddle',
    stat: 'merges',
    achievements: [
      { count: 1, title: 'X-Converter', details: 'First X2Paddle PR' },
      { count: 5, title: 'X-Transformer', details: '5+ X2Paddle PRs' },
      { count: 99, title: 'X-BridgeBuilder', details: '99+ X2Paddle PRs' },
    ],
  },

  'HappyOpenSource-merges': {
    stat: 'merged_pulls_by_label',
    label: 'HappyOpenSource',
    achievements: [
      { count: 1, title: 'Just for Funs', details: '1 HappyOpenSource PRs' },
      { count: 5, title: 'Commit or Treat', details: '5+ HappyOpenSource PRs' },
      { count: 99, title: 'Enjoy Open', details: '99+ HappyOpenSource PRs' },
    ],
  },
  'total-issues': {
    stat: 'issues',
    achievements: [
      { count: 1, title: 'Little Green Bug', details: 'Opened an issue' },
      { count: 10, title: 'Pest Control', details: 'Opened 10+ issues' },
      { count: 200, title: 'Entomologist', details: 'Opened 200+ issues' },
    ],
  },
});
