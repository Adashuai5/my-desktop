import React, {
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
  createContext,
  useReducer,
  CSSProperties,
} from "react";
import "./index.scss";
import { Setting } from "../setting/Setting";
import { Calculator } from "../calculator";
import { Drawing } from "../drawing";
import { Launchpad } from "../launchpad";
import { positionReducer, dataReducer } from "./reducer";
import FinderPng from "./image/Finder.png";
import LaunchpadPng from "./image/Launchpad.png";
import PrefAppPng from "./image/PrefApp.png";
import ChromePng from "./image/Chrome.png";
import TerminalPng from "./image/Terminal.png";
import CalculatorPng from "./image/Calculator.png";
import DrawingPng from "./image/Drawing.png";

export const FooterContext = createContext<any>([]);

interface OpenTypes {
  type: boolean;
  index?: number;
}

const Footer = React.memo(() => {
  const [dockList] = useState<string[]>([
    FinderPng,
    LaunchpadPng,
    PrefAppPng,
    ChromePng,
    TerminalPng,
    CalculatorPng,
    DrawingPng,
  ]);
  const [position, setPosition] = useReducer(positionReducer, "bottom");
  const [dockData, setDockData] = useReducer(dataReducer, {
    length: 78,
    bigLength: 78 * 2,
    itemMargin: 0,
    distance: 0,
    isDockBig: true,
  });
  const [isSettingOpen, setSettingOpen] = useState<OpenTypes>({
    type: false,
    index: 2,
  });
  const [isCalculatorOpen, setCalculatorOpen] = useState<OpenTypes>({
    type: false,
    index: 5,
  });
  const [isDrawingOpen, setDrawingOpen] = useState<OpenTypes>({
    type: false,
    index: 6,
  });
  const [isSettingShow, setSettingShow] = useState(true);
  const [isCalculatorShow, setCalculatorShow] = useState(true);
  const [isDrawingShow, setDrawingShow] = useState(true);
  const [isLaunchpadShow, setLaunchpadShow] = useState(false);
  const [isChrome, setChrome] = useState<any>(null);

  const dockItemClick = useCallback(
    (item: string, index: number) => {
      if (!dockRef.current) {
        return;
      }
      const imgList = dockRef.current.childNodes;
      const img = imgList[index] as HTMLDivElement;
      switch (item) {
        case ChromePng:
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
        case PrefAppPng:
          if (!isSettingOpen.type) {
            if (isLaunchpadShow) {
              setSettingOpen({ ...isSettingOpen, type: !isSettingOpen.type });
              setLaunchpadShow(false);
              return;
            }
            img.classList.add("bounce");
            setTimeout(() => {
              setSettingOpen({ type: !isSettingOpen.type, index });
              img.classList.remove("bounce");
            }, 2500);
            return;
          }
          setSettingShow(!isSettingShow);
          return;
        case CalculatorPng:
          if (!isCalculatorOpen.type) {
            if (isLaunchpadShow) {
              setCalculatorOpen({
                ...isCalculatorOpen,
                type: !isCalculatorOpen.type,
              });
              setLaunchpadShow(false);
              return;
            }
            img.classList.add("bounce");
            setTimeout(() => {
              setCalculatorOpen({ type: !isCalculatorOpen.type, index });
              img.classList.remove("bounce");
            }, 2500);
            return;
          }
          setCalculatorShow(!isCalculatorShow);
          return;
        case DrawingPng:
          if (!isDrawingOpen.type) {
            if (isLaunchpadShow) {
              setDrawingOpen({
                ...isDrawingOpen,
                type: !isDrawingOpen.type,
              });
              setLaunchpadShow(false);
              return;
            }
            img.classList.add("bounce");
            setTimeout(() => {
              setDrawingOpen({ type: !isDrawingOpen.type, index });
              img.classList.remove("bounce");
            }, 2500);
            return;
          }
          setDrawingShow(!isDrawingShow);
          return;
        case LaunchpadPng:
          setLaunchpadShow(!isLaunchpadShow);
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
      isLaunchpadShow,
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
          x = img.offsetLeft + dockData.length / 2 - clientX;
          y =
            img.offsetTop +
            getOffset(dockRef.current, "top") +
            img.offsetHeight / 2 -
            clientY;
        } else if (position === "right") {
          x = img.offsetTop + dockData.length / 2 - clientY;
          y =
            img.offsetLeft +
            getOffset(dockRef.current, "left") +
            img.offsetWidth / 2 -
            clientX;
        } else {
          x = img.offsetTop + dockData.length / 2 - clientY;
          y = img.offsetLeft + dockData.length / 2 - clientX;
        }
        let imgScale =
          1 - Math.sqrt(x * x + y * y) / (imgList.length * dockData.length);
        if (imgScale < dockData.length / dockData.bigLength) {
          imgScale = dockData.length / dockData.bigLength;
        }
        const multiplier = dockData.bigLength / dockData.length;
        if (dockData.bigLength / dockData.length) {
          img.style.height = img.style.width =
            dockData.length * multiplier * imgScale + "px";
        }
      }
    },
    [position, dockData.length, dockData.bigLength, getOffset]
  );

  const mouseleave = useCallback(() => {
    if (!dockRef.current) {
      return;
    }
    if (position === "bottom") {
      setDockStyle({
        height: dockData.length * 1 + 10,
        marginBottom: dockData.distance * 1,
      });
    } else if (position === "top") {
      setDockStyle({
        height: dockData.length * 1 + 10,
        marginTop: dockData.distance * 1,
      });
    } else if (position === "left") {
      setDockStyle({
        width: dockData.length * 1 + 10,
        marginLeft: dockData.distance * 1,
      });
    } else {
      setDockStyle({
        width: dockData.length * 1 + 10,
        marginRight: dockData.distance * 1,
      });
    }
    const imgList = dockRef.current.childNodes;
    for (let i = 0; i < imgList.length; i++) {
      const img = imgList[i] as HTMLDivElement;
      img.style.width = img.style.height = dockData.length + "px";
    }
  }, [position, dockData.length, dockData.distance]);

  useEffect(mouseleave, [mouseleave]);

  useEffect(() => {
    const localDockData = localStorage.getItem("dockData") || null;
    if (localDockData) {
      setDockData({
        name: "change",
        dockData: JSON.parse(localDockData),
      });
    }
    const localPosition = localStorage.getItem("position") || null;
    if (localPosition) {
      setPosition({
        name: "change",
        position: JSON.parse(localPosition),
      });
    }
  }, []);

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
            }, 500)
          : img.classList.add("active");
      }
    });
    if (isSettingOpen) {
      if (localStorage.getItem("SettingView")) {
        localStorage.removeItem("SettingView");
      }
    }
    if (isCalculatorOpen && localStorage.getItem("CalculatorView")) {
      localStorage.removeItem("CalculatorView");
    }
    if (isDrawingOpen && localStorage.getItem("DrawingView")) {
      localStorage.removeItem("DrawingView");
    }
  }, [isSettingOpen, isCalculatorOpen, isDrawingOpen, position]);

  useEffect(() => {
    if (!dockRef.current || !dockData.isDockBig) {
      return;
    }
    const dockBackground: HTMLDivElement = dockRef.current;
    dockBackground.addEventListener("mousemove", mousemove);
    dockBackground.addEventListener("mouseleave", mouseleave);
    return () => {
      dockBackground.removeEventListener("mousemove", mousemove);
      dockBackground.removeEventListener("mouseleave", mouseleave);
    };
  }, [mousemove, mouseleave, dockData.isDockBig]);

  const itemStyles = useMemo(() => {
    return position === "top" || position === "bottom"
      ? {
          marginLeft: dockData.itemMargin * 1,
          marginRight: dockData.itemMargin * 1,
        }
      : {
          marginTop: dockData.itemMargin * 1,
          marginBottom: dockData.itemMargin * 1,
        };
  }, [position, dockData.itemMargin]);

  return (
    <>
      <FooterContext.Provider
        value={[
          isSettingOpen,
          setSettingOpen,
          isSettingShow,
          setSettingShow,
          position,
          setPosition,
          dockData,
          setDockData,
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
      <FooterContext.Provider value={[isLaunchpadShow, setLaunchpadShow]}>
        <Launchpad isVisible={isLaunchpadShow} dockItemClick={dockItemClick} />
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
                className={
                  [
                    "Launchpad.png",
                    PrefAppPng,
                    ChromePng,
                    CalculatorPng,
                    DrawingPng,
                  ].includes(item)
                    ? "pointer DockItem " + position
                    : position + " DockItem"
                }
                style={
                  {
                    backgroundImage: "url(" + item + ")",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    ...itemStyles,
                  } as CSSProperties
                }
                key={index + item}
                onClick={() => dockItemClick(item, index)}
              />
            );
          })}
        </div>
      </footer>
    </>
  );
});

export default Footer;
