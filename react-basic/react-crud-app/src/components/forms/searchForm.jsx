import React, { useState } from "react"
import styles from "../../styles/form.module.css"

const SearchForm = (props) => {
  const [selection, setSelection] = useState("name")
  const [searchedValue, setSearchedValue] = useState({
    [selection]: "",
  })

  const handleSelectChange = (e) => {
    const option = e.target.options[e.target.selectedIndex].value
    setSelection(option)
    setSearchedValue({ [option]: Object.values(searchedValue).toString() }) // Set value of input field to new option
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSearchedValue({ [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const option = Object.keys(searchedValue).toString()
    const value = Object.values(searchedValue).toString()

    if (!searchedValue[option]) return
    props.searchUser(option, value)
    props.setIsSearching(true)
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setSearchedValue({})
    props.setIsSearching(false)
  }

  return (
    <form className={styles["search-form"]}>
      <h2>Search Name/Username</h2>
      <select
        className={styles["search-selector"]}
        onChange={handleSelectChange}
      >
        <option value="name">Name</option>
        <option value="userName">Username</option>
      </select>
      <input
        className={styles["form-input"]}
        type="text"
        name={selection}
        onChange={handleInputChange}
      />
      <button
        className={`${styles.button} ${styles["form-btn"]}`}
        onClick={handleSubmit}
      >
        Search
      </button>
      <button
        className={`${styles.button} ${styles["form-btn"]} ${styles["muted-button"]}`}
        onClick={handleCancel}
      >
        Cancel
      </button>
    </form>
  )
}

export default SearchForm
