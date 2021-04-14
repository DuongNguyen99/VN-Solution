import React from "react"
import { Table } from "rsuite"
import ActionCell from "./ActionCell/ActionCell"

import "rsuite/dist/styles/rsuite-default.css"

const { Column, HeaderCell, Cell } = Table

const Header = (props) => {
  return (
    <HeaderCell
      {...props}
      style={{ padding: "0 10px", fontSize: "1rem", color: "black", fontWeight: 600 }}
    />
  )
}

const createTable = (data, setIsEditing, onEdit, onDelete) => {
  return (
    <Table data={data} autoHeight rowHeight={56}>
      <Column flexGrow={1} verticalAlign="middle">
        <Header>Id</Header>
        <Cell dataKey="id" />
      </Column>
      <Column flexGrow={2} verticalAlign="middle">
        <Header>Name</Header>
        <Cell dataKey="name" />
      </Column>
      <Column flexGrow={3} verticalAlign="middle">
        <Header>Username</Header>
        <Cell dataKey="username" />
      </Column>
      <Column flexGrow={2} verticalAlign="middle">
        <Header>Actions</Header>
        <ActionCell setIsEditing={setIsEditing} onEdit={onEdit} onDelete={onDelete} />
      </Column>
    </Table>
  )
}

const UserTable = (props) => {
  return (
    <>
      {!props.isSearching
        ? createTable(props.users, props.setIsEditing, props.onEdit, props.onDelete)
        : createTable(props.searchedUsers, props.setIsEditing, props.onEdit, props.onDelete)}
    </>
  )
}

export default UserTable
