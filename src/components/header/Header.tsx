import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Iconfont } from '../iconfont'
import './index.scss'
import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
const Header = () => {
  const menuRef = useRef<HTMLDivElement>(null)
  const [time, setTime] = useState(dayjs().format('M月DD日 周dd HH:mm'))
  const [menuShow, setMenuShow] = useState(false)
  const [inputShow, setInputShow] = useState(false)
  const [inputValue, setInputValue] = useState('Ada')

  const windowClick = useCallback(
    ({ target }) => {
      if (inputShow || menuShow) {
        if (
          target.parentNode === menuRef.current ||
          target.parentNode.parentNode === menuRef.current
        ) {
          return
        }
        setMenuShow(false)
        setInputShow(false)
      }
    },
    [inputShow, menuShow]
  )

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = dayjs().format('M月DD日 周dd HH:mm')
      setTime(newTime)
    }, 60000)
    window.addEventListener('click', windowClick)
    return () => {
      window.removeEventListener('click', windowClick)
      window.clearInterval(interval)
    }
  }, [windowClick])

  return (
    <header className="AppFinder">
      <div className="FinderLeft">
        <div>
          <Iconfont
            type="icon-apple"
            style={{
              fontSize: 22
            }}
          />
        </div>
        <div
          onClick={() => setMenuShow(true)}
          ref={menuRef}
          className="pointer"
        >
          {inputShow ? (
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          ) : (
            <span className={menuShow ? 'text active' : 'text'}>
              {inputValue}
            </span>
          )}
          <ul className={menuShow ? 'menu active' : 'menu'}>
            <li onClick={() => setInputShow(true)}>自定义标题</li>
            <div className="line" />
            <li>你好</li>
            <div className="line" />
            <li>我是周元达</li>
            <div className="line" />
            <li>感谢来到这里的你</li>
            <div className="line" />
            <li>我正在找工作</li>
            <div className="line" />
            <li>如有意请联系我</li>
            <div className="line" />
            <li>点击右边人头可查看我的简历</li>
          </ul>
        </div>
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
              fontSize: 22
            }}
          />
        </a>
        <a href="https://github.com/Adashuai5">
          <Iconfont
            type="icon-github"
            style={{
              fontSize: 22
            }}
          />
        </a>
      </div>
    </header>
  )
}

export default Header
