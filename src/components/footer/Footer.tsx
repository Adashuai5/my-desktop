import React, { useState, useEffect } from "react";
import { dockEffect } from "./effect";
import "./index.scss";
import { useModal } from "../modal/UseModal";
import { View, Radio } from "react-desktop/macOs";

const Footer = React.memo(() => {
  const [dockList] = useState<string[]>([
    "Finder.png",
    "Launchpad.png",
    "PrefApp.png",
    "Terminal.png",
    "Calculator.png",
  ]);
  const positionMap = ["bottom", "top", "left", "right"];
  const [position, setPosition] = useState<string>("bottom");

  const [props, setProps] = useState<object>({
    el: "AppFooter",
    bg: "DockBackground",
    toTag: "img",
    toTagLength: 76,
    type: position,
  });
  useEffect(() => {
    dockEffect(props);
  }, [props]);
  const { show, hide, RenderModal } = useModal();
  return (
    <>
      <RenderModal>
        <View horizontalAlignment="center" direction="column">
          {positionMap.map((item, index) => {
            return (
              <Radio
                key={index + item}
                label={item}
                name={item}
                onChange={(e) => {
                  setPosition(e.target.value);
                  setProps({
                    el: "AppFooter",
                    bg: "DockBackground",
                    toTag: "img",
                    toTagLength: 76,
                    type: e.target.value,
                  });
                }}
                defaultValue={position}
                defaultChecked
              ></Radio>
            );
          })}
        </View>
      </RenderModal>
      <div id="modal-root">
        <button onClick={show}>打开</button>
        <button onClick={hide}>关闭</button>
      </div>
      <img className={position} id="DockBackground"></img>
      <footer className={position} id="AppFooter">
        {dockList.map((item, index) => {
          return (
            <img
              src={require("./image/" + item)}
              alt={item}
              key={index + item}
            />
          );
        })}
      </footer>
    </>
  );
});

export default Footer;
