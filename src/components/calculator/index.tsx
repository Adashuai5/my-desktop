import { lazy, memo, useContext, useEffect, Suspense } from 'react'
import { useModal } from '../modal/UseModal'
import { FooterContext } from '../footer/Footer'
import { TitleBar } from 'react-desktop/macOs'
import './index.scss'
/// <reference path="react-desktop.d.ts" />

const Calculate = lazy(() => import('./Calculator'))

export const Calculator = memo(() => {
  const { open, close, RenderModal } = useModal('CalculatorView')
  const [
    isCalculatorOpen,
    setCalculatorOpen,
    isCalculatorShow,
    setCalculatorShow
  ] = useContext(FooterContext)

  useEffect(
    () => (isCalculatorOpen?.type ? open() : close()),
    [close, isCalculatorOpen, open]
  )
  return (
    <RenderModal
      data={{
        width: 410,
        height: 560,
        id: 'CalculatorView',
        moveId: 'calculatorMove',
        isShow: isCalculatorShow
      }}
    >
      <>
        <TitleBar
          id="calculatorMove"
          transparent
          controls
          isFullscreen={false}
          onCloseClick={() => {
            close()
            setCalculatorOpen({
              ...isCalculatorOpen,
              type: false
            })
          }}
          onMinimizeClick={() => {
            setCalculatorShow(false)
          }}
          onMaximizeClick={open}
        />
        <Suspense fallback={<div>Loading...</div>}>
          <Calculate />
        </Suspense>
      </>
    </RenderModal>
  )
})
