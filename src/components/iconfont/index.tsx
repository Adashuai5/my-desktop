import React, { CSSProperties, RefObject } from "react"
import "./index.scss"

const scriptElem = document.createElement("script")
scriptElem.src = "//at.alicdn.com/t/font_1848517_ds8sk573mfk.js"
document.body.appendChild(scriptElem)

interface PropsTypes {
  className?: string
  type: string
  style?: object
  svgRef?: RefObject<SVGSVGElement>
  clickEvent?: (T: any) => void
}

export const Iconfont = ({
  className,
  type,
  style,
  svgRef,
  clickEvent,
}: PropsTypes) => {
  return (
    <svg
      ref={svgRef}
      className={className ? "icon-font " + className : "icon-font"}
      aria-hidden="true"
      style={style as CSSProperties}
      onClick={clickEvent}
    >
      <use xlinkHref={`#${type}`} />
    </svg>
  )
}
