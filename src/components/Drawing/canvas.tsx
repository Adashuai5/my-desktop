import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  CSSProperties,
} from "react";
import { Iconfont } from "../iconfont";
import { CSSTransition } from "react-transition-group";
import { useDialog } from "../dialog/index";

interface CanvasProps {
  width: number;
  height: number;
}

type Coordinate = {
  x: number;
  y: number;
};

interface ClearRectOptions {
  x: number;
  y: number;
  width: number;
  height: number;
}

const Canvas = ({ width, height }: CanvasProps) => {
  const colorMap = ["black", "red", "green", "blue"];
  const optionsMap = [
    "canvas_save",
    "canvas_clear",
    "turn_left_flat",
    "turn_right_flat",
  ];
  const toolsMap = ["canvas_paint", "canvas_eraser"];

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [strokeStyle, setStrokeStyle] = useState("black");
  const [lineWidth, setLineWidth] = useState(5);
  const [eraserEnabled, setEraserEnabled] = useState(false);
  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined
  );

  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }
    return {
      x: event.offsetX,
      y: event.offsetY,
    };
  };

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

  const clearRect = useCallback(({ x, y, width, height }: ClearRectOptions) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d");
    if (context) {
      context.clearRect(x, y, width, height);
    }
  }, []);

  const paint = useCallback(
    (event: MouseEvent) => {
      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          if (eraserEnabled) {
            clearRect({
              x: newMousePosition.x - lineWidth / 2,
              y: newMousePosition.y - lineWidth / 2,
              width: lineWidth,
              height: lineWidth,
            });
          } else {
            drawLine(mousePosition, newMousePosition);
            setMousePosition(newMousePosition);
          }
        }
      }
    },
    [isPainting, eraserEnabled, mousePosition, lineWidth, drawLine, clearRect]
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

  const [isToolboxShow, setToolboxShow] = useState(true);
  const toolboxShowClick = useCallback(
    (e) => {
      setToolboxShow(!isToolboxShow);
    },
    [isToolboxShow]
  );

  const onToolsClick = useCallback(([e, toolName]) => {
    const el = e.currentTarget;
    if (el.classList[1]) return;
    toolName === "canvas_eraser"
      ? setEraserEnabled(true)
      : setEraserEnabled(false);
    el.classList.add("active");
    el.parentNode.childNodes.forEach((item: HTMLLIElement) => {
      if (!item.matches("svg") || item === el) return;
      item.classList.remove("active");
    });
  }, []);

  const onSizesChange = useCallback((e) => {
    setLineWidth(e.target.value);
  }, []);

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

  const onColorsChange = useCallback((e) => {
    setStrokeStyle(e.target.value);
  }, []);

  const { showDialog, hideDialog, RenderDialog } = useDialog();
  const [isClearDialogShow, setClearDialogShow] = useState(false);
  useEffect(isClearDialogShow ? showDialog : hideDialog, [isClearDialogShow]);

  const saveCanvas = useCallback(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d");
    if (context) {
      const compositeOperation = context.globalCompositeOperation;
      context.globalCompositeOperation = "destination-over";
      context.fillStyle = "#fff";
      context.fillRect(0, 0, width, height);
      const imageData = canvas.toDataURL("image/png");
      context.putImageData(context.getImageData(0, 0, width, height), 0, 0);
      context.globalCompositeOperation = compositeOperation;
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.href = imageData;
      a.download = "myPaint";
      a.target = "_blank";
      a.click();
    }
  }, [width, height]);

  const onOptionsClick = useCallback(
    ([e, toolName]) => {
      const el = e.currentTarget;
      switch (toolName) {
        case "canvas_clear":
          setClearDialogShow(true);
          break;
        case "canvas_save":
          saveCanvas();
          break;
        default:
          break;
      }
    },
    [saveCanvas]
  );

  const closeClearDialog = useCallback(
    (e) => {
      setClearDialogShow(false);
    },
    [setClearDialogShow]
  );

  const checkClearDialog = useCallback(
    (e) => {
      clearRect({
        x: 0,
        y: 0,
        width,
        height,
      });
      closeClearDialog(e);
    },
    [closeClearDialog, clearRect, width, height]
  );

  return (
    <React.Fragment>
      <canvas id="canvas" ref={canvasRef} height={height} width={width} />;
      <div
        id="toolbox-show"
        style={
          {
            borderRadius: isToolboxShow ? "" : "5px",
          } as CSSProperties
        }
      >
        <Iconfont
          type={isToolboxShow ? "icon-upward_flat" : "icon-downward_flat"}
          style={{
            width: "100%",
            fontSize: "32px",
          }}
          clickEvent={toolboxShowClick}
        />
      </div>
      <CSSTransition
        in={isToolboxShow} //用于判断是否出现的状态
        timeout={300} //动画持续时间
        classNames="toolbox" //className值，防止重复
        unmountOnExit
      >
        <div id="toolbox">
          <span>Options</span>
          <div className="options">
            {optionsMap.map((option, index) => {
              return (
                <Iconfont
                  key={index + option}
                  className={option}
                  type={"icon-" + option}
                  style={{ fontSize: "50px" }}
                  clickEvent={(e) => onOptionsClick([e, option])}
                />
              );
            })}
          </div>
          <span>Toolbox</span>
          <div className="tools">
            {toolsMap.map((tool, index) => {
              return (
                <Iconfont
                  key={index + tool}
                  className={
                    tool === "canvas_eraser"
                      ? eraserEnabled
                        ? "active"
                        : ""
                      : !eraserEnabled
                      ? "active"
                      : ""
                  }
                  type={"icon-" + tool}
                  style={{ fontSize: "50px" }}
                  clickEvent={(e) => onToolsClick([e, tool])}
                />
              );
            })}
          </div>
          <div className="sizes">
            <input
              style={
                {
                  backgroundColor: eraserEnabled ? "#ebeff4" : strokeStyle,
                } as CSSProperties
              }
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
      </CSSTransition>
      <RenderDialog
        width={300}
        height={120}
        id="clear-dialog"
        title="您确定要清空该画布吗？"
        message="一旦清空将无法撤回。"
        imgSrc={"Drawing.png"}
        onCheck={checkClearDialog}
        onClose={closeClearDialog}
      ></RenderDialog>
    </React.Fragment>
  );
};

Canvas.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export default Canvas;
