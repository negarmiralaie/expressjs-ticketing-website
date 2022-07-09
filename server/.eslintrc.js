module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'linebreak-style': 0,
    'no-this-async': 0,
    'no-invalid-this': 0,
    // 'no-class-methods-use-this': 0,
    'no-console': 0,
    'no-unused-vars': 0,
    'no-underscore-dangle': 0,
    'no-trailing-spaces': 0,
    'no-unused-expressions': 0,
    'no-plusplus': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    'no-return-assign': 0,
    'no-unused-labels': 0,
    'no-file-extension': 0,
    'no-object-destructuring': 0,
  },
};
