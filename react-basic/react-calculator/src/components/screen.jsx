import React from "react"
import ScreenRow from "./screenRow"

const Screen = (props) => {
  return (
    <div className="screen">
      <ScreenRow>{props.result}</ScreenRow>
      <ScreenRow>{props.equation}</ScreenRow>
    </div>
  )
}

export default Screen
