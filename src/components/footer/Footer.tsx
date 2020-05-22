import React, { useState, useEffect, createContext, useReducer } from "react";
import { dockEffect, Props } from "./effect";
import "./index.scss";
import { Setting } from "../setting/setting";
import { Calculator } from "../calculator/index";

export const FooterContext = createContext<any>([]);
interface PositionAction {
  name: "change";
  position: "bottom" | "top" | "left" | "right";
}
interface PropsAction {
  name: "change";
  props: Props;
}
interface lengthAction {
  name: "change";
  length: number;
}

const Footer = React.memo(() => {
  const [dockList] = useState<string[]>([
    "Finder.png",
    "Launchpad.png",
    "PrefApp.png",
    "Terminal.png",
    "Calculator.png",
  ]);
  const positionReducer = (state: string, action: PositionAction) => {
    switch (action.name) {
      case "change":
        return action.position;
      default:
        return state;
    }
  };
  const propsReducer = (state: Object, action: PropsAction) => {
    switch (action.name) {
      case "change":
        return action.props;
      default:
        return state;
    }
  };
  const lengthReducer = (state: Object, action: lengthAction) => {
    switch (action.name) {
      case "change":
        return action.length;
      default:
        return state;
    }
  };

  const [position, setPosition] = useReducer(positionReducer, "bottom");

  const [length, setLength] = useReducer(lengthReducer, 76);

  const [props, setProps] = useReducer(propsReducer, {
    el: "AppFooter",
    bg: "DockBackground",
    toTag: "img",
    toTagLength: length,
    type: position,
  });
  const [isSettingShow, setSettingShow] = useState(false);
  const [isCalculatorShow, setCalculatorShow] = useState(false);
  const dockItemClick = (item: string, index: number) => {
    switch (item) {
      case "PrefApp.png":
        setSettingShow(!isSettingShow);
        return;
      case "Calculator.png":
        setCalculatorShow(!isCalculatorShow);
        return;
    }
  };

  useEffect(() => {
    dockEffect(props as Props);
  }, [props]);
  return (
    <React.Fragment>
      <FooterContext.Provider
        value={[
          isSettingShow,
          position,
          setPosition,
          props,
          setProps,
          length,
          setLength,
        ]}
      >
        <Setting />
      </FooterContext.Provider>
      <FooterContext.Provider value={[isCalculatorShow]}>
        <Calculator />
      </FooterContext.Provider>
      <img className={position} id="DockBackground" alt=""></img>
      <footer className={position} id="AppFooter">
        {dockList.map((item, index) => {
          return (
            <img
              src={require("./image/" + item)}
              alt={item}
              key={index + item}
              onClick={() => dockItemClick(item, index)}
            />
          );
        })}
      </footer>
    </React.Fragment>
  );
});

export default Footer;
