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
  const drawLine = useCallback(
    (context, x1, y1, x2, y2) => {
      context.fillStyle = "black";
      context.strokeStyle = "black";
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineWidth = lineWidth;
      context.lineTo(x2, y2);
      context.stroke();
      context.closePath();
    },
    [lineWidth]
  );
  const drawCircle = useCallback((context, x, y, radius) => {
    context.fillStyle = "black";
    context.strokeStyle = "black";
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }, []);
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
    ([{ clientX, clientY, target }, canvas]) => {
      if (target !== canvas || !using) return;
      const context = canvas.getContext("2D");
      console.log(context);
      const newPoint = {
        x: clientX,
        y: clientY,
      };
      drawCircle(context, clientX, clientY, lineWidth / 2);
      drawLine(context, lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
    },
    [using, lineWidth, lastPoint, drawLine, drawCircle]
  );
  const handleMouseUp = useCallback(() => {
    setUsing(false);
    // saveFragment();
  }, []);

  useEffect(() => {
    if (isDrawingShow) {
      show();
      if (document.getElementById("canvas")) {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        if (using) {
          canvas.addEventListener("mousemove", (e) =>
            handleMouseMove([e, canvas])
          );
          canvas.addEventListener("mouseup", handleMouseUp);
        } else {
          canvas.removeEventListener("mousemove", handleMouseMove);
          canvas.removeEventListener("mouseup", handleMouseUp);
        }
      }
    } else {
      hide();
    }
  }, [isDrawingShow, show, hide, using, handleMouseMove, handleMouseUp]);
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
