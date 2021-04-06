import React, { useState } from "react"
import "../styles/styles.css"
import AddUserForm from "./forms/addUserForm"
import UpdateUserForm from "./forms/updateUserForm"
import UserTable from "./tables/userTable"

function App() {
  const usersData = [
    { id: 1, name: "Tania", userName: "floppydiskette" },
    { id: 2, name: "Craig", userName: "siliconeidolon" },
    { id: 3, name: "Ben", userName: "benisphere" },
  ]

  // State settings
  const [isEditing, setIsEditing] = useState(false) // Switch between add and update form
  const initialState = { id: null, name: "", userName: "" }
  const [selectedUser, setSelectedUser] = useState(initialState)
  const [users, setUsers] = useState(usersData)

  // Form
  const addUser = (newUser) => {
    newUser.id = users.length + 1
    setUsers([...users, newUser])
  }
  const updateUser = (id, updatedUser) => {
    setIsEditing(false)
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)))
  }

  // Table
  const editUser = (user) => {
    setIsEditing(true)
    setSelectedUser({ id: user.id, name: user.name, userName: user.userName })
  }
  const deleteUser = (id) => {
    setUsers(users.filter((user, index) => user.id !== id))
  }

  return (
    <div className="container">
      <h1 className="text-center">CRUD App in React</h1>
      <div className="flex-row">
        <div className="flex-large">
          {isEditing ? (
            <>
              <h2>Update User</h2>
              <UpdateUserForm
                selectedUser={selectedUser} // User needs to be edited
                updateUser={updateUser} // User after editing
              />
            </>
          ) : (
            <>
              <h2>Add User</h2>
              <AddUserForm addUser={addUser} />
            </>
          )}
        </div>
        <div className="flex-large">
          <h2>Users Table</h2>
          <UserTable
            users={users}
            editUser={editUser}
            deleteUser={deleteUser}
          />
        </div>
      </div>
    </div>
  )
}

export default App
