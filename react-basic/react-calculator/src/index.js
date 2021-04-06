import React, { Component } from "react"
import ReactDOM from "react-dom"
import Calculator from "./components/Calculator"

class App extends Component {
  render() {
    return <Calculator />
  }
}

ReactDOM.render(<App />, document.getElementById("root"))
