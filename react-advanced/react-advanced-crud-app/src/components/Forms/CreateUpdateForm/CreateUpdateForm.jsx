import React, { useState, useEffect } from "react"
import CreateForm from "./CreateForm/CreateForm"
import UpdateForm from "./UpdateForm/UpdateForm"

const CreateUpdateForm = (props) => {
  const initialState = { id: null, name: "", userName: "" }
  const [editingUser, setEditingUser] = useState(props.selectedUser)

  useEffect(() => {
    setEditingUser(props.selectedUser)
  }, [props.selectedUser])

  const onCreateSubmit = (values) => {
    props.onCreate(values)
  }
  const onUpdateSubmit = (values) => {
    props.onUpdate(values.id, values)
    setEditingUser(initialState)
  }

  return (
    <>
      {!props.isEditing ? (
        <CreateForm onSubmit={onCreateSubmit} />
      ) : (
        <UpdateForm
          onSubmit={onUpdateSubmit}
          editingUser={editingUser}
          setEditingUser={setEditingUser}
        />
      )}
    </>
  )
}

export default CreateUpdateForm
