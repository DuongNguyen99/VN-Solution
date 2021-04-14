import React, { useState, useEffect } from "react"
import CreateForm from "./CreateForm/CreateForm"
import UpdateForm from "./UpdateForm/UpdateForm"

const CreateUpdateForm = (props) => {
  const initialState = { id: null, name: "", username: "" }
  const [editingUser, setEditingUser] = useState(props.selectedUser)

  useEffect(() => {
    setEditingUser(props.selectedUser)
  }, [props.selectedUser])

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

  return (
    <>
      {!props.isEditing ? (
        <CreateForm onSubmit={onCreateSubmit} />
      ) : (
        <UpdateForm
          onSubmit={onUpdateSubmit}
          onCancel={onCancel}
          editingUser={editingUser}
          setEditingUser={setEditingUser}
        />
      )}
    </>
  )
}

export default CreateUpdateForm
