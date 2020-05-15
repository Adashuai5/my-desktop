import React from 'react'
import ReactDOM from 'react-dom'

type Props = {
  children: React.ReactChild
  closeModal: () => void
}

const Modal = React.memo(({ children, closeModal }: Props) => {
  const domEl = document.getElementById('modal-root')

  if (!domEl) return null
  return ReactDOM.createPortal(
    <div>
      <button onClick={closeModal}>Close</button>
      {children}
    </div>,
    domEl
  )
})

export default Modal