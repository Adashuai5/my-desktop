import { useState, useCallback, useMemo, useEffect, CSSProperties } from 'react'
import * as React from 'react'
import { observer } from 'mobx-react'
import store from '../store'
import { MODAL_DATA } from '../../../typing'

type Props = {
  children: React.ReactElement
  domEl: HTMLDivElement
  data: MODAL_DATA
}

const Draggable = ({ children, domEl, data }: Props) => {
  const [zIndex, setZIndex] = useState(store.getIndex(data.id))
  const dragEl = document.getElementById(data.id) as HTMLDivElement
  const moveEl = document.getElementById(data.moveId) as HTMLDivElement
  const localPosition = localStorage.getItem(data.id) || null
  const initPosition = localPosition
    ? JSON.parse(localPosition)
    : {
        x: data.width === -1 ? 0 : (window.innerWidth - data.width) / 2,
        y: data.height === -1 ? 0 : (window.innerHeight - data.height) / 2
      }
  const [state, setState] = useState({
    isDragging: false,
    origin: { x: 0, y: 0 },
    position: initPosition
  })

  const handleSetNewIndex = useCallback(() => {
    store.setNewIndex(data.id)
    setZIndex(store.getIndex(data.id))
  }, [data.id])

  const handleMouseDown = useCallback(
    ({ clientX, clientY }: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setState((state) => ({
        ...state,
        isDragging: true,
        origin: {
          x: clientX - state.position.x,
          y: clientY - state.position.y
        }
      }))
    },
    []
  )

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      const { clientX, clientY, target } = event
      if (!state.isDragging || (moveEl && target !== moveEl)) return
      let x = clientX - state.origin.x
      let y = clientY - state.origin.y
      if (x <= 0) {
        x = 0
      } else if (x > window.innerWidth - dragEl.offsetWidth) {
        x = window.innerWidth - dragEl.offsetWidth
      }
      if (y <= 0) {
        y = 0
      } else if (y > window.innerHeight - dragEl.offsetHeight) {
        y = window.innerHeight - dragEl.offsetHeight
      }
      const newPosition = { x, y }
      setState((state) => ({
        ...state,
        position: newPosition
      }))
    },
    [state.isDragging, state.origin, moveEl, dragEl]
  )

  const handleMouseUp = useCallback(() => {
    if (state.isDragging) {
      setState((state) => ({
        ...state,
        isDragging: false
      }))
    }
  }, [state.isDragging])

  useEffect(() => {
    if (data.width === -1) {
      setState({
        isDragging: false,
        origin: { x: 0, y: 0 },
        position: { x: 0, y: 0 }
      })
    }

    if (data.isShow) {
      handleSetNewIndex()
    }
  }, [data.isShow, data.width, handleSetNewIndex])

  useEffect(() => {
    if (!domEl) return
    domEl.addEventListener('mousemove', handleMouseMove)
    domEl.addEventListener('mouseup', handleMouseUp)
    return () => {
      domEl.removeEventListener('mousemove', handleMouseMove)
      domEl.removeEventListener('mouseup', handleMouseUp)
      if (data.width !== -1) {
        localStorage.setItem(data.id, JSON.stringify(state.position))
      }
    }
  }, [
    domEl,
    handleMouseMove,
    handleMouseUp,
    data.id,
    data.width,
    state.position
  ])

  const styles = useMemo(
    () => ({
      left: `${state.position.x}px`,
      top: `${state.position.y}px`,
      zIndex,
      display: data.isShow ? 'block' : 'none',
      position: 'absolute',
      'border-bottom-left-radius': '5px',
      'border-bottom-right-radius': '5px'
    }),
    [state.position.x, state.position.y, zIndex, data.isShow]
  )

  return (
    <div
      id={data.id}
      style={styles as CSSProperties}
      onMouseDown={handleMouseDown}
      onClick={handleSetNewIndex}
    >
      {children}
    </div>
  )
}

export default observer(Draggable)
