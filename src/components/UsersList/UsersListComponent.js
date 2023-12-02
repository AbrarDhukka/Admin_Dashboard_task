import PropTypes from "prop-types";
import { useEffect } from "react";
import User from "../UserComponent/UserComponent";
import config from "../../constants";


const UsersList = (props) => {
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

  useEffect(() => {
    if (users.length === 0 && page > 1) {
      setPage(page - 1);
    }
  }, [page, setPage, users.length]);

  //The purpose of this loop is to generate empty table rows to fill up the remaining space in a table up to Page size = 10.
  //Suppose if you delete 1 user from row, it will automatically add another user from previous page to current page.
  let fillRows = [];
  for (
    let i = users.filter((user) => user.show).length;
    i < config.PAGE_SIZE;
    i++
  ) {
    fillRows.push(<tr key={i}></tr>);
  }

  if (users.length === 0 && page === 1) {
    return <div>No Users Present.</div>;
  }

  return (
    <table className="w-[80%] m-auto h-[80%] border-collapse table-fixed">
      <thead>
        <tr className="border-[3px] border-black  text-left h-[10%]">
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

//used for type-checking React props to ensure that the correct data types are passed to a component
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

export default UsersList;
