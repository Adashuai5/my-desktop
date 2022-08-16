export const getKEYS = () => [
  'AC',
  '+/-',
  '%',
  '÷',
  '7',
  '8',
  '9',
  '×',
  '4',
  '5',
  '6',
  '-',
  '1',
  '2',
  '3',
  '+',
  '0',
  '.',
  '='
]

export const removeZero = (text: string) => {
  text = /\.\d+?0+$/g.test(text) ? text.replace(/0+$/g, '') : text
  return text
    .replace(/\.0+$/g, '')
    .replace(/\.0+e/, 'e')
    .replace(/0+e/, 'e')
    .replace(/\.$/, '')
}
