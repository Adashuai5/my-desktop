import React, {
  useState,
  useEffect,
  createContext,
  useReducer,
} from "react";
import { dockEffect, Props } from "./effect";
import "./index.scss";
import { Setting } from "../setting/setting";
import { Calculator } from "../calculator/index";
import { positionReducer, lengthReducer, propsReducer } from "./reducer";
export const FooterContext = createContext<any>([]);

const Footer = React.memo(() => {
  const [dockList] = useState<string[]>([
    "Finder.png",
    "Launchpad.png",
    "PrefApp.png",
    "Chrome.png",
    "Terminal.png",
    "Calculator.png",
  ]);
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
  const [Chrome, setChrome] = useState("" as any);
  const dockItemClick = (item: string, index: number) => {
    switch (item) {
      case "Chrome.png":
        if (!Chrome) {
          const chrome = window.open(
            "http://www.google.com/",
            "",
            "width=1000,height=600,left=500,top=300,menubar=no,toolbar=no,status=no,scrollbars=yes"
          );
          setChrome(chrome);
        } else {
          Chrome.close();
          setChrome("");
        }
        return;
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
  }, [length, position]);

  return (
    <React.Fragment>
      <FooterContext.Provider
        value={[
          isSettingShow,
          setSettingShow,
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
      <FooterContext.Provider value={[isCalculatorShow, setCalculatorShow]}>
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
