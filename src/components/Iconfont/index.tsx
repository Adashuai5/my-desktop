import React from "react";
import "./index.scss";

const scriptElem = document.createElement("script");
scriptElem.src = "//at.alicdn.com/t/font_1848517_v1f1aradxcj.js";
document.body.appendChild(scriptElem);

interface PropsTypes {
  className?: string;
  type: string;
  style?: object;
}

export const Iconfont = ({
  className = "icon-font",
  type,
  style,
}: PropsTypes) => {
  return (
    <svg className={className} aria-hidden="true" style={style}>
      <use xlinkHref={`#${type}`} />
    </svg>
  );
};
