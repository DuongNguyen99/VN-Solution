import React, { useState } from "react"
import "../styles/styles.css"
import SearchForm from "./forms/searchForm"
import AddUserForm from "./forms/addForm"
import UpdateUserForm from "./forms/updateForm"
import UserTable from "./tables/userTable"

function App() {
  const usersData = [
    { id: 1, name: "Tania", userName: "floppydiskette" },
    { id: 2, name: "Matt", userName: "benisphere" },
    { id: 3, name: "Craig", userName: "siliconeidolon" },
    { id: 4, name: "Ben", userName: "ecematentich" },
    { id: 5, name: "Warren", userName: "ruipluiteafe" },
  ]

  //* State settings
  let [users, setUsers] = useState(usersData) // Initial data

  const [isEditing, setIsEditing] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const initialState = { id: null, name: "", userName: "" }
  const [selectedUser, setSelectedUser] = useState(initialState) // Selected user atfer clicking edit button

  const [searchedUsers, setSearchedUsers] = useState([])

  //* Form functions
  // Add function
  const addUser = (newUser) => {
    newUser.id = users.length + 1
    setUsers([...users, newUser])
  }
  // Update function
  const updateUser = (id, updatedUser) => {
    setIsEditing(false)
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)))
  }
  // Search function
  const searchUser = (option, value) => {
    if (!option) return

    const optionValue = users.map((user) => user[option])
    const matchedUsers = optionValue.filter((user) => user.indexOf(value) > -1)

    searchedUsers.length = 0 // Empty an array to avoid pushing duplicated data
    matchedUsers.forEach((matchedUser) => {
      users.forEach((user) => {
        if (user[option] === matchedUser) {
          searchedUsers.push(user)
          setSearchedUsers([...searchedUsers])
        }
      })
    })
  }

  //* Table functions
  // Edit function
  const editUser = (user) => {
    setIsEditing(true)
    setSelectedUser({ id: user.id, name: user.name, userName: user.userName })
  }
  // Delete function
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
                selectedUser={selectedUser} // User needs to be edited
                updateUser={updateUser} // User after editing
                setIsEditing={setIsEditing}
              />
            </>
          ) : (
            <>
              <h2>Add User</h2>
              <AddUserForm addUser={addUser} />
            </>
          )}
          <SearchForm searchUser={searchUser} setIsSearching={setIsSearching} />
        </div>
        <div className="flex-large">
          <h2>Users Table</h2>
          <UserTable
            users={users}
            searchedUsers={searchedUsers}
            editUser={editUser}
            deleteUser={deleteUser}
            isSearching={isSearching}
          />
        </div>
      </div>
    </div>
  )
}

export default App
