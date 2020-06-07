import React, { useMemo, useState, CSSProperties } from "react";
import { Dialog, Button } from "react-desktop/macOs";
/// <reference path="react-desktop.d.ts" />

interface DialogProps {
  width: number;
  height: number;
  id: string;
  title?: string;
  message?: string;
  imgSrc?: string;
  onCheck: (T: any) => void;
  onClose: (T: any) => void;
}

export const useDialog = () => {
  const [isVisible, setIsVisible] = useState(false);
  const openDialog = () => setIsVisible(true);
  const closeDialog = () => setIsVisible(false);
  const RenderDialog = ({
    width,
    height,
    id,
    title,
    message,
    imgSrc,
    onCheck,
    onClose,
  }: DialogProps) => {
    const styles = useMemo(
      () => ({
        width: width,
        height: height,
        left: `calc(50vw - ${width / 2}px)`,
        top: `calc(50vh - ${height}px)`,
        borderRadius: 4,
      }),
      [width, height]
    );

    const renderIcon = () => {
      if (!imgSrc) return;
      return (
        <img
          src={require("../footer/image/" + imgSrc)}
          width="52"
          height="52"
          alt="tip"
        />
      );
    };
    return (
      <React.Fragment>
        {isVisible && (
          <div id={id} style={styles as CSSProperties}>
            <Dialog
              title={title}
              message={message}
              icon={renderIcon()}
              buttons={[
                <Button onClick={onClose}>取消</Button>,
                <Button color="blue" onClick={onCheck}>
                  确认
                </Button>,
              ]}
            />
          </div>
        )}
      </React.Fragment>
    );
  };

  return {
    openDialog,
    closeDialog,
    RenderDialog,
  };
};
