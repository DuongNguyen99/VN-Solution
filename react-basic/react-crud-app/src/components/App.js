import React, { useState } from "react"
import "../styles/styles.css"
import SearchForm from "./forms/searchForm"
import AddUserForm from "./forms/addUserForm"
import UpdateUserForm from "./forms/updateUserForm"
import UserTable from "./tables/userTable"

function App() {
  const usersData = [
    { id: 1, name: "Tania", userName: "floppydiskette" },
    { id: 2, name: "Matt", userName: "benisphere" },
    { id: 3, name: "Craig", userName: "siliconeidolon" },
    { id: 4, name: "Ben", userName: "ecematentich" },
    { id: 5, name: "Warren", userName: "ruipluiteafe" },
  ]

  // State settings
  const [isEditing, setIsEditing] = useState(false) // Switch between add and update form
  const initialState = { id: null, name: "", userName: "" }
  const [selectedUser, setSelectedUser] = useState(initialState)
  let [users, setUsers] = useState(usersData)

  // Form
  const addUser = (newUser) => {
    newUser.id = users.length + 1
    setUsers([...users, newUser])
  }
  const updateUser = (id, updatedUser) => {
    setIsEditing(false)
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)))
  }
  const searchUser = (option, value) => {
    option = option.toString() // Convert array to string
    const usersOption = users.map((user) => user[option])
    const searchedUsers = usersOption.filter((user) => user.indexOf(value) > -1)
    const tempUsers = []

    searchedUsers.forEach((searchedUser) => {
      users.forEach((user) => {
        if (user[option] === searchedUser) {
          tempUsers.push(user)
          setUsers(tempUsers)
        }
      })
    })
  }

  // Table
  const editUser = (user) => {
    setIsEditing(true)
    setSelectedUser({ id: user.id, name: user.name, userName: user.userName })
  }
  const deleteUser = (id) => {
    const deletedId = id

    users = users.filter((user) => user.id !== id)
    for (let i = 0; i < users.length; i++) {
      if (users[i].id > deletedId) users[i].id -= 1
    }
    setUsers(users)
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
                setIsEditing={setIsEditing}
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
          <SearchForm
            searchUser={searchUser}
            cancelSearch={() => {
              console.log(users)
              setUsers(users)
            }}
          />
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
