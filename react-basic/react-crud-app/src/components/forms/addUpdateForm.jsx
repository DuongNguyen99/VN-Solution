import React, { useState, useEffect } from "react"
import styles from "../../styles/form.module.css"

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
          <form onSubmit={handleUpdateSubmit}>
            <label>Name</label>
            <input
              className={styles["form-input"]}
              type="text"
              name="name"
              value={updatedUser.name}
              onChange={handleInputChange}
            />
            <label className={styles.red}>Username</label>
            <input
              className={styles["form-input"]}
              type="text"
              name="userName"
              value={updatedUser.userName}
              onChange={handleInputChange}
            />
            <div className="btn-container">
              <button className={(styles.button, styles["form-btn"])}>Update</button>
              <button
                className={`${styles.button} ${styles["form-btn"]} ${styles["muted-button"]}`}
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
          <form onSubmit={handleAddSubmit}>
            <label>Name</label>
            <input
              className={styles["form-input"]}
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
            />
            <label>Username</label>
            <input
              className={styles["form-input"]}
              type="text"
              name="userName"
              value={newUser.userName}
              onChange={handleInputChange}
            />
            <button className={`${styles.button} ${styles["form-btn"]}`}>Create</button>
          </form>
        </>
      )}
    </>
  )
}

export default AddUpdateForm
