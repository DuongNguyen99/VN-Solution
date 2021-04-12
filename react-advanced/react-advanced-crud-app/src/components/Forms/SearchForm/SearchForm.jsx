import React, { useState } from "react"

import { Button, ButtonToolbar, SelectPicker } from "rsuite"
import "rsuite/dist/styles/rsuite-default.css"
import { Form, Field } from "react-final-form"

import styles from "./SearchForm.module.css"

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const onSubmit = async (values) => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

const SearchForm = (props) => {
  const { options } = props

  return (
    <div className={styles.container}>
      <h2>Search Name/Username</h2>
      <SelectPicker
        size="lg"
        searchable={false}
        style={{ width: 180 }}
        data={options}
      ></SelectPicker>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
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
          </form>
        )}
      ></Form>
      <ButtonToolbar>
        <Button appearance="primary" size="lg" type="submit">
          Search
        </Button>
        <Button appearance="ghost" size="lg" type="submit">
          Cancel
        </Button>
      </ButtonToolbar>
    </div>
  )
}

export default SearchForm
