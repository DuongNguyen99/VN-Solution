import React, { Component } from "react"
import Screen from "./screen"
import BtnWrapper from "./buttonWrapper"
import "../styles/styles.css"

class Calculator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      equation: "",
      result: "",
    }
    this.handleClick = this.handleClick.bind(this)
  }

  calculate(equation, operatorKeys) {
    let firstOperand, secondOperand, computation

    operatorKeys.forEach((key) => {
      const operatorIndex = equation.indexOf(key)
      if (operatorIndex !== -1) {
        firstOperand = parseFloat(equation.slice(0, equation.indexOf(" ")))
        secondOperand = parseFloat(
          equation.slice(equation.lastIndexOf(" ") + 1, equation.length)
        )
      } else {
        firstOperand = parseFloat(equation)
      }

      if (equation.includes(` ${key} `)) {
        switch (key) {
          case "+":
            computation = firstOperand + secondOperand
            break
          case "-":
            computation = firstOperand - secondOperand
            break
          case "\u00D7":
            computation =
              Math.round(
                (firstOperand * secondOperand + Number.EPSILON) * 10e9
              ) / 10e9
            break
          case "\u00F7":
            computation =
              Math.round(
                (firstOperand / secondOperand + Number.EPSILON) * 10e9
              ) / 10e9
            break
          default:
            return
        }
      }
    })
    this.setState({ equation: computation, result: equation })
  }

  handleClick(e) {
    let equation = this.state.equation
    let result = this.state.result

    const pressedKey = e.target.value
    const operatorKeys = ["+", "-", "\u00D7", "\u00F7"]

    switch (!isNaN(pressedKey) || pressedKey) {
      case true:
        if (result) this.clear()
        this.setState({ equation: (equation += pressedKey) })
        break
      case ".":
        const decimalPoints = (equation.match(/\./g) || []).length

        switch (decimalPoints) {
          case 0:
            this.setState({ equation: (equation += pressedKey) })
            break
          case 1:
            for (let i = 0; i < operatorKeys.length; i++) {
              if (!equation.includes(operatorKeys[i])) {
                this.setState({ equation: (equation += "") })
              } else {
                this.setState({ equation: (equation += pressedKey) })
              }
            }
            break
          default:
            return
        }
        break
      case "+":
      case "-":
      case "\u00D7":
      case "\u00F7":
        if (!equation) {
          this.setState({
            equation: (equation += `${pressedKey}`),
          })
        } else {
          this.setState({
            equation: (equation += ` ${pressedKey} `),
          })
        }
        if (result) this.clearResult()
        break
      case "DEL":
        equation = equation.toString().slice(0, -1)
        this.setState({ equation: equation })
        if (result) this.clearResult()
        break
      case "AC":
        return this.clear()
      case "=":
        if ((equation && result) || (!equation && !result)) return
        this.calculate(equation, operatorKeys)
        break
      default:
        return
    }
  }

  clear() {
    this.setState({ equation: "", result: "" })
  }

  clearResult() {
    this.setState({ result: "" })
  }

  render() {
    return (
      <main className="calculator">
        <Screen equation={this.state.equation} result={this.state.result} />
        <BtnWrapper onClick={this.handleClick} />
      </main>
    )
  }
}

export default Calculator
