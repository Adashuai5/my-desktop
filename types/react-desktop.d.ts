import { JSXElementConstructor } from "react";

declare module "react-desktop/macOs" {
  const View: JSXElementConstructor;
  const Radio: JSXElementConstructor;
}
export = { View, Radio };
