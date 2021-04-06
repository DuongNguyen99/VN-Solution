import React, { useState, useEffect } from "react"

const UpdateUserForm = (props) => {
  const [updatedUser, setUpdatedUser] = useState(props.selectedUser) // Get data from edited user

  useEffect(() => {
    setUpdatedUser(props.selectedUser)
  }, [props])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUpdatedUser({ ...updatedUser, [name]: value })
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        props.updateUser(updatedUser.id, updatedUser)
      }}
    >
      <label>Name</label>
      <input
        className="form-input"
        type="text"
        name="name"
        value={updatedUser.name}
        onChange={handleInputChange}
      />
      <label>Username</label>
      <input
        className="form-input"
        type="text"
        name="userName"
        value={updatedUser.userName}
        onChange={handleInputChange}
      />
      <div className="btn-container">
        <button className="button form-btn">Update</button>
        <button className="button form-btn muted-button">Cancel</button>
      </div>
    </form>
  )
}

export default UpdateUserForm
