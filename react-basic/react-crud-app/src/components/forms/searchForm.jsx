import React, { useState } from "react"

const SearchForm = (props) => {
  const [option, setOption] = useState("name")
  const [searchedValue, setSearchedValue] = useState({})

  const handleSelectChange = (e) => {
    const { value } = e.target
    setOption(value)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSearchedValue({ ...searchedValue, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const option = Object.keys(searchedValue)
    const inputValue = Object.values(searchedValue)
    if (!searchedValue[option]) return
    props.searchUser(option, inputValue)
    props.setIsSearching(true)
  }

  const handleCancel = (e) => {
    e.preventDefault()
    props.setIsSearching(false)
  }

  return (
    <form className="search-form">
      <h2>Search Name/Username</h2>
      <select className="search-selector" onChange={handleSelectChange}>
        <option value="name">Name</option>
        <option value="userName">Username</option>
      </select>
      <input
        className="form-input"
        type="text"
        name={option}
        onChange={handleInputChange}
      />
      <button className="button form-btn" type="submit" onClick={handleSubmit}>
        Search
      </button>
      <button className="button form-btn muted-button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  )
}

export default SearchForm
