import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef
} from 'react'
import { useModal } from '../modal/UseModal'
import { FooterContext } from '../footer/Footer'
import { TitleBar } from 'react-desktop/macOs'
import Canvas from './Canvas'
import './index.scss'
/// <reference path="react-desktop.d.ts" />

export const Drawing = React.memo(() => {
  const { open, close, RenderModal } = useModal('DrawingView')
  const [isDrawingOpen, , isDrawingShow, setDrawingShow] =
    useContext(FooterContext)
  const [style, setStyle] = useState({ width: 1000, height: 600 })
  const [isFullscreen, setFullscreen] = useState(false)

  useEffect(
    () => (isDrawingOpen.type ? open() : close()),
    [close, isDrawingOpen, open]
  )

  const maximizeClick = useCallback(() => {
    if (isFullscreen) {
      setStyle({ width: 1000, height: 600 })
    } else {
      setStyle({ width: -1, height: -1 })
    }
    setFullscreen(!isFullscreen)
  }, [isFullscreen])

  const drawingRef = useRef<any>()

  const drawingCloseClick = () => {
    if (drawingRef.current) {
      drawingRef.current.drawingCloseClick()
    }
  }
  return (
    <RenderModal
      data={{
        width: style.width,
        height: style.height,
        id: 'DrawingView',
        moveId: 'DrawingMove',
        isShow: isDrawingShow
      }}
    >
      <div className="drawing-wrapper">
        <TitleBar
          controls
          id="DrawingMove"
          isFullscreen={isFullscreen}
          onCloseClick={drawingCloseClick}
          onMinimizeClick={() => {
            setDrawingShow(false)
          }}
          onMaximizeClick={maximizeClick}
          onResizeClick={maximizeClick}
        />
        <Canvas
          onRef={drawingRef}
          height={isFullscreen ? document.body.clientHeight - 32 : style.height}
          width={isFullscreen ? document.body.clientWidth : style.width}
        />
      </div>
    </RenderModal>
  )
})
