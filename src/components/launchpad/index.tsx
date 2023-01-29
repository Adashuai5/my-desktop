import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useContext,
  CSSProperties,
  memo
} from 'react'
import { range, inRange } from 'lodash'
import Draggable from '../draggable/index'
import { FooterContext } from '../footer/Footer'
import PrefAppPng from '../footer/image/PrefApp.png'
import ChromePng from '../footer/image/Chrome.png'
import CalculatorPng from '../footer/image/Calculator.png'
import DrawingPng from '../footer/image/Drawing.png'
import './index.scss'
import { Coordinate } from '../../typing'

type Props = {
  dockItemClick: (item: string, index: number) => void
}

const Launchpad = ({ dockItemClick }: Props) => {
  const [isLaunchpadShow, setLaunchpadShow] = useContext(FooterContext)
  const LaunchpadRef = useRef<HTMLDivElement>(null)
  const [dockList] = useState<string[]>([
    PrefAppPng,
    ChromePng,
    CalculatorPng,
    DrawingPng
  ])
  const items = range(dockList.length)
  const [dragState, setDragState] = useState({
    dragging: false,
    order: items,
    dragOrder: items,
    draggedIndex: dockList.length
  })

  const handleDrag = useCallback(
    (translation: Coordinate, id: number) => {
      setDragState((dragState) => ({
        ...dragState,
        dragging: true
      }))
      const delta = Math.round(translation.x / 100)
      const index = dragState.order.indexOf(id)
      if (!inRange(index + delta, 0, items.length)) {
        return
      }
      const dragOrder = dragState.order.filter((index: number) => index !== id)
      dragOrder.splice(index + delta, 0, id)

      setDragState((dragState) => ({
        ...dragState,
        draggedIndex: id,
        dragOrder
      }))
    },
    [dragState.order, items.length]
  )

  const handleDragEnd = useCallback(() => {
    setDragState((dragState) => ({
      ...dragState,
      order: dragState.dragOrder,
      draggedIndex: dockList.length
    }))
  }, [dockList.length])

  const handleKeydown = useCallback(
    (event: { keyCode: number }) => {
      if (event.keyCode === 27 && isLaunchpadShow) {
        setLaunchpadShow(false)
      }
    },
    [isLaunchpadShow, setLaunchpadShow]
  )

  const handleClick = useCallback(
    (event: MouseEvent) => {
      const el = event.target as HTMLElement
      if (!isLaunchpadShow) return
      const LaunchpadItems = document.getElementsByClassName('LaunchpadImg')
      if (!LaunchpadRef.current?.contains(el)) return
      for (let i = 0; i < LaunchpadItems.length; i++) {
        if (LaunchpadItems[i] === el) {
          return
        }
      }
      setLaunchpadShow(false)
    },
    [isLaunchpadShow, setLaunchpadShow]
  )

  const handleItemClick = useCallback(
    (item: string, index: number) => {
      if (!dragState.dragging) {
        dockItemClick(item, index)
      } else {
        setDragState((dragState) => ({
          ...dragState,
          dragging: false
        }))
      }
    },
    [dockItemClick, dragState.dragging]
  )

  useEffect(() => {
    window.addEventListener('click', handleClick)
    window.addEventListener('keyup', handleKeydown)
    return () => {
      window.removeEventListener('click', handleClick)
      window.removeEventListener('keyup', handleKeydown)
    }
  }, [handleClick, handleKeydown, isLaunchpadShow])

  return (
    <div id="Launchpad" ref={LaunchpadRef}>
      <div id="LaunchpadItemWrapper">
        {dockList.map((item, index) => {
          const isDragging = dragState.draggedIndex === index
          const top = dragState.dragOrder.indexOf(index) * 200
          const draggedTop = dragState.order.indexOf(index) * 200
          const picName = item.split('/').pop()
          const name = (picName || '').split('.')[0]

          return (
            <Draggable
              key={index}
              onDrag={(translation) => handleDrag(translation, index)}
              onDragEnd={handleDragEnd}
            >
              <div
                className="LaunchpadItem"
                style={
                  {
                    left: isDragging ? draggedTop : top,
                    transition: isDragging ? 'none' : 'all 500ms'
                  } as CSSProperties
                }
              >
                <div
                  className="LaunchpadImg"
                  style={
                    {
                      backgroundImage: 'url(' + item + ')',
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat'
                    } as CSSProperties
                  }
                  onClick={() => handleItemClick(item, index)}
                />
                <span style={{ color: '#fff' }}>{name}</span>
              </div>
            </Draggable>
          )
        })}
      </div>
    </div>
  )
}

export default memo(Launchpad)
