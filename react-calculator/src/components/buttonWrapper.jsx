import React from "react"
import Button from "./button"

const BtnWrapper = ({ onClick }) => {
  return (
    <div className="btn-wrapper" onClick={onClick}>
      <Button value={"+"} />
      <Button value={"-"} />
      <Button value={"\u00D7"} />
      <Button value={"\u00F7"} />

      <Button value={7} />
      <Button value={8} />
      <Button value={9} />
      <Button value={"AC"} featureKey="clear-key" />

      <Button value={"4"} />
      <Button value={"5"} />
      <Button value={"6"} />

      <Button value={"1"} />
      <Button value={"2"} />
      <Button value={"3"} />

      <Button value={"0"} />
      <Button value={"."} />
      <Button value={"DEL"} />

      <Button value={"="} featureKey="equal-sign-key" />
    </div>
  )
}

export default BtnWrapper
