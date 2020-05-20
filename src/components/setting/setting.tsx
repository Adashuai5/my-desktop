import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useModal } from "../modal/UseModal";
import { dragElement } from "./drag";

import { FooterContext } from "../footer/Footer";
import {
  View,
  Radio,
  TitleBar,
  Toolbar,
  Text,
  ListView,
  ListViewRow,
} from "react-desktop/macOs";
import "./index.scss";
/// <reference path="react-desktop.d.ts" />

export const Setting = React.memo(() => {
  const positionMap = ["bottom", "top", "left", "right"];
  const setListMap = [{ title: "通用" }];
  const { show, hide, RenderModal } = useModal();
  const [
    isSettingShow,
    position,
    setPosition,
    props,
    setProps,
    length,
    setLength,
  ] = useContext(FooterContext);
  const optionsMap = [{ title: "图标默认大小", value: length }];
  const [isFullscreen, setFullscreen] = useState(false);
  useEffect(isSettingShow ? show : hide, [isSettingShow]);
  const [selected, setTitle] = useState("通用");
  const POSITION = { x: 0, y: 0 };
  const [state, setState] = useState({
    isDragging: false,
    origin: POSITION,
    position: { top: "50%", left: "50%" },
  });
  const handleMouseDown = useCallback(({ clientX, clientY }) => {
    setState((state) => ({
      ...state,
      isDragging: true,
      origin: {
        x: clientX,
        y: clientY,
      },
    }));
  }, []);
  const [dragEl, setDragEl] = useState(
    document.getElementById("model-root") as HTMLDivElement
  );
  const handleMouseMove = useCallback(
    ({ clientX, clientY }) => {
      console.log(dragEl);
      const position = {
        top: clientY - state.origin.y,
        left: clientX - state.origin.x,
      };
      // 控制拖拽物体的范围只能在浏览器视窗内，不允许出现滚动条
      if (position.left < 0) {
        position.left = 0;
      } else if (position.left > window.innerWidth - dragEl.offsetWidth) {
        position.left = window.innerWidth - dragEl.offsetWidth;
      }
      if (position.top < 0) {
        position.top = 0;
      } else if (position.top > window.innerHeight - dragEl.offsetHeight) {
        position.top = window.innerHeight - dragEl.offsetHeight;
      }
      setState((state) => ({
        ...state,
        position: {
          top: position.top + "px",
          left: position.left + "px",
        },
      }));
    },
    [state.origin]
  );
  const handleMouseUp = useCallback(() => {
    setState((state) => ({
      ...state,
      isDragging: false,
    }));
  }, []);
  useEffect(() => {
    if (state.isDragging) {
      setDragEl(document.getElementById("model-root") as HTMLDivElement);
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
      transition: state.isDragging ? "none" : "transform 500ms",
      zIndex: state.isDragging ? 2 : 1,
      top: state.position.top,
      left: state.position.left,
    }),
    [state.isDragging]
  );
  return (
    <React.Fragment>
      <div
        id="modal-root"
        onMouseDown={handleMouseDown}
        style={styles}
        onMouseUp={handleMouseUp}
      >
        <RenderModal>
          <div className="SettingView">
            <View className="leftSet">
              <TitleBar
                className="TitleBar"
                controls
                inset
                isFullscreen={isFullscreen}
                onCloseClick={hide}
                onMinimizeClick={hide}
                onMaximizeClick={show}
                onResizeClick={() => setFullscreen(!isFullscreen)}
              >
                <Toolbar
                  height="24"
                  horizontalAlignment="center"
                  verticalAlignment="center"
                />
                <ListView className="ListView" width="172">
                  {setListMap.map((item, index) => {
                    return (
                      <ListViewRow
                        key={item.title + index}
                        onClick={() => setTitle(item.title)}
                        background={selected === item.title ? "#bfbfbf" : null}
                        padding="11px 20px"
                      >
                        <svg
                          x="0px"
                          y="0px"
                          width="18"
                          height="12"
                          viewBox="0 0 18 16"
                          style={{ marginRight: "6px" }}
                        >
                          <path
                            fill="#727476"
                            d="M13.2,0H4.9L0,6.8v3.7C0,11.3,0.7,12,1.5,12h15
                  c0.8,0,1.5-0.7,1.5-1.5V6.8L13.2,0z M13.8,6.8L12.3,9L5.9,9L4.2,6.8l-3.1,0l4.2-6h7.4l4.2,6L13.8,6.8z"
                          />
                          <polygon
                            fill="#C9CBCD"
                            points="13.8,6.8 12.3,9 5.9,9 4.2,6.8 1.2,6.7 5.4,0.8 12.8,0.8
                  17,6.7 "
                          />
                        </svg>
                        <Text color="#414141" size="14" bold>
                          {item.title}
                        </Text>
                      </ListViewRow>
                    );
                  })}
                </ListView>
              </TitleBar>
            </View>
            <View className="rightSet">
              <Text bold marginBottom="10px" size="20">
                {selected}
              </Text>
              <div className="divide"></div>
              {optionsMap.map((item, index) => {
                return (
                  <div className="options" key={index + item.value}>
                    <Text bold marginBottom="10px">
                      {item.title}
                    </Text>
                    <input
                      min="25"
                      max="128"
                      type="range"
                      value={length}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setLength({
                          name: "change",
                          length: e.target.value,
                        });
                        setProps({
                          name: "change",
                          props: {
                            ...props,
                            toTagLength: e.target.value,
                            type: position,
                          },
                        });
                      }}
                    />
                    <span>{length}</span>
                  </div>
                );
              })}

              <Text bold>Dock 所在屏幕位置</Text>
              <View>
                {positionMap.map((item, index) => {
                  return (
                    <div style={{ paddingRight: "24px" }} key={index + item}>
                      <Radio
                        label={item}
                        name={item}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setPosition({
                            name: "change",
                            position: e.target.value,
                          });
                          setProps({
                            name: "change",
                            props: {
                              ...props,
                              toTagLength: length,
                              type: e.target.value,
                            },
                          });
                        }}
                        defaultValue={item}
                        defaultChecked={item === position}
                      ></Radio>
                    </div>
                  );
                })}
              </View>
            </View>
          </div>
        </RenderModal>
      </div>
    </React.Fragment>
  );
});
