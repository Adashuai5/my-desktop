module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  plugins: ['stylelint-order'],
  rules: {
    'font-family-no-missing-generic-family-keyword': null,
    'selector-pseudo-class-no-unknown': null,
    'unit-case': null,
    'no-descending-specificity': null
  },
  // 忽略其他文件，只校验样式相关的文件
  ignoreFiles: [
    'node_modules/**/*',
    'public/**/*',
    'dist/**/*',
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts'
  ]
}
