import React, { useContext, useState, useEffect } from "react";
import { useModal } from "../modal/UseModal";
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
  useEffect(isSettingShow ? show : hide, [isSettingShow]);
  const [selected, setTitle] = useState("通用");
  return (
    <React.Fragment>
      <RenderModal data={{ width: 684, height: 466 }}>
        <div className="SettingView">
          <View className="leftSet">
            <TitleBar
              className="TitleBar"
              controls
              inset
              isFullscreen={false}
              onCloseClick={hide}
              onMinimizeClick={hide}
              onMaximizeClick={show}
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
    </React.Fragment>
  );
});
