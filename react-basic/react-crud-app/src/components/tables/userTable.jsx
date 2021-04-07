import React from "react"

const UserTable = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Username</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.isSearching ? (
          props.searchedUsers.length > 0 ? (
            props.searchedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.userName}</td>
                <td>
                  <button
                    className="button table-btn muted-button"
                    onClick={() => props.editUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="button table-btn muted-button"
                    onClick={() => props.deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No users</td>
            </tr>
          )
        ) : props.users.length > 0 ? (
          props.users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.userName}</td>
              <td>
                <button
                  className="button table-btn muted-button"
                  onClick={() => props.editUser(user)}
                >
                  Edit
                </button>
                <button
                  className="button table-btn muted-button"
                  onClick={() => props.deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4}>No users</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default UserTable
