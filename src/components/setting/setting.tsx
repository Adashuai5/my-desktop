import React, { useContext } from "react";
import { useModal } from "../modal/UseModal";
import { FooterContext } from "../footer/Footer";
import { View, Radio } from "react-desktop/macOs";
/// <reference path="react-desktop.d.ts" />

export const Setting = React.memo(() => {
  const positionMap = ["bottom", "top", "left", "right"];
  const { show, hide, RenderModal } = useModal();
  const [
    position,
    setPosition,
    props,
    setProps,
    length,
    setLength,
  ] = useContext(FooterContext);
  return (
    <>
      <RenderModal>
        <View>
          {positionMap.map((item, index) => {
            return (
              <Radio
                key={index + item}
                label={item}
                name={item}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPosition({ name: "change", position: e.target.value });
                  setProps({
                    name: "change",
                    props: {
                      el: "AppFooter",
                      bg: "DockBackground",
                      toTag: "img",
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
      </RenderModal>
      <div id="modal-root">
        <button onClick={show}>打开</button>
        <button onClick={hide}>关闭</button>
      </div>
    </>
  );
});
