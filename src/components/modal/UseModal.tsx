import React, { useState } from "react";

import Modal from "./Modal";
import store from "./store";

// Modal组件最基础的两个事件，open/close
export const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [id, setId] = useState("");
  const initId = (id: string) => {
    if (!id) return;
    setId(id);
  };
  const open = () => {
    setIsVisible(true);
    store.addModal(id);
  };
  const close = () => {
    setIsVisible(false);
    store.removeModal(id);
  };

  const RenderModal = ({
    children,
    data,
  }: {
    children: React.ReactChild;
    data: {
      width: number;
      height: number;
      id: string;
      moveId: string;
      isShow: boolean;
    };
  }) => {
    initId(data.id);
    return (
      <>
        {isVisible && (
          <Modal data={data} closeModal={close}>
            {children}
          </Modal>
        )}
      </>
    );
  };

  return {
    open,
    close,
    RenderModal,
  };
};
