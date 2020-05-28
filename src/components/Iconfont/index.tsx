import React, { CSSProperties } from "react";
import "./index.scss";

const scriptElem = document.createElement("script");
scriptElem.src = "//at.alicdn.com/t/font_1848517_3x6qfhnwqab.js";
document.body.appendChild(scriptElem);

interface PropsTypes {
  className?: string;
  type: string;
  style?: object;
  clickEvent?: (T: any) => void;
}

export const Iconfont = ({
  className,
  type,
  style,
  clickEvent,
}: PropsTypes) => {
  return (
    <svg
      className={className ? "icon-font " + className : "icon-font"}
      aria-hidden="true"
      style={style as CSSProperties}
      onClick={clickEvent}
    >
      <use xlinkHref={`#${type}`} />
    </svg>
  );
};
