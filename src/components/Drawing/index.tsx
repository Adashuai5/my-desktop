import React, { useContext, useState, useEffect, useCallback } from "react";
import { useModal } from "../modal/UseModal";
import { FooterContext } from "../footer/Footer";
import { TitleBar } from "react-desktop/macOs";
import "./index.scss";
/// <reference path="react-desktop.d.ts" />

export const Drawing = React.memo(() => {
  const { show, hide, RenderModal } = useModal();
  const [isDrawingShow, setDrawingShow] = useContext(FooterContext);
  const [using, setUsing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [step, setStep] = useState(-1);
  const [canvasHistory, setCanvasHistory] = useState([]);
  const [lastPoint, setLastPoint] = useState({
    x: undefined,
    y: undefined,
  });
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;

  const drawLine = useCallback(
    (x1, y1, x2, y2) => {
      console.log(canvas, "canvas");
      if (canvas && canvas instanceof HTMLCanvasElement) {
        const context: any = canvas.getContext("2d");
        context.fillStyle = "black";
        context.strokeStyle = "black";
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineWidth = lineWidth;
        context.lineTo(x2, y2);
        context.stroke();
        context.closePath();
      }
    },
    [canvas, lineWidth]
  );
  const drawCircle = useCallback(
    (x, y, radius) => {
      if (canvas && canvas instanceof HTMLCanvasElement) {
        const context: any = canvas.getContext("2d");
        context.fillStyle = "black";
        context.strokeStyle = "black";
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
      }
    },
    [canvas]
  );
  // const saveFragment = useCallback(() => {
  //   setStep((step) => step++);
  //   if (step < canvasHistory.length) {
  //     canvasHistory.length = step;
  //   }
  //   canvasHistory.push(canvas.toDataURL());
  //   // back.classList.add("active");
  //   // go.classList.remove("active");
  // }, [context]);

  const handleMouseDown = useCallback(({ clientX, clientY }) => {
    setUsing(true);
    setLastPoint({
      x: clientX,
      y: clientY,
    });
  }, []);

  const handleMouseMove = useCallback(
    ({ clientX, clientY, target }) => {
      if (!canvas || target !== canvas || !using || !isDrawingShow) return;
      const newPoint = {
        x: clientX,
        y: clientY,
      };
      drawCircle(clientX, clientY, lineWidth / 2);
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
    },
    [isDrawingShow, using, canvas, lineWidth, lastPoint, drawLine, drawCircle]
  );
  const handleMouseUp = useCallback(() => {
    setUsing(false);
    // saveFragment();
  }, []);

  useEffect(isDrawingShow ? show : hide, [isDrawingShow]);
  useEffect(() => {
    if (using) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
  }, [using, handleMouseMove, handleMouseUp]);
  return (
    <RenderModal
      data={{
        width: 1000,
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
        <canvas id="canvas" onMouseDown={handleMouseDown}></canvas>
      </div>
    </RenderModal>
  );
});
