import React from "react"
import { Button, ButtonToolbar } from "rsuite"
import { Form, Field } from "react-final-form"

import styles from "../CreateUpdateForm.module.css"

const FormValidation = (values) => {
  const errors = {}
  if (!values.name) {
    errors.name = "Name is required"
  }
  if (!values.username) {
    errors.username = "Username is required"
  }
  return errors
}

const CreateForm = (props) => {
  const initialState = { id: null, name: "", username: "" }
  return (
    <div>
      <h2>Create User</h2>
      <Form
        onSubmit={props.onSubmit}
        initialValues={initialState}
        validate={FormValidation}
        render={({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit}>
            <Field name="name">
              {({ input, meta }) => (
                <div style={{ marginBottom: "1rem" }}>
                  <label htmlFor="name">Name</label>
                  <input {...input} className={styles["form-input"]} type="text" />
                  {meta.error && meta.touched && <span className={styles.error}>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="username">
              {({ input, meta }) => (
                <div style={{ marginBottom: "1rem" }}>
                  <label htmlFor="username">Username</label>
                  <input {...input} className={styles["form-input"]} type="text" />
                  {meta.error && meta.touched && <span className={styles.error}>{meta.error}</span>}
                </div>
              )}
            </Field>
            <ButtonToolbar>
              <Button appearance="primary" size="lg" type="submit">
                Create
              </Button>
              <Button appearance="ghost" size="lg" type="button" onClick={form.reset}>
                Cancel
              </Button>
            </ButtonToolbar>
          </form>
        )}
      ></Form>
    </div>
  )
}

export default CreateForm
