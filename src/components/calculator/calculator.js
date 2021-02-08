import { createElement } from "../../utils/createElement.js";

// export function createCalculator() {
//   // const headline = createElement("h2", {
//   //   innerText: "Calculator",
//   // });

//   let firstValue = 0;
//   let secondValue = 0;
//   let operatorValue = null;
//   let hasCalculated = false;
//   const warning = "Zahl eingeben";

//   const result = createElement("input", {
//     className: "result",
//     type: "text",
//     value: "",
//     placeholder: "0",
//   });

//   const numberButton = (number) =>
//     createElement("button", {
//       innerText: number,
//       value: number,
//       className: "numberButton",
//       onclick: () => {
//         if (hasCalculated) {
//           result.value = number;
//         } else {
//           result.value = result.value + number;
//         }

//         if (operatorValue === null) {
//           firstValue = result.value;
//         } else {
//           secondValue = result.value;
//         }

//         hasCalculated = false;
//       },
//     });

//   const operatorButton = (operator) =>
//     createElement("button", {
//       className: "operator",
//       innerText: operator,
//       value: operator,
//       onclick: () => {
//         operatorValue = operator;
//         result.value = "";
//       },
//     });

//   const buttonPoint = createElement("button", {
//     className: "operator",
//     innerText: ".",
//     value: ".",
//     onclick: function () {
//       result.value = result.value + this.value;
//     },
//   });
//   const buttonReset = createElement("button", {
//     className: "operator",
//     innerText: "AC",
//     value: "0",
//     onclick: function () {
//       firstValue = 0;
//       secondValue = 0;
//       operatorValue = null;
//       result.value = "";
//     },
//   });
//   const buttonResult = createElement("button", {
//     className: "equal",
//     innerText: "=",
//     value: "=",
//     onclick: function () {
//       if (result.value == "") {
//         alert(warning);
//       } else {
//         result.value = calculate(+firstValue, +secondValue, operatorValue);
//         operatorValue = null;
//         firstValue = result.value;
//         hasCalculated = true;
//       }
//     },
//   });

//   return createElement("div", {
//     className: "calculator",
//     children: [
//       result,
//       numberButton(7),
//       numberButton(8),
//       numberButton(9),
//       operatorButton("+"),
//       numberButton(4),
//       numberButton(5),
//       numberButton(6),
//       operatorButton("-"),
//       numberButton(1),
//       numberButton(2),
//       numberButton(3),
//       operatorButton("*"),
//       numberButton(0),
//       buttonReset,
//       buttonPoint,
//       operatorButton("/"),
//       buttonResult,
//     ],
//   });
// }

// function calculate(number1, number2, operator) {
//   if (operator === "+") {
//     return number1 + number2;
//   }

//   if (operator === "-") {
//     return number1 - number2;
//   }

//   if (operator === "*") {
//     return number1 * number2;
//   }

//   if (operator === "/") {
//     return number1 / number2;
//   }
// }

function numberButton(result) {
  return [7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((number) =>
    createElement("button", {
      innerText: number,
      className: "numberButton",
      onclick: () => {
        result.value += number;
      },
    })
  );
}

const operators = {
  "+": (firstValue, secondValue) => firstValue + secondValue,
  "-": (firstValue, secondValue) => firstValue - secondValue,
  "*": (firstValue, secondValue) => firstValue * secondValue,
  "/": (firstValue, secondValue) => firstValue / secondValue,
};

let operatorValue = null;
let secondValue = null;
function operatorButton(result) {
  return Object.keys(operators).map((operator) =>
    createElement("button", {
      innerText: operator,
      className: "operator",
      onclick: () => {
        operatorValue = operator;
        secondValue = +result.value;
        result.value = "";
      },
    })
  );
}

function buttonResult(result) {
  return createElement("button", {
    innerText: "=",
    className: "equal",
    onclick: () => {
      const firstValue = +result.value;
      const calculate = operators[operatorValue];
      const endResult = calculate(firstValue, secondValue);
      result.value = endResult;
    },
  });
}

export function createCalculator() {
  const result = createElement("input", {
    className: "result",
    placeholder: "0",
    readOnly: true,
  });
  const numberElements = numberButton(result);
  const operatorElements = operatorButton(result);
  const calculateElement = buttonResult(result);

  const children = [
    result,
    ...numberElements,
    ...operatorElements,
    calculateElement,
  ];
  return createElement("div", {
    className: "calculator",
    children: children,
  });
}
