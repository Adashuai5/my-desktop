import ReactDOM from 'react-dom'
import * as React from 'react'
import Draggable from './draggable/index'
import { MODAL_DATA } from './type'

type Props = {
  children: React.ReactChild
  closeModal?: () => void
  data: MODAL_DATA
}

const Modal = React.memo(({ children, data }: Props) => {
  const domEl = document.getElementById('main-view') as HTMLDivElement
  if (!domEl) return null

  return ReactDOM.createPortal(
    <Draggable domEl={domEl} data={data}>
      {children}
    </Draggable>,
    domEl
  )
})

export default Modal
