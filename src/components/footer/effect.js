export function dockEffect(config) {
  /**
   * config
   * el: 对那个父元素里面的元素显示dock效果，ClassName(string)
   * toTag: img(默认是查看对应元素的img)
   * cb: 回调函数(有监听事件就应该给回调函数)
   */
  const dockWrap = document.getElementsByClassName(config.el)[0];
  const dockBackground = document.getElementsByClassName('DockBackground')[0];
  const toTag = config.toTag || "img";
  const img = dockWrap.getElementsByTagName(toTag);
  const imgAmount = img.length;
  let imgScale = 0;
  let x = 0,
    y = 0,
    i = 0
  function initPage() {
    for (i = 0; i < imgAmount; i++) {
      img[i].width = 76;
    }
    dockBackground.width = imgAmount * 76
  }
  // 获取相对于HTML的y轴
  function getOffsetTop(el) {
    if (el.offsetParent == null) {
      return el.offsetTop;
    }

    return el.offsetTop + getOffsetTop(el.offsetParent);
  }

  function initEvent() {
    dockWrap.onmousemove = function (e) {
      e = e || window.event;
      for (i = 0; i < imgAmount; i++) {
        x = e.clientX - (img[i].offsetLeft + 76);
        y =
          img[i].offsetTop +
          getOffsetTop(dockWrap) +
          img[i].offsetHeight / 2 -
          e.clientY;
        imgScale = 1 - Math.sqrt(x * x + y * y) / 300;
        if (imgScale < 0.5) {
          imgScale = 0.5;
        }
        img[i].width = 152 * imgScale;
      }
      config.cb && config.cb()
      dockBackground.width = 0
      for (i = 0; i < imgAmount; i++) {
        dockBackground.width = dockBackground.width + img[i].width
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
