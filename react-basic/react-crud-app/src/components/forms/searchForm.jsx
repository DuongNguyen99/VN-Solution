import React, { useState, useEffect } from "react"

const SearchForm = (props) => {
  const [option, setOption] = useState("name")
  const [searchedValue, setSearchedValue] = useState({})

  // useEffect(() => {
  // setSearchedUsers(props.searchUser)
  // }, [props])

  const handleSelectChange = (e) => {
    const { value } = e.target
    setOption(value)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSearchedValue({ ...searchedValue, [name]: value })
    console.log(searchedValue)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const userOption = Object.keys(searchedValue)
    const userInput = Object.values(searchedValue)
    if (!searchedValue[option]) return
    props.searchUser(userOption, userInput)
  }

  const handleCancel = () => {
    props.cancelSearch()
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <h2>Search Name/Username</h2>
      <select className="search-selector" onChange={handleSelectChange}>
        <option value="name">Name</option>
        <option value="userName">Username</option>
      </select>
      <input
        className="form-input"
        type="text"
        name={option}
        // value={searchedUsers[option]}
        onChange={handleInputChange}
      />
      <button className="button form-btn" type="submit">
        Search
      </button>
      <button className="button form-btn muted-button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  )
}

export default SearchForm
