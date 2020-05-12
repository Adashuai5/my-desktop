export const dockEffect = (function (Doc) {
  /**
   * config
   * el: 对那个父元素里面的元素显示dock效果，id(string)
   * toTag: img(默认是查看对应元素的img)
   * cb: 回调函数(有监听事件就应该给回调函数)
   */
  return function (config) {
    const dockWrap = Doc.getElementsByClassName(config.el)[0];
    const toTag = config.toTag || "img";
    const img = dockWrap.getElementsByTagName(toTag);
    const imgAmount = img.length;
    const originalWidth = [];
    const imgScale = 0;
    const x = 0,
      y = 0,
      i = 0;

    function initPage() {
      for (i = 0; i < imgAmount; i++) {
        originalWidth.push(img[i].offsetWidth);
        img[i].width = parseInt(img[i].offsetWidth / 2);
      }
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
          x = e.clientX - (img[i].offsetLeft + img[i].offsetWidth / 2);
          y =
            img[i].offsetTop +
            getOffsetTop(dockWrap) +
            img[i].offsetHeight / 2 -
            e.clientY;
          imgScale = 1 - Math.sqrt(x * x + y * y) / 300;
          if (imgScale < 0.5) {
            imgScale = 0.5;
          }
          img[i].width = originalWidth[i] * imgScale;
        }

        config.cb && config.cb();
      };
    }

    function init() {
      initPage();
      initEvent();
    }

    init();
  };
})(document);
