interface PositionAction {
  name: 'change'
  position: 'bottom' | 'top' | 'left' | 'right'
}

interface DockData {
  length: number
  bigLength: number
  itemMargin: number
  distance: number
  isDockBig: boolean
}

interface DockDataAction {
  name: string
  dockData: DockData
}

export const positionReducer = (_state: string, action: PositionAction) => {
  switch (action.name) {
    case 'change':
      return action.position
    default:
      throw new Error()
  }
}
export const dataReducer = (state: DockData, action: DockDataAction) => {
  switch (action.name) {
    case 'change':
      return { ...state, ...action.dockData }
    default:
      throw new Error()
  }
}
