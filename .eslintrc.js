module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    // 'comma-dangle': [2, 'never'],
    // 'import/extensions': 0,
    // 'import/no-extraneous-dependencies': 0,
    // 'import/no-unresolved': 0,
    // 'max-len': [1, {code: 128, ignoreComments: true}],
    // 'no-param-reassign': [2, {props: false}],
    // 'no-underscore-dangle': [2, {allow: ['_id']}],
    // 'no-unused-vars': [2, {args: 'none'}],
    // 'no-use-before-define': [2, {functions: false}],
    // 'object-curly-spacing': [2, 'never']
  },
  overrides: [
    {
      files: '*.spec.js',
      env: {
        mocha: true,
        jest: true
      }
    }
  ]
};
