import ReactDOM from "react-dom";
import React, { useState, useCallback, useMemo, useEffect } from "react";

type Props = {
  children: React.ReactChild;
  closeModal: () => void;
  onDrag: (T: any) => void;
  onDragEnd: () => void;
};
const Modal = React.memo(
  ({ children, closeModal, onDrag, onDragEnd }: Props) => {
    const translation = {
      x: (window.innerWidth - 684) / 2,
      y: (window.innerHeight - 466) / 2,
    };
    const domEl = document.getElementById("modal-root") as HTMLDivElement;
    const dragEl = document.getElementById("drag-modal") as HTMLDivElement;
    const [state, setState] = useState({
      isDragging: false,
      origin: { x: 0, y: 0 },
      translation,
    });

    const handleMouseDown = useCallback(({ clientX, clientY }) => {
      setState((state) => ({
        ...state,
        isDragging: true,
        origin: { x: clientX, y: clientY },
      }));
    }, []);

    const handleMouseMove = useCallback(
      ({ clientX, clientY }) => {
        let x = clientX - state.origin.x + state.translation.x;
        let y = clientY - state.origin.y + state.translation.y;
        if (x <= 0) {
          x = 0;
        } else if (x > window.innerWidth - dragEl.offsetWidth) {
          x = window.innerWidth - dragEl.offsetWidth;
        }
        if (y <= 0) {
          y = 0;
        } else if (y > window.innerHeight - dragEl.offsetHeight) {
          y = window.innerHeight - dragEl.offsetHeight;
        }
        setState((state) => ({
          ...state,
          translation: { x, y },
        }));
        onDrag({ translation, domEl });
      },
      [state.origin, onDrag, domEl]
    );

    const handleMouseUp = useCallback(() => {
      setState((state) => ({
        ...state,
        isDragging: false,
      }));

      onDragEnd();
    }, [onDragEnd]);

    useEffect(() => {
      if (state.isDragging) {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
      } else {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      }
    }, [state.isDragging, handleMouseMove, handleMouseUp]);

    const styles = useMemo(
      () => ({
        left: `${state.translation.x}px`,
        top: `${state.translation.y}px`,
        transition: state.isDragging ? "none" : "transform 500ms",
        zIndex: state.isDragging ? 2 : 1,
        position: "absolute",
      }),
      [state.isDragging, state.translation]
    );
    if (!domEl) return null;
    return ReactDOM.createPortal(
      <div
        style={styles as object}
        onMouseDown={handleMouseDown}
        id="drag-modal"
      >
        {children}
      </div>,
      domEl
    );
  }
);

export default Modal;
