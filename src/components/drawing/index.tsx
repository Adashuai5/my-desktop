import React, { useContext, useEffect, useState, useCallback } from "react";
import { useModal } from "../modal/UseModal";
import { FooterContext } from "../footer/Footer";
import { TitleBar } from "react-desktop/macOs";
import Canvas from "./Canvas";
import "./index.scss";
/// <reference path="react-desktop.d.ts" />

export const Drawing = React.memo(() => {
  const { show, hide, RenderModal } = useModal();
  const [isDrawingShow, setDrawingShow] = useContext(FooterContext);
  const [style, setStyle] = useState({ width: 1200, height: 800 });
  const [isFullscreen, setFullscreen] = useState(false);

  useEffect(isDrawingShow ? show : hide, [isDrawingShow]);
  const maximizeClick = useCallback(() => {
    if (isFullscreen) {
      setStyle({ width: 1200, height: 800 });
    } else {
      setStyle({ width: -1, height: -1 });
    }
    setFullscreen(!isFullscreen);
  }, [isFullscreen]);

  return (
    <RenderModal
      data={{
        width: style.width,
        height: style.height,
        id: "DrawingView",
        moveId: "DrawingMove",
      }}
    >
      <div className="drawing-wrapper">
        <TitleBar
          controls
          id="DrawingMove"
          isFullscreen={isFullscreen}
          onCloseClick={() => {
            hide();
            setDrawingShow(!isDrawingShow);
          }}
          onMinimizeClick={() => {
            hide();
            setDrawingShow(!isDrawingShow);
          }}
          onMaximizeClick={maximizeClick}
          onResizeClick={maximizeClick}
        ></TitleBar>
        <Canvas
          height={isFullscreen ? document.body.clientHeight - 32 : style.height}
          width={isFullscreen ? document.body.clientWidth : style.width}
        />
      </div>
    </RenderModal>
  );
});
