import React from "react"

const Button = (props) => {
  const { value, featureKey, onClick } = props
  return (
    <button
      className={featureKey ? `btn ${featureKey}` : "btn"}
      onClick={onClick}
      value={value}
    >
      {value}
    </button>
  )
}

export default Button
