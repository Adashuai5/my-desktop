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

interface OpenTypes {
  type: boolean;
  index?: number;
}

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
  const [length, setLength] = useReducer(lengthReducer, 78);
  const [isSettingOpen, setSettingOpen] = useState<OpenTypes>({
    type: false,
  });
  const [isCalculatorOpen, setCalculatorOpen] = useState<OpenTypes>({
    type: false,
  });
  const [isDrawingOpen, setDrawingOpen] = useState<OpenTypes>({
    type: false,
  });
  const [isSettingShow, setSettingShow] = useState(true);
  const [isCalculatorShow, setCalculatorShow] = useState(true);
  const [isDrawingShow, setDrawingShow] = useState(true);
  const [isChrome, setChrome] = useState<any>(null);

  const dockItemClick = useCallback(
    (item: string, index: number) => {
      if (!dockRef.current) {
        return;
      }
      const imgList = dockRef.current.childNodes;
      const img = imgList[index] as HTMLDivElement;
      switch (item) {
        case "Chrome.png":
          if (!isChrome) {
            const chrome = window.open(
              "http://www.google.com/",
              "",
              "width=1000,height=600,left=500,top=300,menubar=no,toolbar=no,status=no,scrollbars=yes"
            );
            setChrome(chrome);
          } else {
            isChrome.close();
            setChrome(null);
          }
          return;
        case "PrefApp.png":
          if (!isSettingOpen.type) {
            img.classList.add("bounce");
            setTimeout(() => {
              setSettingOpen({ type: !isSettingOpen.type, index });
              img.classList.remove("bounce");
            }, 2500);
            return;
          }
          setSettingShow(!isSettingShow);
          return;
        case "Calculator.png":
          if (!isCalculatorOpen.type) {
            img.classList.add("bounce");
            setTimeout(() => {
              setCalculatorOpen({ type: !isCalculatorOpen.type, index });
              img.classList.remove("bounce");
            }, 2500);
            return;
          }
          setCalculatorShow(!isCalculatorShow);
          return;
        case "Drawing.png":
          if (!isDrawingOpen.type) {
            img.classList.add("bounce");
            setTimeout(() => {
              setDrawingOpen({ type: !isDrawingOpen.type, index });
              img.classList.remove("bounce");
            }, 2500);
            return;
          }
          setDrawingShow(!isDrawingShow);
          return;
      }
    },
    [
      isSettingOpen,
      isSettingShow,
      isCalculatorOpen,
      isCalculatorShow,
      isDrawingOpen,
      isDrawingShow,
      isChrome,
    ]
  );

  const [dockStyle, setDockStyle] = useState({});

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
      for (let i = 0; i < imgList.length; i++) {
        const img = imgList[i] as HTMLDivElement;
        let x, y;
        if (position === "bottom") {
          x = img.offsetLeft + length / 2 - clientX;
          y =
            img.offsetTop +
            getOffset(dockRef.current, "top") +
            img.offsetHeight / 2 -
            clientY;
        } else if (position === "right") {
          x = img.offsetTop + length / 2 - clientY;
          y =
            img.offsetLeft +
            getOffset(dockRef.current, "left") +
            img.offsetWidth / 2 -
            clientX;
        } else {
          x = img.offsetTop + length / 2 - clientY;
          y = img.offsetLeft + length / 2 - clientX;
        }
        let imgScale = 1 - Math.sqrt(x * x + y * y) / (imgList.length * length);
        if (imgScale < 0.5) {
          imgScale = 0.5;
        }
        img.style.height = img.style.width = length * 2 * imgScale + "px";
      }
    },
    [position, length, getOffset]
  );

  const mouseleave = useCallback(() => {
    if (!dockRef.current) {
      return;
    }
    if (position === "bottom" || position === "top") {
      setDockStyle({
        height: length + 10,
      });
    } else {
      setDockStyle({
        width: length + 10,
      });
    }
    const imgList = dockRef.current.childNodes;
    for (let i = 0; i < imgList.length; i++) {
      const img = imgList[i] as HTMLDivElement;
      img.style.width = img.style.height = length + "px";
    }
  }, [position, length]);

  useEffect(mouseleave, [mouseleave]);

  useEffect(() => {
    if (!dockRef.current) {
      return;
    }
    const imgList = dockRef.current.childNodes;
    [isSettingOpen, isCalculatorOpen, isDrawingOpen].forEach((item) => {
      if (item.index) {
        const img = imgList[item.index] as HTMLDivElement;
        !item.type
          ? setTimeout(() => {
              img?.classList.remove("active");
            }, 1000)
          : img.classList.add("active");
      }
    });
  }, [isSettingOpen, isCalculatorOpen, isDrawingOpen, position]);

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
  }, [mousemove, mouseleave]);

  return (
    <React.Fragment>
      <FooterContext.Provider
        value={[
          isSettingOpen,
          setSettingOpen,
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
      <FooterContext.Provider
        value={[
          isCalculatorOpen,
          setCalculatorOpen,
          isCalculatorShow,
          setCalculatorShow,
        ]}
      >
        <Calculator />
      </FooterContext.Provider>
      <FooterContext.Provider
        value={[isDrawingOpen, setDrawingOpen, isDrawingShow, setDrawingShow]}
      >
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
              <div
                id="DockItem"
                className={position}
                style={
                  {
                    backgroundImage: "url(" + require("./image/" + item) + ")",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  } as CSSProperties
                }
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
