import { useMemo, useState, CSSProperties } from 'react'
import { Dialog, Button } from 'react-desktop/macOs'

interface DialogProps {
  width: number
  height: number
  id: string
  title?: string
  message?: string
  imgSrc?: string
  onCheck: (T: unknown) => void
  onClose: (T: unknown) => void
}

export const useDialog = () => {
  const [isVisible, setIsVisible] = useState(false)
  const openDialog = () => setIsVisible(true)
  const closeDialog = () => setIsVisible(false)
  const RenderDialog = ({
    width,
    height,
    id,
    title,
    message,
    imgSrc,
    onCheck,
    onClose
  }: DialogProps) => {
    const styles = useMemo(
      () => ({
        width: width,
        height: height,
        left: `calc(50vw - ${width / 2}px)`,
        top: `calc(50vh - ${height}px)`,
        borderRadius: 4
      }),
      [width, height]
    )

    const renderIcon = () => {
      if (!imgSrc) return
      return <img src={imgSrc} width="52" height="52" alt="tip" />
    }
    return (
      <>
        {isVisible && (
          <div id={id} style={styles as CSSProperties}>
            <Dialog
              title={title}
              message={message}
              icon={renderIcon()}
              buttons={[
                // eslint-disable-next-line react/jsx-key
                <Button onClick={onClose}>取消</Button>,
                // eslint-disable-next-line react/jsx-key
                <Button color="blue" onClick={onCheck}>
                  确认
                </Button>
              ]}
            />
          </div>
        )}
      </>
    )
  }

  return {
    openDialog,
    closeDialog,
    RenderDialog
  }
}
