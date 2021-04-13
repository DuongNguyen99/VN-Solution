import React, { useState } from "react"
import { Button, ButtonToolbar } from "rsuite"
import { Table } from "rsuite"

import "rsuite/dist/styles/rsuite-default.css"

const { Cell } = Table

const ActionCell = (props) => {
  return (
    <Cell {...props} style={{ padding: "0 10px" }}>
      <ButtonToolbar>
        <Button size="md" appearance="primary" onClick={() => props.onEdit(props.rowData)}>
          Edit
        </Button>
        <Button size="md" appearance="ghost" onClick={() => props.onDelete(props.rowData.id)}>
          Delete
        </Button>
      </ButtonToolbar>
    </Cell>
  )
}

export default ActionCell
