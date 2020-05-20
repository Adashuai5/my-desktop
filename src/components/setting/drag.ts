export function dragElement(dragEl: HTMLDivElement): void {
  /**
   * dragEl : 拖拽的元素
   */
  dragEl.style.left = "50%";
  dragEl.style.top = "50%";
  let x: number, y: number;
  dragEl.onmousedown = function (e) {
    e = e || window.event;
    x = e.clientX - dragEl.offsetLeft;
    y = e.clientY - dragEl.offsetTop;
  };
  document.onmousemove = function (e) {
    e = e || window.event;
    let left = e.clientX - x;
    let top = e.clientY - y;

    // 控制拖拽物体的范围只能在浏览器视窗内，不允许出现滚动条
    if (left < 0) {
      left = 0;
    } else if (left > window.innerWidth - dragEl.offsetWidth) {
      left = window.innerWidth - dragEl.offsetWidth;
    }
    if (top < 0) {
      top = 0;
    } else if (top > window.innerHeight - dragEl.offsetHeight) {
      top = window.innerHeight - dragEl.offsetHeight;
    }

    // 移动时重新得到物体的距离，解决拖动时出现晃动的现象
    dragEl.style.left = left + "px";
    dragEl.style.top = top + "px";
  };
  document.onmouseup = function (e) {
    // 当鼠标弹起来的时候不再移动
    this.onmousemove = null;
    this.onmouseup = null; // 预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
  };
}
