module.exports = {
  extends: ['mantine', 'plugin:prettier/recommended'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
    'prettier/prettier': ['error', { semi: false }],
  },
};
