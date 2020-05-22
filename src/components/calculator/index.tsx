import React, { useContext, useState, useEffect, useCallback } from "react";
import { useModal } from "../modal/UseModal";
import { FooterContext } from "../footer/Footer";
import { View, TitleBar } from "react-desktop/macOs";
import "./index.scss";
/// <reference path="react-desktop.d.ts" />

export const Calculator = React.memo(() => {
  const keys: Array<string> = [
    "C",
    "+/-",
    "％",
    "÷",
    "7",
    "8",
    "9",
    "×",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];
  const { show, hide, RenderModal } = useModal();
  const [isCalculatorShow] = useContext(FooterContext);
  const [N1N2, setN1OrN2] = useState({ n1: "", n2: "" });
  const [operator, setOperator] = useState("");
  const [result, setResult] = useState("0");

  const getNumber = (name: "n1" | "n2", text: string): void => {
    const getN1N2 = {
      n1: name === "n1" ? N1N2[name] + text : N1N2.n1,
      n2: name === "n2" ? N1N2[name] + text : N1N2.n2,
    };
    setN1OrN2(getN1N2);
    setResult(
      getN1N2[name].length > 12
        ? removeZero(parseFloat(getN1N2[name]).toPrecision(12))
        : getN1N2[name]
    );
  };
  const removeZero = (text: string) => {
    text = /\.\d+?0+$/g.test(text) ? text.replace(/0+$/g, "") : text;
    return text
      .replace(/\.0+$/g, "")
      .replace(/\.0+e/, "e")
      .replace(/0+e/, "e")
      .replace(/\.$/, "");
  };
  const getResult = (n1: string, n2: string, operator: string): string => {
    let numberN1: number = parseFloat(n1);
    let numberN2: number = parseFloat(n2);
    let result1: number = parseFloat(result);
    if (operator === "+") {
      return (numberN1 + numberN2).toPrecision(12);
    } else if (operator === "-") {
      return (numberN1 - numberN2).toPrecision(12);
    } else if (operator === "×") {
      return (numberN1 * numberN2).toPrecision(12);
    } else if (operator === "÷") {
      if (numberN2 === 0) {
        return "不是数字";
      }
      return (numberN1 / numberN2).toPrecision(12);
    } else if (operator === "+/-") {
      return (-(result1 || numberN1)).toPrecision(12);
    } else if (operator === "％") {
      return ((result1 || numberN1) / 100).toPrecision(12);
    }
    return result;
  };

  const clickButton = useCallback(
    (event) => {
      if (event.target instanceof HTMLButtonElement) {
        let buttonText = event.target.textContent;
        if ("0123456789.".indexOf(buttonText) >= 0) {
          operator ? getNumber("n2", buttonText) : getNumber("n1", buttonText);
        } else if ("+-×÷".indexOf(buttonText) >= 0) {
          setN1OrN2({ n1: N1N2.n1 ? N1N2.n1 : result, n2: N1N2.n2 });
          setOperator(buttonText);
        } else if ("=".indexOf(buttonText) >= 0) {
          if (N1N2.n1 && N1N2.n2) {
            setResult(removeZero(getResult(N1N2.n1, N1N2.n2, operator)));
            setN1OrN2({ n1: "", n2: "" });
            setOperator("");
          }
        } else if (buttonText === "C") {
          setResult("0");
          setN1OrN2({ n1: "", n2: "" });
          setOperator("");
        } else if ("％'+/-'".indexOf(buttonText) >= 0) {
          if (N1N2.n1 || result) {
            setResult(removeZero(getResult(N1N2.n1, N1N2.n2, buttonText)));
          }
        }
      }
    },
    [operator, N1N2, result]
  );
  useEffect(isCalculatorShow ? show : hide, [isCalculatorShow]);
  useEffect(() => setResult(result), [result]);
  return (
    <React.Fragment>
      <RenderModal data={{ width: 410, height: 560 }}>
        <div className="calculatorView">
          <div className="output-wrapper">
            <View>
              <TitleBar
                transparent
                controls
                isFullscreen={false}
                onCloseClick={hide}
                onMinimizeClick={hide}
                onMaximizeClick={show}
              ></TitleBar>
            </View>
            <div className="output">
              <span>{result}</span>
            </div>
          </div>
          <div className="row" onClick={(e) => clickButton(e)}>
            {keys.map((text, index) => {
              return (
                <button
                  className={
                    [0, 1, 2].includes(index)
                      ? "dark button text-"
                      : [3, 7, 11, 15, 18].includes(index)
                      ? "orange button text-"
                      : "button text-" + text
                  }
                  key={index}
                >
                  {text}
                </button>
              );
            })}
          </div>
        </div>
      </RenderModal>
    </React.Fragment>
  );
});
