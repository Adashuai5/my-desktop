import { useState, useCallback, useEffect } from 'react'
import './index.scss'
import { getKEYS, removeZero } from './helper'

const DEFAULT_N1N2 = { n1: '', n2: '' }

const Calculate = () => {
  const [keys, setKeys] = useState<string[]>(getKEYS())
  const [N1N2, setN1OrN2] = useState(DEFAULT_N1N2)
  const [operator, setOperator] = useState('')
  const [result, setResult] = useState('0')

  const getN = useCallback(
    (name: 'n1' | 'n2', text: string): string => {
      const nText = N1N2[name]
      if (text === '.') {
        if (nText === '0' || nText === '') {
          return '0.'
        } else if (nText.includes('.')) {
          return nText
        }
      }

      return nText !== '0' ? nText + text : text
    },
    [N1N2]
  )

  const getNumber = useCallback(
    (name: 'n1' | 'n2', text: string): void => {
      const getN1N2 = { ...N1N2, [name]: getN(name, text) }
      setN1OrN2(getN1N2)
      setResult(
        getN1N2[name].length > 9
          ? removeZero(parseFloat(getN1N2[name]).toPrecision(9))
          : getN1N2[name]
      )
    },
    [N1N2, getN]
  )

  const getResult = useCallback(
    (n1: string, n2: string, operator: string): string => {
      const numberN1: number = parseFloat(n1)
      const numberN2: number = parseFloat(n2)
      const result1: number = parseFloat(result)
      if (operator === '+') {
        return (numberN1 + numberN2).toPrecision(9)
      } else if (operator === '-') {
        return (numberN1 - numberN2).toPrecision(9)
      } else if (operator === '×') {
        return (numberN1 * numberN2).toPrecision(9)
      } else if (operator === '÷') {
        if (numberN2 === 0) {
          return '不是数字'
        }
        return (numberN1 / numberN2).toPrecision(9)
      } else if (operator === '+/-') {
        return (-(result1 || numberN1) || 0).toPrecision(9)
      } else if (operator === '%') {
        return ((result1 || numberN1) / 100 || 0).toPrecision(9)
      }
      return result
    },
    [result]
  )

  const clickButton = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (event.target instanceof HTMLButtonElement) {
        const buttonText = event.target.textContent || ''
        if ('0123456789.'.indexOf(buttonText) >= 0) {
          const a = getKEYS()
          a.shift()
          a.unshift('C')
          setKeys(a)
          getNumber(operator ? 'n2' : 'n1', buttonText)
        } else if ('+-×÷'.indexOf(buttonText) >= 0) {
          setN1OrN2({ ...N1N2, n1: N1N2.n1 || result })
          setOperator(buttonText)
        } else if ('='.indexOf(buttonText) >= 0) {
          if (N1N2.n1 && N1N2.n2) {
            setResult(removeZero(getResult(N1N2.n1, N1N2.n2, operator)))
            setN1OrN2(DEFAULT_N1N2)
            setOperator('')
          }
        } else if (buttonText === 'C') {
          setResult('0')
          setN1OrN2(DEFAULT_N1N2)
          setOperator('')
          setKeys(getKEYS())
        } else if ("%'+/-'".indexOf(buttonText) >= 0) {
          if (N1N2.n1 || result) {
            setResult(removeZero(getResult(N1N2.n1, N1N2.n2, buttonText)))
            setN1OrN2(DEFAULT_N1N2)
          }
        }
      }
    },
    [operator, N1N2, result, getNumber, getResult]
  )

  useEffect(() => setResult(result), [result])

  return (
    <div className="calculator-wrapper">
      <div className="output-wrapper">
        <div className="output">
          <span>{result}</span>
        </div>
      </div>
      <div className="row" onClick={clickButton}>
        {keys.map((text, index) => {
          return (
            <button
              className={
                [0, 1, 2].includes(index)
                  ? 'dark button text-'
                  : [3, 7, 11, 15, 18].includes(index)
                  ? 'orange button text-'
                  : 'button text-' + text
              }
              key={text}
            >
              {text}
            </button>
          )
        })}
      </div>
    </div>
  )
}
export default Calculate
