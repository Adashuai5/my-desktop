import { useState, useCallback, useMemo, useEffect, CSSProperties } from 'react'
import * as React from 'react'
import { Coordinate } from '../../typing'

const POSITION = { x: 0, y: 0 }

type Props = {
  children: React.ReactElement
  onDrag: (T: Coordinate) => void
  onDragEnd: () => void
}
const Draggable = ({ children, onDrag, onDragEnd }: Props) => {
  const [state, setState] = useState({
    isDragging: false,
    origin: POSITION,
    translation: POSITION
  })

  const handleMouseDown = useCallback(
    ({ clientX, clientY }: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setState((state) => ({
        ...state,
        isDragging: true,
        origin: { x: clientX, y: clientY }
      }))
    },
    []
  )

  const handleMouseMove = useCallback(
    ({ clientX, clientY }: MouseEvent) => {
      if (!state.isDragging) return

      const translation = {
        x: clientX - state.origin.x,
        y: clientY - state.origin.y
      }

      setState((state) => ({
        ...state,
        translation
      }))

      onDrag(translation)
    },
    [state.isDragging, state.origin.x, state.origin.y, onDrag]
  )

  const handleMouseUp = useCallback(() => {
    setState((state) => ({
      ...state,
      isDragging: false,
      translation: POSITION
    }))

    onDragEnd()
  }, [onDragEnd])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  const styles = useMemo(
    () => ({
      cursor: state.isDragging ? '-webkit-grabbing' : '-webkit-grab',
      transform: `translate(${state.translation.x}px, ${state.translation.y}px)`,
      transition: state.isDragging ? 'none' : 'transform 500ms',
      zIndex: state.isDragging ? 2 : 1
    }),
    [state.isDragging, state.translation]
  )

  return (
    <div
      style={styles as CSSProperties}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
    </div>
  )
}

export default Draggable
