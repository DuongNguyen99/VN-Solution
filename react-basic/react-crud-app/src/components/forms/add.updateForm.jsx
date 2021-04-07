import React, { useState, useEffect } from "react"

const AddUpdateForm = (props) => {
  const initialState = { id: null, name: "", userName: "" }
  const [newUser, setNewUser] = useState(initialState)

  const [updatedUser, setUpdatedUser] = useState(props.selectedUser) // Get data from edited user

  useEffect(() => {
    setUpdatedUser(props.selectedUser)
  }, [props])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (props.isEditing) {
      setUpdatedUser({ ...updatedUser, [name]: value })
    } else {
      setNewUser({ ...newUser, [name]: value })
    }
  }

  const handleAddSubmit = (e) => {
    e.preventDefault()
    if (!newUser.name || !newUser.userName) return
    props.addUser(newUser)
    setNewUser(initialState)
  }

  const handleUpdateSubmit = (e) => {
    e.preventDefault()
    props.updateUser(updatedUser.id, updatedUser)
    props.setIsEditing(false)
  }

  return (
    <>
      {props.isEditing ? (
        <>
          {/* //*Update form */}
          <h2>Update User</h2>
          <form onSubmit={handleUpdateSubmit} className="update-form">
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
              <button
                className="button form-btn muted-button"
                onClick={() => props.setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          {/* //*Add form */}
          <h2>Add User</h2>
          <form onSubmit={handleAddSubmit} className="add-form">
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
        </>
      )}
    </>
  )
}

export default AddUpdateForm
