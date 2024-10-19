import config from 'tomer/eslint'

export default [
  ...config,
  {
    files: [`docs/**/*`],
    rules: { 'unicorn/filename-case': `off` },
  },
]
