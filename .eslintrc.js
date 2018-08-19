module.exports = {
  extends: ['airbnb-base', 'plugin:react/all'],
  plugins: [ 'react' ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'spaced-comment': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': ['error', { 'props': false }],
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
    'max-len': ['warn', 100, 2, {
      ignoreUrls: true,
      ignoreComments: true,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    'react/jsx-indent': ['warn', 2],
    'react/jsx-indent-props': ['warn', 2],
    'react/jsx-no-literals': 'off',
    'react/jsx-child-element-spacing': 'off',
    'react/forbid-prop-types': 'off',
    'class-methods-use-this': ['warn', { exceptMethods: [ 'render', 'shouldComponentUpdate' ] } ],
    'react/no-set-state': 'off',
    'react/destructuring-assignment': 'off',
    'react/no-access-state-in-setstate': 'off',
    'react/jsx-handler-names': 'off',
    "react/jsx-max-props-per-line": ['warn', { "maximum": 2, "when": 'always' }],
    'react/jsx-one-expression-per-line': 'off',
    'react/forbid-component-props': 'off',
    'react/jsx-max-depth': [ 'warn', { max: 3 }],
    'react/prefer-stateless-function': 'off',
  },
  env: {
    node: true,
    browser: true,
  }
}
