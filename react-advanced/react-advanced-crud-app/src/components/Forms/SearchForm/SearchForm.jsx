import React, { useState } from "react"
import { Button, ButtonToolbar, SelectPicker } from "rsuite"
import { Form, Field } from "react-final-form"

import "rsuite/dist/styles/rsuite-default.css"
import styles from "./SearchForm.module.css"

const SearchForm = (props) => {
  const [select, setSelect] = useState(null)

  const onSubmit = (values, form) => {
    form.reset()
    props.setIsSearching(true)
    props.onSearch(values)
  }
  const handleCancel = () => props.setIsSearching(false)
  const handleChange = (value) => setSelect(value)

  return (
    <div className={styles.container}>
      <h2>Search Name/Username</h2>
      <SelectPicker
        data={props.options}
        onChange={handleChange}
        value={select}
        size="lg"
        searchable={false}
        style={{ width: 200 }}
      ></SelectPicker>
      <Form
        onSubmit={onSubmit}
        render={(props) => {
          return (
            <form onSubmit={props.handleSubmit}>
              <Field name={select ? select : ""}>
                {({ input }) => {
                  return (
                    <div className={select === null ? styles.hidden : ""}>
                      <label htmlFor="name">{select}</label>
                      <input {...input} className={styles["form-input"]} type="text" />
                    </div>
                  )
                }}
              </Field>
              <ButtonToolbar style={{ marginTop: "1rem" }}>
                <Button appearance="primary" size="lg" type="submit">
                  Search
                </Button>
                <Button
                  appearance="ghost"
                  size="lg"
                  type="button"
                  onClick={() => {
                    handleCancel()
                    props.form.reset()
                  }}
                >
                  Cancel
                </Button>
              </ButtonToolbar>
            </form>
          )
        }}
      ></Form>
    </div>
  )
}

export default SearchForm
