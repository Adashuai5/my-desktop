interface PositionAction {
  name: "change";
  position: "bottom" | "top" | "left" | "right";
}
interface DockData {
  length: number;
  bigLength: number;
  itemMargin: number;
  distance: number;
  isDockBig: boolean;
}

interface LengthAction {
  name: "change";
  dockData: DockData;
}
export const positionReducer = (state: string, action: PositionAction) => {
  switch (action.name) {
    case "change":
      return action.position;
    default:
      return state;
  }
};
export const dataReducer = (state: DockData, action: LengthAction) => {
  switch (action.name) {
    case "change":
      return action.dockData;
    default:
      return state;
  }
};
