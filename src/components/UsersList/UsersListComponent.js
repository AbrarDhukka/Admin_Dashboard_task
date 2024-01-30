import PropTypes from "prop-types";
import { useEffect } from "react";
import User from "../UserComponent/UserComponent";
import config from "../../constants";

// Functional component for rendering a list of users
const UsersList = (props) => {
  // Destructuring props to extract required values
  const {
    users,
    deleteUser,
    editUser,
    saveUser,
    selectAll,
    selectOne,
    selectAllRef,
    setPage,
    page,
  } = props;

  // useEffect to handle page navigation when there are no users on a page
  useEffect(() => {
    if (users.length === 0 && page > 1) {
      setPage(page - 1);
    }
  }, [page, setPage, users.length]);

  // Generating empty table rows to fill up the remaining space in a table up to Page size = 10.
  // If a user is deleted, it automatically adds another user from the previous page to the current page.
  let fillRows = [];
  for (
    let i = users.filter((user) => user.show).length;
    i < config.PAGE_SIZE;
    i++
  ) {
    fillRows.push(<tr key={i}></tr>);
  }

  // If there are no users on the first page, display a message
  if (users.length === 0 && page === 1) {
    return <div>No Users Present.</div>;
  }

  // Rendering the table with user data
  return (
    <table className="w-[80%] m-auto h-[80%] border-collapse table-fixed">
      <thead>
        <tr className="border-[3px] border-black text-left h-[10%]">
          <th className="font-bold text-lg px-16">
            <input
              type="checkbox"
              ref={selectAllRef}
              onChange={(e) => {
                selectAll(e);
              }}
              name="selectAll"
            />
          </th>
          <th className="font-bold text-lg px-1">Name</th>
          <th className="font-bold text-lg px-1">Email</th>
          <th className="font-bold text-lg px-1">Role</th>
          <th className="font-bold text-lg px-1">Action</th>
        </tr>
      </thead>
      <tbody className="font-thin">
        {users.map((user) => {
          return user.show ? (
            <User
              selectOne={selectOne}
              saveUser={saveUser}
              editUser={editUser}
              deleteUser={deleteUser}
              key={user.id}
              user={user}
            ></User>
          ) : (
            ""
          );
        })}
        {fillRows}
      </tbody>
    </table>
  );
};

// PropType definitions for type-checking React props
UsersList.propTypes = {
  users: PropTypes.array,
  deleteUser: PropTypes.func,
  editUser: PropTypes.func,
  saveUser: PropTypes.func,
  selectAll: PropTypes.func,
  selectOne: PropTypes.func,
  selectAllRef: PropTypes.object,
  setPage: PropTypes.func,
  page: PropTypes.number,
};

// Exporting the UsersList components
export default UsersList;
