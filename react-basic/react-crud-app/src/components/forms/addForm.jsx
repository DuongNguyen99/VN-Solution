import React, { useState } from "react"

const AddForm = (props) => {
  const initialState = { id: null, name: "", userName: "" }
  const [newUser, setNewUser] = useState(initialState)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewUser({ ...newUser, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newUser.name || !newUser.userName) return
    props.addUser(newUser)
    setNewUser(initialState)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        className="form-input"
        type="text"
        name="name"
        value={newUser.name}
        onChange={handleInputChange}
      />
      <label>Username</label>
      <input
        className="form-input"
        type="text"
        name="userName"
        value={newUser.userName}
        onChange={handleInputChange}
      />
      <button className="button form-btn">Create</button>
    </form>
  )
}

export default AddForm
