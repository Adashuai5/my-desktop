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
  data: { width: number; height: number; id: string; moveId: string };
};

const Modal = React.memo(
  ({ children, closeModal, onDrag, onDragEnd, data }: Props) => {
    const domEl = document.getElementById("main-view") as HTMLDivElement;
    if (!domEl) return null;
    const dragEl = document.getElementById(data.id) as HTMLDivElement;
    const moveEl = document.getElementById(data.moveId) as HTMLDivElement;
    const localPosition = localStorage.getItem(data.id) || null;
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
      ({ clientX, clientY, target }) => {
        if (!state.isDragging || (moveEl && target !== moveEl)) return;
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
      [state.isDragging, state.origin, moveEl, dragEl, onDrag, domEl]
    );

    const handleMouseUp = useCallback(() => {
      if (state.isDragging) {
        setState((state) => ({
          ...state,
          isDragging: false,
        }));

        onDragEnd();
      }
    }, [state.isDragging, onDragEnd]);

    useEffect(() => {
      if (data.width === -1) {
        setState({
          isDragging: false,
          origin: { x: 0, y: 0 },
          position: { x: 0, y: 0 },
        });
      }
    }, [data.width]);

    useEffect(() => {
      if (!domEl) return;
      domEl.addEventListener("mousemove", handleMouseMove);
      domEl.addEventListener("mouseup", handleMouseUp);
      return () => {
        domEl.removeEventListener("mousemove", handleMouseMove);
        domEl.removeEventListener("mouseup", handleMouseUp);
        if (data.width !== -1) {
          localStorage.setItem(data.id, JSON.stringify(state.position));
        }
      };
    }, [
      domEl,
      handleMouseMove,
      handleMouseUp,
      data.id,
      data.width,
      state.position,
    ]);

    const styles = useMemo(
      () => ({
        left: `${state.position.x}px`,
        top: `${state.position.y}px`,
        zIndex: state.isDragging ? 2 : 1,
        position: "absolute",
      }),
      [state.isDragging, state.position]
    );

    return ReactDOM.createPortal(
      <div
        style={styles as CSSProperties}
        onMouseDown={handleMouseDown}
        id={data.id}
      >
        {children}
      </div>,
      domEl
    );
  }
);

export default Modal;
