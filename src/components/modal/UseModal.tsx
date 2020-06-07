import React, { useState } from "react";

import Modal from "./Modal";

// Modal组件最基础的两个事件，open/close
export const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const open = () => setIsVisible(true);
  const close = () => setIsVisible(false);

  const RenderModal = ({
    children,
    data,
  }: {
    children: React.ReactChild;
    data: { width: number; height: number; id: string; moveId: string };
  }) => (
    <React.Fragment>
      {isVisible && (
        <Modal
          data={data}
          closeModal={close}
          onDrag={() => console.log("onDrag")}
          onDragEnd={() => console.log("onDragEnd")}
        >
          {children}
        </Modal>
      )}
    </React.Fragment>
  );

  return {
    open,
    close,
    RenderModal,
  };
};
