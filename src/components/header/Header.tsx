import React, { useState } from "react";
import { Iconfont } from "../iconfont";
import "./index.scss";
import dayjs from "dayjs";
require("dayjs/locale/zh-cn");
dayjs.locale("zh-cn");
const Header = () => {
  const [time, setTime] = useState(dayjs().format("M月DD日 周dd HH:mm"));
  window.setInterval(() => {
    const newTime = dayjs().format("M月DD日 周dd HH:mm");
    setTime(newTime);
  }, 60000);
  return (
    <header className="AppFinder">
      <div className="FinderLeft">
        <div>
          <Iconfont
            type="icon-apple"
            style={{
              fontSize: 22,
            }}
          />
        </div>
        <div>chrome</div>
        <div>文件</div>
        <div>编辑</div>
        <div>显示</div>
        <div>前往</div>
        <div>窗口</div>
        <div>帮助</div>
      </div>
      <div className="FinderRight">
        <div>{time}</div>
        <a href="https://adashuai5.github.io/resume-2020/">
          <Iconfont
            type="icon-ren"
            style={{
              fontSize: 22,
            }}
          />
        </a>
        <a href="https://github.com/Adashuai5">
          <Iconfont
            type="icon-github"
            style={{
              fontSize: 22,
            }}
          />
        </a>
      </div>
    </header>
  );
};

export default Header;
