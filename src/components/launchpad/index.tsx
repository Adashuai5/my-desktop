import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  CSSProperties,
} from "react";
import {range, inRange} from "lodash";
import Draggable from "../draggable/index";
import {FooterContext} from "../footer/Footer";
import "./index.scss";

type Props = {
  isVisible: boolean;
  dockItemClick: (item: string, index: number) => void;
};

export const Launchpad = ({isVisible, dockItemClick}: Props) => {
  const [dockList] = useState<string[]>([
    "PrefApp",
    "Chrome",
    "Calculator",
    "Drawing",
  ]);
  const [isLaunchpadShow, setLaunchpadShow] = useContext(FooterContext);
  const items = range(dockList.length);
  const [dragState, setDragState] = useState({
    dragging: false,
    order: items,
    dragOrder: items,
    draggedIndex: null,
  });

  const handleDrag = useCallback(
    ({translation, id}) => {
      setDragState((dragState) => ({
        ...dragState,
        dragging: true,
      }));
      const delta = Math.round(translation.x / 100);
      const index = dragState.order.indexOf(id);
      const dragOrder = dragState.order.filter((index: number) => index !== id);

      if (!inRange(index + delta, 0, items.length)) {
        return;
      }

      dragOrder.splice(index + delta, 0, id);

      setDragState((dragState) => ({
        ...dragState,
        draggedIndex: id,
        dragOrder,
      }));
    },
    [dragState.order, items.length]
  );

  const handleDragEnd = useCallback(() => {
    setDragState((dragState) => ({
      ...dragState,
      order: dragState.dragOrder,
      draggedIndex: null,
    }));
  }, []);

  const handleKeydown = useCallback(
    ({keyCode}) => {
      if (keyCode === 27 && isVisible) {
        setLaunchpadShow(!isLaunchpadShow);
      }
    },
    [setLaunchpadShow, isLaunchpadShow, isVisible]
  );

  const handleClick = useCallback(
    ({target}) => {
      if (!isVisible) return;
      const LaunchpadItems = document.getElementsByClassName("LaunchpadImg");
      for (let i = 0; i < LaunchpadItems.length; i++) {
        if (LaunchpadItems[i] === target) {
          return;
        }
      }
      setLaunchpadShow(!isLaunchpadShow);
    },
    [setLaunchpadShow, isLaunchpadShow, isVisible]
  );

  useEffect(() => {
    window.addEventListener("click", handleClick);
    window.addEventListener("keyup", handleKeydown);
    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keyup", handleKeydown);
    };
  }, [handleKeydown, handleClick, setLaunchpadShow, isLaunchpadShow]);

  return (
    <>
      {isVisible && (
        <div id="Launchpad">
          <div id="LaunchpadItemWrapper">
            {dockList.map((item, index) => {
              const isDragging = dragState.draggedIndex === index;
              const top = dragState.dragOrder.indexOf(index) * 200;
              const draggedTop = dragState.order.indexOf(index) * 200;
              return (
                <Draggable
                  key={index}
                  id={index}
                  onDrag={handleDrag}
                  onDragEnd={handleDragEnd}
                >
                  <div
                    className="LaunchpadItem"
                    style={
                      {
                        left: isDragging ? draggedTop : top,
                        transition: isDragging ? "none" : "all 500ms",
                      } as CSSProperties
                    }
                  >
                    <div
                      className="LaunchpadImg"
                      style={
                        {
                          backgroundImage:
                            "url(" +
                            require("../footer/image/" + item + ".png") +
                            ")",
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                        } as CSSProperties
                      }
                      onClick={() => {
                        if (!dragState.dragging) {
                          dockItemClick(item + ".png", index);
                        } else {
                          setDragState((dragState) => ({
                            ...dragState,
                            dragging: false,
                          }));
                        }
                      }}
                    />
                    <span style={{color: "#fff"}}>{item}</span>
                  </div>
                </Draggable>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
