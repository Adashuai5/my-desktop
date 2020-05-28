import React, { useContext, useEffect } from "react";
import { useModal } from "../modal/UseModal";
import { FooterContext } from "../footer/Footer";
import { TitleBar } from "react-desktop/macOs";
import Calculate from "./calculator";
import "./index.scss";
/// <reference path="react-desktop.d.ts" />

export const Calculator = React.memo(() => {
  const { show, hide, RenderModal } = useModal();
  const [isCalculatorShow, setCalculatorShow] = useContext(FooterContext);
  useEffect(isCalculatorShow ? show : hide, [isCalculatorShow]);
  return (
    <RenderModal
      data={{
        width: 410,
        height: 560,
        id: "calculatorView",
        moveId: "calculatorMove",
      }}
    >
      <React.Fragment>
        <TitleBar
          id="calculatorMove"
          transparent
          controls
          isFullscreen={false}
          onCloseClick={() => {
            hide();
            setCalculatorShow(!isCalculatorShow);
          }}
          onMinimizeClick={() => {
            hide();
            setCalculatorShow(!isCalculatorShow);
          }}
          onMaximizeClick={show}
        ></TitleBar>
        <Calculate />
      </React.Fragment>
    </RenderModal>
  );
});
