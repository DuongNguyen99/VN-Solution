import React, { useState } from "react"
import { Button, ButtonToolbar } from "rsuite"
import { Table } from "rsuite"

import "rsuite/dist/styles/rsuite-default.css"

const { Cell } = Table

const ActionCell = (props) => {
  const { onEdit, onDelete } = props

  return (
    <Cell {...props} style={{ padding: "0 10px" }}>
      <ButtonToolbar>
        <Button size="md" appearance="primary" onClick={() => onEdit(props.rowData)}>
          Edit
        </Button>
        <Button size="md" appearance="ghost" onClick={() => onDelete(props.rowData.id)}>
          Delete
        </Button>
      </ButtonToolbar>
    </Cell>
  )
}

export default ActionCell
