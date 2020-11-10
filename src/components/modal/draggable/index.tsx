import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  CSSProperties,
} from "react";
import { observer } from "mobx-react";
import store from "../store";

type Props = {
  children: React.ReactChild;
  domEl: HTMLDivElement;
  data: {
    width: number;
    height: number;
    id: string;
    moveId: string;
    isShow: boolean;
  };
};
const Draggable = ({ children, domEl, data }: Props) => {
  const [zIndex, setZIndex] = useState(1);

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

  const handleMouseDown = useCallback(
    ({ clientX, clientY }) => {
      setZIndex(zIndex + store.queue.length + 1);
      setState((state) => ({
        ...state,
        isDragging: true,
        origin: {
          x: clientX - state.position.x,
          y: clientY - state.position.y,
        },
      }));
    },
    [zIndex]
  );

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
    },
    [state.isDragging, state.origin, moveEl, dragEl]
  );

  const handleMouseUp = useCallback(() => {
    if (state.isDragging) {
      setState((state) => ({
        ...state,
        isDragging: false,
      }));
    }
  }, [state.isDragging]);

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
      zIndex,
      display: data.isShow ? "block" : "none",
      position: "absolute",
    }),
    [state.position.x, state.position.y, zIndex, data.isShow]
  );

  return (
    <div
      id={data.id}
      style={styles as CSSProperties}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
};

export default observer(Draggable);
