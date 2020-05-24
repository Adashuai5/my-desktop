import ReactDOM from "react-dom";
import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  CSSProperties,
} from "react";

type Props = {
  children: React.ReactChild;
  closeModal: () => void;
  onDrag: (T: any) => void;
  onDragEnd: () => void;
  data: { width: number; height: number };
  id: string;
};
const Modal = React.memo(
  ({ children, closeModal, onDrag, onDragEnd, data, id }: Props) => {
    const localPosition = localStorage.getItem(id) || null;
    const domEl = document.getElementById("main-view") as HTMLDivElement;
    const dragEl = document.getElementById(id) as HTMLDivElement;
    const initPosition = localPosition
      ? JSON.parse(localPosition)
      : {
          x: data.width === -1 ? 0 : (window.innerWidth - data.width) / 2,
          y: data.height === -1 ? 0 : (window.innerHeight - data.height) / 2,
        };
    const [state, setState] = useState({
      isDragging: false,
      origin: { x: 0, y: 0 },
      position: initPosition,
    });

    const handleMouseDown = useCallback(({ clientX, clientY }) => {
      setState((state) => ({
        ...state,
        isDragging: true,
        origin: {
          x: clientX - state.position.x,
          y: clientY - state.position.y,
        },
      }));
    }, []);

    const handleMouseMove = useCallback(
      ({ clientX, clientY }) => {
        let x = clientX - state.origin.x;
        let y = clientY - state.origin.y;
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
        const newPosition = { x, y };
        setState((state) => ({
          ...state,
          position: newPosition,
        }));
        onDrag({ newPosition, domEl });
      },
      [state.origin, dragEl, onDrag, domEl]
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
        localStorage.setItem(id, JSON.stringify(state.position));
      }
    }, [state.isDragging, handleMouseMove, handleMouseUp, id, state.position]);

    const styles = useMemo(
      () => ({
        left: `${state.position.x}px`,
        top: `${state.position.y}px`,
        zIndex: state.isDragging ? 2 : 1,
        position: "absolute",
      }),
      [state.isDragging, state.position]
    );
    if (!domEl) return null;
    return ReactDOM.createPortal(
      <div
        style={styles as CSSProperties}
        onMouseDown={handleMouseDown}
        id={id}
      >
        {children}
      </div>,
      domEl
    );
  }
);

export default Modal;
