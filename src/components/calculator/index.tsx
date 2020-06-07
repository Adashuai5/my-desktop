import React, { useContext, useEffect } from "react";
import { useModal } from "../modal/UseModal";
import { FooterContext } from "../footer/Footer";
import { TitleBar } from "react-desktop/macOs";
import Calculate from "./Calculator";
import "./index.scss";
/// <reference path="react-desktop.d.ts" />

export const Calculator = React.memo(() => {
  const { open, close, RenderModal } = useModal();
  const [
    isCalculatorOpen,
    setCalculatorOpen,
    isCalculatorShow,
    setCalculatorShow,
  ] = useContext(FooterContext);
  useEffect(isCalculatorOpen.type ? open : close, [isCalculatorOpen]);
  return (
    <RenderModal
      data={{
        width: 410,
        height: 560,
        id: "calculatorView",
        moveId: "calculatorMove",
        isShow: isCalculatorShow,
      }}
    >
      <React.Fragment>
        <TitleBar
          id="calculatorMove"
          transparent
          controls
          isFullscreen={false}
          onCloseClick={() => {
            close();
            setCalculatorOpen({
              ...isCalculatorOpen,
              type: false,
            });
          }}
          onMinimizeClick={() => {
            setCalculatorShow(false);
          }}
          onMaximizeClick={open}
        ></TitleBar>
        <Calculate />
      </React.Fragment>
    </RenderModal>
  );
});
