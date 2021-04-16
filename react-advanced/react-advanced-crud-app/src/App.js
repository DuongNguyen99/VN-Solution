import React, { useState } from "react"
import UserForm from "./components/Forms/UserForm/UserForm"
import SearchForm from "./components/Forms/SearchForm/SearchForm"
import UserTable from "./components/Table/UserTable"

import styles from "./App.module.css"

const App = () => {
  const usersData = [
    { id: 1, name: "Tania", username: "floppydiskette" },
    { id: 2, name: "Matt", username: "benisphere" },
    { id: 3, name: "Craig", username: "siliconeidolon" },
    { id: 4, name: "Ben", username: "ecematentich" },
    { id: 5, name: "Warren", username: "ruipluiteafe" },
  ]

  // User state
  const initialState = { id: null, name: "", username: "" }
  const [users, setUsers] = useState(usersData) // Initial data
  const [selectedUser, setSelectedUser] = useState(initialState) // Selected user atfer clicking edit button
  const [searchedUsers, setSearchedUsers] = useState([])

  // Flag state
  const [isEditing, setIsEditing] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  // Create options for select box
  const fields = Object.keys(usersData[0]).slice(1)
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }
  const options = fields.map((field) => ({
    label: capitalize(field),
    value: capitalize(field),
  }))

  // ========= Form function ========= //
  const createUser = (newUser) => {
    newUser.id = users.length + 1
    setUsers([...users, newUser])
  }
  const updateUser = (id, updatedUser) => {
    if (isSearching) {
      setSearchedUsers(users.map((user) => (user.id === id ? updatedUser : user)))
    } else {
      setUsers(users.map((user) => (user.id === id ? updatedUser : user)))
    }
  }
  const searchUser = (user) => {
    const option = Object.keys(user).toString()
    const value = Object.values(user).toString()

    searchedUsers.length = 0 // Empty an array to avoid pushing previous data
    // eslint-disable-next-line array-callback-return
    users.map((user) => {
      if (user[option.toLowerCase()].includes(value)) {
        searchedUsers.push(user)
        setSearchedUsers([...searchedUsers])
      }
    })
  }

  // ========= Table function ========= //
  const editUser = (user) => {
    setSelectedUser({ id: user.id, name: user.name, username: user.username })
  }

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id))
    // Auto-decrease ID after deleting user
    for (let i = 0; i < users.length; i++) {
      if (users[i].id > id) users[i].id -= 1
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles["text-center"]}>CRUD App with Rsuite and RFF</h1>
      <div className={styles["flex-row"]}>
        <div className={styles["flex-form"]}>
          <UserForm
            selectedUser={selectedUser}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            onCreate={createUser}
            onUpdate={updateUser}
          />
          <SearchForm options={options} setIsSearching={setIsSearching} onSearch={searchUser} />
        </div>
        <div className={styles["flex-table"]}>
          <h2>Users Table</h2>
          <UserTable
            users={users}
            searchedUsers={searchedUsers}
            isSearching={isSearching}
            setIsEditing={setIsEditing}
            onEdit={editUser}
            onDelete={deleteUser}
          />
        </div>
      </div>
    </div>
  )
}

export default App
