import { useState, useCallback } from 'react'
import * as React from 'react'

import Modal from './Modal'
import store from './store'

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
    ({
      children,
      data
    }: {
      children: React.ReactChild
      data: {
        width: number
        height: number
        id: string
        moveId: string
        isShow: boolean
      }
    }) => {
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
