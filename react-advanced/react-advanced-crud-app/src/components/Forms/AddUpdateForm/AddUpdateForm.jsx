import React, { useState, useEffect } from "react"
import { Button, ButtonToolbar } from "rsuite"
import { Form, Field } from "react-final-form"

import "rsuite/dist/styles/rsuite-default.css"
import styles from "./AddUpdateForm.module.css"

const AddUpdateForm = (props) => {
  const [editingUser, setEditingUser] = useState(props.selectedUser)

  // useEffect(() => {
  //   setEditingUser(props.selectedUser)
  // }, [props])

  const onCreateSubmit = (values, form) => {
    if (!values.name || !values.userName) return
    props.onCreate(values)
    form.reset()
  }
  const onUpdateSubmit = (values) => {}

  return (
    <>
      {/*//? Update form */}
      <h2>Update User</h2>
      <Form
        onSubmit={onUpdateSubmit}
        render={({ handleSubmit, form, values }) => (
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
            <ButtonToolbar>
              <Button type="submit" appearance="primary" size="lg" className={styles["form-btn"]}>
                Update
              </Button>
              <Button
                type="button"
                appearance="ghost"
                size="lg"
                className={styles["form-btn"]}
                onClick={form.reset}
              >
                Cancel
              </Button>
            </ButtonToolbar>
          </form>
        )}
      ></Form>
      {/*//? Create form */}
      <h2>Create User</h2>
      <Form
        onSubmit={onCreateSubmit}
        render={({ handleSubmit, form, values }) => (
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
            <Button type="submit" appearance="primary" size="lg">
              Create
            </Button>
          </form>
        )}
      ></Form>
    </>
  )
}

export default AddUpdateForm
