module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true
    }
  },
  ignorePatterns: ['.eslintrc.js'],
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
    mocha: true
  },
  globals: {
    cy: true,
    Cypress: true
  },
  extends: ['airbnb', 'airbnb/hooks', 'prettier', 'prettier/react'],
  plugins: ['react', 'jsx-a11y', 'simple-import-sort', 'import', 'prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'warn',
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/static-property-placement': 'off',
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'import/extensions': [
      'warn',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never'
      }
    ],
    'sort-imports': 'off',
    'import/first': 'warn',
    'import/newline-after-import': 'warn',
    'import/no-duplicates': 'warn',
    'import/no-unresolved': 'warn',
    'no-param-reassign': ['warn', { props: false }],
    'no-underscore-dangle': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['warn'],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['warn'],
    'react/jsx-filename-extension': 'off',
    'func-names': 'off'
  },
  settings: {
    'import/core-modules': ['webpack', 'dotenv'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.json']
      },
      alias: {
        map: [['@', './']]
      },
      typescript: { alwaysTryTypes: true }
    },
    'import/extensions': ['.js', '.ts', '.mjs', '.jsx', '.tsx']
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-shadow': 'off',
        'no-shadow': ['error']
      }
    },
    {
      files: ['cypress/**/*.{js,ts}'],
      rules: {
        'no-return-assign': 'off',
        '@typescript-eslint/no-unused-vars': 'off'
      }
    },
    {
      files: ['**/*.test.{js,jsx,ts,tsx}'],
      rules: {
        'react/jsx-filename-extension': 'off',
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'global-require': 'off'
      }
    }
  ]
};
