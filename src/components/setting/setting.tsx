import React, { useContext, useState, useEffect } from "react";
import { useModal } from "../modal/UseModal";
import { FooterContext } from "../footer/Footer";
import { View, Radio, TitleBar, Toolbar, Text } from "react-desktop/macOs";
import "./index.scss";
/// <reference path="react-desktop.d.ts" />
export const Setting = React.memo(() => {
  const positionMap = ["bottom", "top", "left", "right"];
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
  const [isFullscreen, setFullscreen] = useState(false);
  useEffect(isSettingShow ? show : hide, [isSettingShow]);
  return (
    <React.Fragment>
      <div id="modal-root">
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
                <Toolbar height="43" horizontalAlignment="center" />
              </TitleBar>
            </View>
            <View className="rightSet">
              <Text bold>Dock 所在屏幕位置</Text>
              <View>
                {positionMap.map((item, index) => {
                  return (
                    <Radio
                      key={index + item}
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
