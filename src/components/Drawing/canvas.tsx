import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  CSSProperties,
} from "react";
import { Iconfont } from "../Iconfont";

interface CanvasProps {
  width: number;
  height: number;
}

type Coordinate = {
  x: number;
  y: number;
};

const Canvas = ({ width, height }: CanvasProps) => {
  const colorMap = ["black", "red", "green", "blue"];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [strokeStyle, setStrokeStyle] = useState("black");
  const [lineWidth, setLineWidth] = useState(5);
  const [eraserEnabled, setEraserEnabled] = useState(false);
  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined
  );

  const startPaint = useCallback((event: MouseEvent) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setMousePosition(coordinates);
      setIsPainting(true);
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("mousedown", startPaint);
    return () => {
      canvas.removeEventListener("mousedown", startPaint);
    };
  }, [startPaint]);

  const drawLine = useCallback(
    (originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
      if (!canvasRef.current) {
        return;
      }
      const canvas: HTMLCanvasElement = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        context.strokeStyle = strokeStyle;
        context.lineJoin = "round";
        context.lineWidth = lineWidth;
        context.beginPath();
        context.moveTo(originalMousePosition.x, originalMousePosition.y);
        context.lineTo(newMousePosition.x, newMousePosition.y);
        context.closePath();
        context.stroke();
      }
    },
    [lineWidth, strokeStyle]
  );

  const clearRect = useCallback(
    (newMousePosition: Coordinate) => {
      if (!canvasRef.current) {
        return;
      }
      const canvas: HTMLCanvasElement = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(
          newMousePosition.x - lineWidth / 2,
          newMousePosition.y - lineWidth / 2,
          lineWidth,
          lineWidth
        );
      }
    },
    [lineWidth, strokeStyle]
  );

  const paint = useCallback(
    (event: MouseEvent) => {
      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          if (eraserEnabled) {
            clearRect(newMousePosition);
          } else {
            drawLine(mousePosition, newMousePosition);
            setMousePosition(newMousePosition);
          }
        }
      }
    },
    [isPainting, eraserEnabled, mousePosition, drawLine, clearRect]
  );

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("mousemove", paint);
    return () => {
      canvas.removeEventListener("mousemove", paint);
    };
  }, [paint]);

  const exitPaint = useCallback(() => {
    setIsPainting(false);
    setMousePosition(undefined);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("mouseup", exitPaint);
    canvas.addEventListener("mouseleave", exitPaint);
    return () => {
      canvas.removeEventListener("mouseup", exitPaint);
      canvas.removeEventListener("mouseleave", exitPaint);
    };
  }, [exitPaint]);

  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }
    return {
      x: event.offsetX,
      y: event.offsetY,
    };
  };

  const onColorsClick = useCallback(([e, selector, color]) => {
    const el = e.target;
    if (el.className.includes("active")) return;
    setStrokeStyle(color);
    el.classList.add("active");
    el.parentNode.childNodes.forEach((item: HTMLLIElement) => {
      if (!item.matches(selector) || item === el) return;
      item.classList.remove("active");
    });
  }, []);

  const onToolsClick = useCallback((e) => {
    const el = e.currentTarget;
    if (el.classList[1]) return;
    if (el.childNodes[0].href.baseVal.includes("xiangpi")) {
      setEraserEnabled(true);
    } else {
      setEraserEnabled(false);
    }
    el.classList.add("active");
    el.parentNode.childNodes.forEach((item: HTMLLIElement) => {
      if (!item.matches("svg") || item === el) return;
      item.classList.remove("active");
    });
  }, []);

  const onColorsChange = useCallback((e) => {
    setStrokeStyle(e.target.value);
  }, []);

  const onSizesChange = useCallback((e) => {
    setLineWidth(e.target.value);
  }, []);

  return (
    <React.Fragment>
      <canvas id="canvas" ref={canvasRef} height={height} width={width} />;
      <div id="toolbox">
        <div className="tools">
          <Iconfont
            className={!eraserEnabled ? "active" : ""}
            type="icon-huabi"
            style={{ width: "100%", fontSize: "32px" }}
            onToolsClick={onToolsClick}
          />
          <Iconfont
            className={eraserEnabled ? "active" : ""}
            type="icon-xiangpi"
            style={{ width: "100%", fontSize: "32px" }}
            onToolsClick={onToolsClick}
          />
        </div>
        <div className="sizes">
          <input
            style={{ backgroundColor: strokeStyle } as CSSProperties}
            type="range"
            id="range"
            name="range"
            min="1"
            max="20"
            value={lineWidth}
            onChange={onSizesChange}
          />
        </div>
        <ol className="colors">
          {colorMap.map((color, index) => {
            return (
              <li
                className={color === strokeStyle ? color + " active" : color}
                key={index + color}
                onClick={(e) => onColorsClick([e, "li", color])}
              ></li>
            );
          })}
          <input
            type="color"
            value={strokeStyle}
            onChange={onColorsChange}
            id="currentColor"
          />
        </ol>
      </div>
    </React.Fragment>
  );
};

Canvas.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export default Canvas;
