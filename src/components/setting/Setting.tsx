import { useContext, useState, useEffect, CSSProperties } from 'react'
import * as React from 'react'
import { useModal } from '../modal/UseModal'
import { FooterContext } from '../footer/Footer'
import {
  View,
  Radio,
  TitleBar,
  Text,
  ListView,
  ListViewRow,
  Checkbox
} from 'react-desktop/macOs'
import './index.scss'
import { Iconfont } from '../iconfont'

/// <reference path="react-desktop.d.ts" />

interface OptionsProps {
  title: string
  value: string
  max: string
  min: string
}

export const Setting = React.memo(() => {
  const { open, close, RenderModal } = useModal('SettingView')
  const positionMap = ['left', 'bottom', 'right']
  const setListMap = [{ title: '程序坞设置' }]
  const [
    isSettingOpen,
    setSettingOpen,
    isSettingShow,
    setSettingShow,
    position,
    setPosition,
    dockData,
    setDockData
  ] = useContext(FooterContext)
  const optionsMap: Array<OptionsProps> = [
    {
      title: '图标默认大小',
      value: 'length',
      max: '128',
      min: '25'
    },
    {
      title: '图标缩放后大小',
      value: 'bigLength',
      max: '256',
      min: '25'
    },
    {
      title: '图标之间距离大小',
      value: 'itemMargin',
      max: '10',
      min: '0'
    },
    {
      title: '距离屏幕边缘大小',
      value: 'distance',
      max: '100',
      min: '0'
    }
  ]
  const [selected, setTitle] = useState('程序坞')
  const [focus, setFocus] = useState(true)

  useEffect(() => {
    isSettingOpen.type ? open() : close()
    window.onfocus = () => {
      setFocus(true)
    }
    window.onblur = () => {
      setFocus(false)
    }
  }, [close, isSettingOpen, open])

  return (
    <RenderModal
      data={{
        width: 684,
        height: 466,
        id: 'SettingView',
        moveId: 'SettingMove',
        isShow: isSettingShow
      }}
    >
      <>
        <TitleBar
          id="SettingMove"
          controls
          inset
          isFullscreen={false}
          onCloseClick={() => {
            close()
            setSettingOpen({ ...isSettingOpen, type: false })
            localStorage.setItem('dockData', JSON.stringify(dockData))
            localStorage.setItem('position', JSON.stringify(position))
          }}
          onMinimizeClick={() => {
            setSettingShow(false)
          }}
          onMaximizeClick={open}
        />
        <div className="mainSet">
          <View className="leftSet">
            <ListView>
              {setListMap.map((item, index) => {
                return (
                  <ListViewRow
                    key={item.title + index}
                    onClick={() => setTitle(item.title)}
                    background={selected === item.title ? '#bfbfbf' : null}
                    padding="11px 20px"
                  >
                    <Iconfont
                      type="icon-ios-home"
                      style={{
                        marginRight: '6px'
                      }}
                    />
                    <Text color="#414141" size="14" bold>
                      {item.title}
                    </Text>
                  </ListViewRow>
                )
              })}
            </ListView>
          </View>
          <View className="rightSet">
            <Text bold marginBottom="10px" size="20">
              {selected}
            </Text>
            <div className="divide" />
            {optionsMap.map((item, index) => {
              return (
                <div className="options" key={index + item.value}>
                  {item.title === '图标缩放后大小' ? (
                    <Checkbox
                      label={item.title}
                      onChange={() =>
                        setDockData({
                          name: 'change',
                          dockData: {
                            ...dockData,
                            isDockBig: !dockData.isDockBig
                          }
                        })
                      }
                      defaultChecked={dockData.isDockBig}
                    />
                  ) : (
                    <Text bold marginBottom="10px">
                      {item.title}
                    </Text>
                  )}
                  <input
                    min={item.min}
                    max={item.max}
                    type="range"
                    className={focus ? 'focus' : ''}
                    value={dockData[item.value]}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDockData({
                        name: 'change',
                        dockData: { ...dockData, [item.value]: e.target.value }
                      })
                    }
                  />
                  <span>{dockData[item.value]}</span>
                </div>
              )
            })}

            <Text bold marginBottom="10px">
              置于屏幕上的位置
            </Text>
            <View
              style={
                {
                  lineHeight: '22px'
                } as CSSProperties
              }
            >
              {positionMap.map((item, index) => {
                return (
                  <div
                    style={
                      {
                        paddingRight: 28
                      } as CSSProperties
                    }
                    key={index + item}
                  >
                    <Radio
                      label={item}
                      name={item}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPosition({
                          name: 'change',
                          position: e.target.value
                        })
                      }}
                      defaultValue={item}
                      defaultChecked={item === position}
                    />
                  </div>
                )
              })}
            </View>
          </View>
        </div>
      </>
    </RenderModal>
  )
})
