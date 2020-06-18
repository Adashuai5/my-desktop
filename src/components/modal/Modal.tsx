import ReactDOM from "react-dom";
import React from "react";
import Draggable from "../draggable/index";

type Props = {
  children: React.ReactChild;
  closeModal?: () => void;
  onDrag: (T: any) => void;
  onDragEnd: () => void;
  data: {
    width: number;
    height: number;
    id: string;
    moveId: string;
    isShow: boolean;
  };
};

const Modal = React.memo(({ children, onDrag, onDragEnd, data }: Props) => {
  const domEl = document.getElementById("main-view") as HTMLDivElement;
  if (!domEl) return null;

  return ReactDOM.createPortal(
    <Draggable domEl={domEl} onDrag={onDrag} onDragEnd={onDragEnd} data={data}>
      {children}
    </Draggable>,
    domEl
  );
});

export default Modal;
