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
    const domEl = document.getElementById("modal-root");
    const [state, setState] = useState({
      isDragging: false,
      origin: { x: 0, y: 0 },
      translation: { x: "50%", y: "50%" },
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
        const translation = {
          x: clientX - state.origin.x + "px",
          y: clientY - state.origin.y + "px",
        };

        setState((state) => ({
          ...state,
          translation,
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
        cursor: state.isDragging ? "-webkit-grabbing" : "-webkit-grab",
        transform: `translate(${state.translation.x}, ${state.translation.y})`,
        transition: state.isDragging ? "none" : "transform 500ms",
        zIndex: state.isDragging ? 2 : 1,
        position: state.isDragging ? "absolute" : "relative",
      }),
      [state.isDragging, state.translation]
    );
    if (!domEl) return null;
    return ReactDOM.createPortal(
      <div style={styles as object} onMouseDown={handleMouseDown}>
        {children}
      </div>,
      domEl
    );
  }
);

export default Modal;
