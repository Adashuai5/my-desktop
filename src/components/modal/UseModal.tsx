import React, { useState, useCallback } from 'react'

import Modal from './Modal'
import store from './store'
import { MODAL_DATA } from '../../typing'

// Modal组件最基础的两个事件，open/close
export const useModal = (id: string) => {
  const [isVisible, setIsVisible] = useState(false)

  const open = useCallback(() => {
    setIsVisible(true)
    store.addModal(id)
  }, [id])

  const close = useCallback(() => {
    setIsVisible(false)
    store.removeModal(id)
  }, [id])

  const RenderModal = useCallback(
    ({ children, data }: { children: React.ReactElement; data: MODAL_DATA }) => {
      return (
        <>
          {isVisible && (
            <Modal data={data} closeModal={close}>
              {children}
            </Modal>
          )}
        </>
      )
    },
    [close, isVisible]
  )

  return {
    open,
    close,
    RenderModal
  }
}
