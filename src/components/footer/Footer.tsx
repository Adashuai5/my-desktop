import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  createContext,
  useReducer,
  CSSProperties,
} from "react";
import "./index.scss";
import { Setting } from "../setting/Setting";
import { Calculator } from "../calculator/index";
import { Drawing } from "../drawing/index";
import { positionReducer, lengthReducer } from "./reducer";
export const FooterContext = createContext<any>([]);

const Footer = React.memo(() => {
  const [dockList] = useState<string[]>([
    "Finder.png",
    "Launchpad.png",
    "PrefApp.png",
    "Chrome.png",
    "Terminal.png",
    "Calculator.png",
    "Drawing.png",
  ]);
  const [position, setPosition] = useReducer(positionReducer, "bottom");
  const [length, setLength] = useReducer(lengthReducer, 76);
  const [isSettingShow, setSettingShow] = useState(false);
  const [isCalculatorShow, setCalculatorShow] = useState(false);
  const [isDrawingShow, setDrawingShow] = useState(false);
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
      case "Drawing.png":
        setDrawingShow(!isDrawingShow);
        return;
    }
  };

  const [dockStyle, setDockStyle] = useState({
    width: length * dockList.length,
    height: length,
  });

  const dockRef = useRef<HTMLDivElement>(null);

  const getOffset = useCallback(
    (el: HTMLElement, offset: "top" | "left"): number => {
      const elOffset = offset === "top" ? el.offsetTop : el.offsetLeft;
      if (el.offsetParent == null) {
        return elOffset;
      }
      return elOffset + getOffset(el.offsetParent as HTMLElement, offset);
    },
    []
  );

  const mousemove = useCallback(
    ({ clientX, clientY }) => {
      if (!dockRef.current) {
        return;
      }
      const imgList = dockRef.current.childNodes;
      let dockBackgroundLength = 0;
      for (let i = 0; i < imgList.length; i++) {
        const img = imgList[i] as HTMLImageElement;
        let x, y;
        if (position === "bottom" || position === "left") {
          x = img.offsetLeft + length / 2 - clientX;
          y =
            img.offsetTop +
            getOffset(dockRef.current, "top") +
            img.offsetHeight / 2 -
            clientY;
        } else {
          x = img.offsetTop + length / 2 - clientY;
          y =
            img.offsetLeft +
            getOffset(dockRef.current, "left") +
            img.offsetWidth / 2 -
            clientY;
        }
        let imgScale = 1 - Math.sqrt(x * x + y * y) / (imgList.length * length);
        if (imgScale < 0.5) {
          imgScale = 0.5;
        }
        img.width = length * 2 * imgScale;
        dockBackgroundLength = dockBackgroundLength + img.width;
      }

      if (position === "bottom" || position === "top") {
        setDockStyle({
          ...dockStyle,
          ...{ width: dockBackgroundLength },
        });
      } else {
        setDockStyle({
          ...dockStyle,
          ...{ height: dockBackgroundLength },
        });
      }
    },
    [position, length, getOffset, dockStyle]
  );

  const mouseleave = useCallback(() => {
    if (!dockRef.current) {
      return;
    }
    if (position === "bottom" || position === "top") {
      setDockStyle({
        width: length * dockList.length,
        height: length,
      });
    } else {
      setDockStyle({
        width: length,
        height: length * dockList.length,
      });
    }
    const imgList = dockRef.current.childNodes;
    for (let i = 0; i < imgList.length; i++) {
      const img = imgList[i] as HTMLImageElement;
      img.width = length;
    }
  }, [position, length, setDockStyle, dockList]);

  useEffect(() => {
    if (!dockRef.current) {
      return;
    }
    const dockBackground: HTMLDivElement = dockRef.current;
    dockBackground.addEventListener("mousemove", mousemove);
    dockBackground.addEventListener("mouseleave", mouseleave);
    return () => {
      dockBackground.removeEventListener("mousemove", mousemove);
      dockBackground.removeEventListener("mouseleave", mouseleave);
    };
  }, [mousemove, mouseleave, position, length]);

  return (
    <React.Fragment>
      <FooterContext.Provider
        value={[
          isSettingShow,
          setSettingShow,
          position,
          setPosition,
          length,
          setLength,
        ]}
      >
        <Setting />
      </FooterContext.Provider>
      <FooterContext.Provider value={[isCalculatorShow, setCalculatorShow]}>
        <Calculator />
      </FooterContext.Provider>
      <FooterContext.Provider value={[isDrawingShow, setDrawingShow]}>
        <Drawing />
      </FooterContext.Provider>
      <footer className={position} id="AppFooter">
        <div
          id="Docker"
          ref={dockRef}
          className={position}
          style={dockStyle as CSSProperties}
        >
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
        </div>
      </footer>
    </React.Fragment>
  );
});

export default Footer;
