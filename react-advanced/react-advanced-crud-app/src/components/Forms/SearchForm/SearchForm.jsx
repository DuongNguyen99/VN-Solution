import React, { useState } from "react"
import { Button, ButtonToolbar, SelectPicker } from "rsuite"
import { Form, Field } from "react-final-form"

import "rsuite/dist/styles/rsuite-default.css"
import styles from "./SearchForm.module.css"

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const onSubmit = (values) => {
  // await sleep(300)
  // window.alert(JSON.stringify(values, 0, 2))
}

const SearchForm = ({ options }) => {
  const [select, setSelect] = useState(null)
  const handleSelectChange = (value) => {
    setSelect(value)
  }

  return (
    <div className={styles.container}>
      <h2>Search Name/Username</h2>
      <SelectPicker
        data={options}
        onChange={handleSelectChange}
        value={select}
        size="lg"
        searchable={false}
        style={{ width: 180 }}
      ></SelectPicker>
      <Form
        onSubmit={onSubmit}
        render={(props) => {
          // console.log(props.values)
          return (
            <form onSubmit={props.handleSubmit}>
              {/* Name input field */}
              <Field name="name">
                {({ input }) => (
                  <div>
                    <label htmlFor="name">Name</label>
                    <input {...input} className={styles["form-input"]} type="text" />
                  </div>
                )}
              </Field>

              {/* Username input field */}
              <Field name="userName">
                {({ input }) => (
                  <div>
                    <label htmlFor="userName">Username</label>
                    <input {...input} className={styles["form-input"]} type="text" />
                  </div>
                )}
              </Field>
              <ButtonToolbar>
                <Button appearance="primary" size="lg" type="submit">
                  Search
                </Button>
                <Button appearance="ghost" size="lg" type="button" onClick={props.form.reset}>
                  Cancel
                </Button>
              </ButtonToolbar>
              <pre>{JSON.stringify(props.values, 0, 2)}</pre>
            </form>
          )
        }}
      ></Form>
    </div>
  )
}

export default SearchForm
