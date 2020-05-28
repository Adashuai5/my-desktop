import React, { CSSProperties } from "react";
import "./index.scss";

const scriptElem = document.createElement("script");
scriptElem.src = "//at.alicdn.com/t/font_1848517_v1f1aradxcj.js";
document.body.appendChild(scriptElem);

interface PropsTypes {
  className?: string;
  type: string;
  style?: object;
  onToolsClick?: (T: any) => void;
}

export const Iconfont = ({
  className,
  type,
  style,
  onToolsClick,
}: PropsTypes) => {
  console.log(onToolsClick);
  return (
    <svg
      className={className ? "icon-font " + className : "icon-font"}
      aria-hidden="true"
      style={style as CSSProperties}
      onClick={onToolsClick}
    >
      <use xlinkHref={`#${type}`} />
    </svg>
  );
};
