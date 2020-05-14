import React, { useState, useEffect } from "react";
import { dockEffect } from "./effect";
import { Radio } from "antd";
import "./index.scss";

const Footer = () => {
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
    toTag: "img",
    toTagLength: 76,
    type: position,
  });
  useEffect(() => {
    dockEffect(props);
  }, []);
  return (
    <>
      <Radio.Group
        onChange={(e) => {
          setPosition(e.target.value);
          setProps({
            el: "AppFooter",
            toTag: "img",
            toTagLength: 76,
            type: e.target.value,
          });
        }}
        value={position}
      >
        {positionMap.map((item, index) => {
          return (
            <Radio value={item} key={index + item}>
              {item}
            </Radio>
          );
        })}
      </Radio.Group>
      <img className={"DockBackground " + position}></img>
      <footer className={"AppFooter " + position}>
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
};

export default Footer;
