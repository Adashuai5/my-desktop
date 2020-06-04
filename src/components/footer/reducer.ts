interface PositionAction {
  name: "change";
  position: "bottom" | "top" | "left" | "right";
}
interface LengthAction {
  name: "change";
  length: number;
}

export const positionReducer = (state: string, action: PositionAction) => {
  switch (action.name) {
    case "change":
      return action.position;
    default:
      return state;
  }
};
export const lengthReducer = (state: number, action: LengthAction) => {
  switch (action.name) {
    case "change":
      return action.length * 1;
    default:
      return state;
  }
};
