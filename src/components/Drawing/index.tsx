import React, { useContext, useState, useEffect, useCallback } from "react";
import { useModal } from "../modal/UseModal";
import { FooterContext } from "../footer/Footer";
import { View, TitleBar } from "react-desktop/macOs";
import "./index.scss";
/// <reference path="react-desktop.d.ts" />

export const Drawing = React.memo(() => {
  const { show, hide, RenderModal } = useModal();
  const [isDrawingShow, setDrawingShow] = useContext(FooterContext);
  useEffect(isDrawingShow ? show : hide, [isDrawingShow]);
  return (
    <RenderModal data={{ width: 1000, height: 800 }} id="DrawingView">
      <React.Fragment>
        <View>
          <TitleBar
            style={{ height: "24px" }}
            controls
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
        </View>
        <div className="drawing"></div>
      </React.Fragment>
    </RenderModal>
  );
});
