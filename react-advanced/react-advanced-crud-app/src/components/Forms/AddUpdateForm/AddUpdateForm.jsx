import React, { useState, useEffect } from "react"
import { Button, ButtonToolbar } from "rsuite"
import { Form, Field } from "react-final-form"

import "rsuite/dist/styles/rsuite-default.css"
import styles from "./AddUpdateForm.module.css"

const AddUpdateForm = (props) => {
  const initialState = { id: null, name: "", userName: "" }
  const [editingUser, setEditingUser] = useState(props.selectedUser)

  useEffect(() => {
    setEditingUser(props.selectedUser)
  }, [props.selectedUser])

  const onCreateSubmit = (values, form) => {
    props.onCreate(values)
    form.reset()
  }

  const onUpdateSubmit = (values, form) => {
    props.onUpdate(values.id, values)
    setEditingUser(initialState)
  }

  return (
    <>
      {/*//* ========= Update form ========= */}
      <h2>Update User</h2>
      <Form
        onSubmit={onUpdateSubmit}
        initialValues={editingUser}
        render={({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Field name="name">
                {({ input }) => {
                  return (
                    <div>
                      <label htmlFor="name">Name</label>
                      <input {...input} className={styles["form-input"]} type="text" />
                    </div>
                  )
                }}
              </Field>
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
                  Update
                </Button>
                <Button
                  appearance="ghost"
                  size="lg"
                  type="button"
                  onClick={() => setEditingUser(initialState)}
                >
                  Cancel
                </Button>
              </ButtonToolbar>
              {/* <pre>{JSON.stringify(props.values, 0, 2)}</pre> */}
            </form>
          )
        }}
      ></Form>

      {/*//* ========= Create form ========= */}
      <h2>Create User</h2>
      <Form
        onSubmit={onCreateSubmit}
        initialValues={initialState}
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
            <Button type="submit" appearance="primary" size="lg">
              Create
            </Button>
            {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
          </form>
        )}
      ></Form>
    </>
  )
}

export default AddUpdateForm
