import React from "react"
import { Button, ButtonToolbar } from "rsuite"
import { Form, Field } from "react-final-form"

import styles from "../CreateUpdateForm.module.css"

const UpdateForm = (props) => {
  return (
    <>
      <h2>Update User</h2>
      <Form
        onSubmit={props.onSubmit}
        initialValues={props.editingUser}
        render={({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Field name="name">
                {({ input }) => {
                  return (
                    <div style={{ marginBottom: "1rem" }}>
                      <label htmlFor="name">Name</label>
                      <input {...input} className={styles["form-input"]} type="text" />
                    </div>
                  )
                }}
              </Field>
              <Field name="username">
                {({ input }) => (
                  <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="username">Username</label>
                    <input {...input} className={styles["form-input"]} type="text" />
                  </div>
                )}
              </Field>
              <ButtonToolbar>
                <Button appearance="primary" size="lg" type="submit">
                  Update
                </Button>
                <Button appearance="ghost" size="lg" type="button" onClick={props.onCancel}>
                  Cancel
                </Button>
              </ButtonToolbar>
            </form>
          )
        }}
      ></Form>
    </>
  )
}

export default UpdateForm
