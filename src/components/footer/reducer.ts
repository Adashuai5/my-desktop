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
export const propsReducer = (state: Object, action: PropsAction) => {
  switch (action.name) {
    case "change":
      return action.props;
    default:
      return state;
  }
};
export const lengthReducer = (state: Object, action: LengthAction) => {
  switch (action.name) {
    case "change":
      return action.length;
    default:
      return state;
  }
};
