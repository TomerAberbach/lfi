import config from 'tomer/eslint'

export default [
  ...config,
  { ignores: [`playground/**/*`, `website/docs/api/**/*`] },
]
