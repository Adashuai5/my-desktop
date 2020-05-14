import React, { useState, useEffect } from 'react';
export function dockEffect(props) {
  /**
   * props
   * el: 对那个父元素里面的元素显示dock效果，ClassName(string)
   * toTag: img(默认是查看对应元素的img)
   * toTagLength: img的宽度或高度基础值
   * type: 使用宽度还是高度
   * cb: 回调函数(有监听事件就应该给回调函数)
   */


  const dockWrap = document.getElementsByClassName(props.el)[0];
  const dockBackground = document.getElementsByClassName('DockBackground')[0];
  const img = dockWrap.getElementsByTagName(props.toTag);
  const imgAmount = img.length;
  let imgScale = 0;
  let x = 0,
    y = 0,
    i = 0
  function initPage() {
    for (i = 0; i < imgAmount; i++) {
      img[i].width = props.toTagLength;
    }
    if (props.type === 'bottom' || 'top') {
      dockBackground.width = imgAmount * props.toTagLength
    } else {
      dockBackground.height = imgAmount * props.toTagLength
    }
  }
  // 获取相对于HTML的y轴
  function getOffset(el, offset) {
    const elOffset = offset === 'top' ? el.offsetTop : el.offsetLeft
    if (el.offsetParent == null) {
      return elOffset;
    }

    return elOffset + getOffset(el.offsetParent, offset);
  }

  function initEvent() {
    dockWrap.onmousemove = function (e) {
      e = e || window.event;
      for (i = 0; i < imgAmount; i++) {
        if (props.type === 'bottom' || props.type === 'left') {
          x = e.clientX - (img[i].offsetLeft + props.toTagLength);
          y =
            img[i].offsetTop +
            getOffset(dockWrap, 'top') +
            img[i].offsetHeight / 2 -
            e.clientY;
          imgScale = 1 - Math.sqrt(x * x + y * y) / 380;
        } else {
          x = e.clientY - (img[i].offsetTop + props.toTagLength);
          y =
            img[i].offsetLeft +
            getOffset(dockWrap, 'left') +
            img[i].offsetWidth / 2 -
            e.clientX;
          imgScale = 1 - Math.sqrt(x * x + y * y) / 380;
        }
        if (imgScale < 0.5) {
          imgScale = 0.5;
        }
        img[i].width = props.toTagLength * 2 * imgScale;
      }

      if (props.type === 'bottom' || props.type === 'top') {
        dockBackground.width = 0
        for (i = 0; i < imgAmount; i++) {
          dockBackground.width = dockBackground.width + img[i].width
        }
      } else {
        dockBackground.height = 0
        for (i = 0; i < imgAmount; i++) {
          dockBackground.height = dockBackground.height + img[i].width
        }
        console.log(dockBackground.height)
      }
    };
    dockWrap.onmouseleave = () => {
      initPage()
    }
  }
  function init() {
    initPage();
    initEvent();
  }

  init();
}
