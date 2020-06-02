import { Props } from "./effect";

interface PositionAction {
  name: "change";
  position: "bottom" | "top" | "left" | "right";
}
interface PropsAction {
  name: "change";
  props: Props;
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
      return action.length;
    default:
      return state;
  }
};
