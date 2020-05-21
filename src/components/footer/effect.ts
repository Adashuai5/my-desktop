// import React, { useState, useEffect } from 'react';
export type Props = {
  readonly el: string;
  readonly bg: string;
  readonly toTag: string;
  toTagLength: number;
  type: string;
};

export function dockEffect(props: Props): void {
  /**
   * props
   * el: 对那个父元素里面的元素显示dock效果，Id(string)
   * bg: dock背景，Id(string)
   * toTag: img(默认是查看对应元素的img)
   * toTagLength: img的宽度或高度基础值
   * type: 使用宽度还是高度
   */

  const dockWrap = document.getElementById(props.el) as HTMLDivElement;
  const dockBackground = document.getElementById(props.bg) as HTMLImageElement;
  const img = Array.from(
    document.getElementsByTagName(props.toTag) as HTMLCollectionOf<
      HTMLImageElement
    >
  );
  const imgAmount = img.length;
  let imgScale = 0;
  let x = 0,
    y = 0,
    i = 0;
  function initPage() {
    for (i = 0; i < imgAmount; i++) {
      img[i].width = props.toTagLength;
    }
    if (props.type === "bottom" || props.type === "top") {
      dockBackground.width = (imgAmount-1) * props.toTagLength;
      dockBackground.height = props.toTagLength;
    } else {
      dockBackground.height = (imgAmount-1) * props.toTagLength;
      dockBackground.width = props.toTagLength;
    }
  }
  // 获取相对于HTML的y轴
  function getOffset(el: HTMLElement, offset: "top" | "left"): number {
    const elOffset = offset === "top" ? el.offsetTop : el.offsetLeft;
    if (el.offsetParent == null) {
      return elOffset;
    }

    return elOffset + getOffset(el.offsetParent as HTMLElement, offset);
  }

  function initEvent() {
    dockWrap.onmousemove = function (e) {
      e = e || window.event;
      for (i = 0; i < imgAmount; i++) {
        if (props.type === "bottom" || props.type === "left") {
          x = e.clientX - (img[i].offsetLeft + props.toTagLength / 2);
          y =
            img[i].offsetTop +
            getOffset(dockWrap, "top") +
            img[i].offsetHeight / 2 -
            e.clientY;
        } else {
          x = e.clientY - (img[i].offsetTop + props.toTagLength / 2);
          y =
            img[i].offsetLeft +
            getOffset(dockWrap, "left") +
            img[i].offsetWidth / 2 -
            e.clientX;
        }
        imgScale =
          1 - Math.sqrt(x * x + y * y) / (imgAmount * props.toTagLength);
        if (imgScale < 0.5) {
          imgScale = 0.5;
        }
        img[i].width = props.toTagLength * 2 * imgScale;
      }

      if (props.type === "bottom" || props.type === "top") {
        dockBackground.width = 0;
        for (i = 0; i < imgAmount; i++) {
          dockBackground.width = dockBackground.width + img[i].width;
        }
      } else {
        dockBackground.height = 0;
        for (i = 0; i < imgAmount; i++) {
          dockBackground.height = dockBackground.height + img[i].width;
        }
      }
    };
    dockWrap.onmouseleave = () => {
      initPage();
    };
  }
  function init() {
    initPage();
    initEvent();
  }

  init();
}
