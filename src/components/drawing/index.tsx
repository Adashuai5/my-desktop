import {
  memo,
  lazy,
  Suspense,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef
} from 'react'
import { useModal } from '../modal/UseModal'
import { FooterContext } from '../footer/Footer'
import { TitleBar } from 'react-desktop/macOs'
import './index.scss'
/// <reference path="react-desktop.d.ts" />

const Canvas = lazy(() => import('./Canvas'))

interface RefObject {
  drawingCloseClick: () => void
}

export const Drawing = memo(() => {
  const { open, close, RenderModal } = useModal('DrawingView')
  const [isDrawingOpen, , isDrawingShow, setDrawingShow] =
    useContext(FooterContext)
  const [style, setStyle] = useState({ width: 1000, height: 600 })
  const [isFullscreen, setFullscreen] = useState(false)

  useEffect(
    () => (isDrawingOpen?.type ? open() : close()),
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

  const drawingRef = useRef<RefObject>()

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
        <Suspense fallback={null}>
          <Canvas
            onRef={drawingRef}
            height={isFullscreen ? window.innerHeight - 32 : style.height}
            width={isFullscreen ? window.innerWidth : style.width}
          />
        </Suspense>
      </div>
    </RenderModal>
  )
})
