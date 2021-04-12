import React, { useState } from "react"
// import cx from "classnames"

import AddUpdateForm from "./components/Forms/AddUpdateForm/AddUpdateForm"
import SearchForm from "./components/Forms/SearchForm/SearchForm"
import UserTable from "./components/Table/UserTable"
import styles from "./App.module.css"

const App = () => {
  const usersData = [
    { id: 1, name: "Tania", userName: "floppydiskette" },
    { id: 2, name: "Matt", userName: "benisphere" },
    { id: 3, name: "Craig", userName: "siliconeidolon" },
    { id: 4, name: "Ben", userName: "ecematentich" },
    { id: 5, name: "Warren", userName: "ruipluiteafe" },
  ]

  //* State settings
  let [users, setUsers] = useState(usersData) // Initial data
  const [selectedUser, setSelectedUser] = useState({ id: null, name: "", userName: "" }) // Selected user atfer clicking edit button

  // Create options for select box
  const fields = Object.keys(usersData[0]).slice(1)
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }
  const options = fields.map((field) => ({
    label: capitalize(field),
    value: capitalize(field),
  }))

  //* Form function
  const createUser = (newUser) => {
    newUser.id = users.length + 1
    setUsers([...users, newUser])
  }

  //* Table function
  const editUser = (user) => {
    console.log(user)
    console.log(selectedUser)
    setSelectedUser({ id: user.id, name: user.name, userName: user.userName })
    console.log(selectedUser)
  }
  const deleteUser = (id) => {
    const deletedId = id
    // Auto-decrease id
    users = users.filter((user) => user.id !== id)
    for (let i = 0; i < users.length; i++) {
      if (users[i].id > deletedId) users[i].id -= 1
    }
    setUsers(users)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles["text-center"]}>CRUD App with Rsuite and RFF</h1>
      <div className={styles["flex-row"]}>
        <div className={styles["flex-form"]}>
          <AddUpdateForm selectedUser={selectedUser} onCreate={createUser} />
          <SearchForm options={options} />
        </div>
        <div className={styles["flex-table"]}>
          <h2>Users Table</h2>
          <UserTable users={users} onEdit={editUser} onDelete={deleteUser} />
        </div>
      </div>
    </div>
  )
}

export default App
