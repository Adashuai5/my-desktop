import React, { useContext, useEffect } from "react";
import { useModal } from "../modal/UseModal";
import { FooterContext } from "../footer/Footer";
import { TitleBar } from "react-desktop/macOs";
import Canvas from "./canvas";
import "./index.scss";
/// <reference path="react-desktop.d.ts" />

export const Drawing = React.memo(() => {
  const { show, hide, RenderModal } = useModal();
  const [isDrawingShow, setDrawingShow] = useContext(FooterContext);
  useEffect(isDrawingShow ? show : hide, [isDrawingShow]);
  return (
    <RenderModal
      data={{
        width: 1200,
        height: 800,
        id: "DrawingView",
        moveId: "DrawingMove",
      }}
    >
      <div className="drawing-wrapper">
        <TitleBar
          controls
          id="DrawingMove"
          isFullscreen={false}
          onCloseClick={() => {
            hide();
            setDrawingShow(!isDrawingShow);
          }}
          onMinimizeClick={() => {
            hide();
            setDrawingShow(!isDrawingShow);
          }}
          onMaximizeClick={show}
        ></TitleBar>
        <Canvas height={768} width={1200} />
      </div>
    </RenderModal>
  );
});
