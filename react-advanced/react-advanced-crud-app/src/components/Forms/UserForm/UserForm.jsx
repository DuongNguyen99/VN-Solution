import React, { useState, useEffect } from "react"
import { Input as InputRS, ControlLabel } from "rsuite"
import { Button as ButtonRS, ButtonToolbar } from "rsuite"
import { Form as FormFF, Field as FieldFF } from "react-final-form"
import styles from "./UserForm.module.css"

const UserForm = (props) => {
  const initialState = { id: null, name: "", username: "" }
  const [editingUser, setEditingUser] = useState(props.selectedUser)

  useEffect(() => {
    setEditingUser(props.selectedUser)
  }, [props.selectedUser])

  // ========= Handle event listeners =========
  const onCreateSubmit = (values) => {
    props.onCreate(values)
  }
  const onUpdateSubmit = (values) => {
    props.onUpdate(values.id, values)
    props.setIsEditing(false)
    setEditingUser(initialState)
  }
  const onCancel = () => {
    props.setIsEditing(false)
    setEditingUser(initialState)
  }

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

  const InputAdapter = (props) => {
    const { input, meta, ...rest } = props
    return (
      <div style={{ marginBottom: "1rem" }}>
        <ControlLabel>{props.hintText}</ControlLabel>
        <InputRS {...input} {...rest} className={styles["form-input"]} />
        {meta.error && meta.touched && <span className={styles.error}>{meta.error}</span>}{" "}
      </div>
    )
  }

  const UserForm = (props) => {
    const { title, onSubmit, initialValues, formAction, formCancel } = props
    return (
      <div>
        <h2>{title}</h2>
        <FormFF
          onSubmit={onSubmit}
          initialValues={initialValues}
          validate={FormValidation}
          render={({ handleSubmit, form }) => (
            <form onSubmit={handleSubmit}>
              <FieldFF name="name" component={InputAdapter} hintText="Name"></FieldFF>
              <FieldFF name="username" component={InputAdapter} hintText="Username"></FieldFF>
              <ButtonToolbar>
                <ButtonRS appearance="primary" size="lg" type="submit">
                  {formAction}
                </ButtonRS>
                <ButtonRS
                  appearance="ghost"
                  size="lg"
                  type="button"
                  onClick={formCancel || form.reset}
                >
                  Cancel
                </ButtonRS>
              </ButtonToolbar>
            </form>
          )}
        ></FormFF>
      </div>
    )
  }

  return (
    <>
      {!props.isEditing ? (
        // Create form
        <UserForm
          title="Create User"
          onSubmit={onCreateSubmit}
          initialValues={initialState}
          formAction="Create"
        />
      ) : (
        // Update form
        <UserForm
          title="Update User"
          onSubmit={onUpdateSubmit}
          initialValues={editingUser}
          formAction="Update"
          formCancel={onCancel}
        />
      )}
    </>
  )
}

export default UserForm
