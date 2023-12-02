import React, { useState, useEffect, useRef } from "react";

import "./App.css";
import Pagination from "./components/Pagination/PaginationComponent";
import UsersList from "./components/UsersList/UsersListComponent";
import config from "./constants";
import { getUsers } from "./services/UserService";
import { getRecordIndex } from "./utilities/PagingUtility";
import { searchInUsers } from "./utilities/SearchUtility";

function App() {
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const selectAllRef = useRef(null);
  useEffect(() => {
    getUsers(setUsers);
  }, []);

  // const searchUsers = (e) => {
  //   setPage(1);
  //   setUsers(searchInUsers(e.target.value, users));
  // };

  const searchUsers = () => {
    setPage(1);
    setUsers(searchInUsers(searchInput, users));
  };

  const deleteUser = (id) => {
    let tempUsers = users.filter((user) => user.id !== id);
    if (window.confirm("User  will be deleted")) {
      setUsers(tempUsers);
      setUpdate((prevState) => !prevState);
    }
  };

  const editUser = (id) => {
    let tempUsers = users;
    const index = tempUsers.findIndex((user) => user.id === id);
    tempUsers[index].edit = true;
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
  };

  const saveUser = (id, nameRef, emailRef, roleRef) => {
    let tempUsers = users;
    const index = tempUsers.findIndex((user) => user.id === id);
    tempUsers[index].name = nameRef.current.value;
    tempUsers[index].email = emailRef.current.value;
    tempUsers[index].role = roleRef.current.value;
    tempUsers[index].edit = false;
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
  };

  const selectOne = (id) => {
    let tempUsers = users;
    const index = tempUsers.findIndex((user) => user.id === id);
    tempUsers[index].selected = !tempUsers[index].selected;
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
  };

  const selectAll = (e) => {
    const listedUserIds = users
      .filter((user) => user.show)
      .slice(index, index + config.PAGE_SIZE)
      .map((user) => user.id);

    let tempUsers = users.map((user) => {
      if (listedUserIds.includes(user.id)) {
        user.selected = e.target.checked;
        return user;
      }
      return user;
    });

    setUsers(tempUsers);
    setUpdate(!update);
  };

  const deleteSelected = () => {
    if (window.confirm("Selected users will be deleted")) {
      setUsers((prevState) => prevState.filter((user) => !user.selected));
      selectAllRef.current.checked = false;
    }
  };

  const index = getRecordIndex(page);
  return (
    <div className="App">
      <div>
        <input
          className="border border-black w-[80%] p-1 m-3"
          type="text"
          placeholder="Search by name, email or role"
          //onChange={searchUsers}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        ></input>
        <button
          onClick={searchUsers}
          className="p-2 m-2 bg-black text-white rounded-lg"
        >
          Search
        </button>
      </div>
      <UsersList
        page={page}
        setPage={setPage}
        selectAll={selectAll}
        selectAllRef={selectAllRef}
        selectOne={selectOne}
        saveUser={saveUser}
        editUser={editUser}
        deleteUser={deleteUser}
        users={users
          .filter((user) => user.show)
          .slice(index, index + config.PAGE_SIZE)}
      ></UsersList>
      <Pagination
        usersLength={users.filter((user) => user.show).length}
        page={page}
        setPage={setPage}
        deleteSelected={deleteSelected}
      ></Pagination>
    </div>
  );
}

export default App;
