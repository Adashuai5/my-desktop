import React, { useContext, useState, useEffect, CSSProperties } from "react";
import { useModal } from "../modal/UseModal";
import { FooterContext } from "../footer/Footer";
import {
  View,
  Radio,
  TitleBar,
  Text,
  ListView,
  ListViewRow,
} from "react-desktop/macOs";
import "./index.scss";
import { Iconfont } from "../Iconfont";
/// <reference path="react-desktop.d.ts" />

export const Setting = React.memo(() => {
  const { show, hide, RenderModal } = useModal();
  const positionMap = ["bottom", "top", "left", "right"];
  const setListMap = [{ title: "通用" }];
  const [
    isSettingShow,
    setSettingShow,
    position,
    setPosition,
    props,
    setProps,
    length,
    setLength,
  ] = useContext(FooterContext);
  const optionsMap = [{ title: "图标默认大小", value: length }];
  const [selected, setTitle] = useState("通用");
  useEffect(isSettingShow ? show : hide, [isSettingShow]);
  return (
    <RenderModal
      data={{
        width: 684,
        height: 466,
        id: "SettingView",
        moveId: "SettingMove",
      }}
    >
      <React.Fragment>
        <TitleBar
          id="SettingMove"
          controls
          inset
          isFullscreen={false}
          onCloseClick={() => {
            hide();
            setSettingShow(!isSettingShow);
          }}
          onMinimizeClick={() => {
            hide();
            setSettingShow(!isSettingShow);
          }}
          onMaximizeClick={show}
        ></TitleBar>
        <div className="mainSet">
          <View className="leftSet">
            <ListView>
              {setListMap.map((item, index) => {
                return (
                  <ListViewRow
                    key={item.title + index}
                    onClick={() => setTitle(item.title)}
                    background={selected === item.title ? "#bfbfbf" : null}
                    padding="11px 20px"
                  >
                    <Iconfont
                      type="icon-ios-home"
                      style={{
                        marginRight: "6px",
                      }}
                    />
                    <Text color="#414141" size="14" bold>
                      {item.title}
                    </Text>
                  </ListViewRow>
                );
              })}
            </ListView>
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
                  <div
                    style={{ paddingRight: "24px" } as CSSProperties}
                    key={index + item}
                  >
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
      </React.Fragment>
    </RenderModal>
  );
});
