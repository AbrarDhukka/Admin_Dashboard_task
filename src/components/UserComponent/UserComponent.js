import { useRef } from "react";
import PropTypes from "prop-types";

const User = (props) => {
  const { user, deleteUser, editUser, saveUser, selectOne } = props;

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const roleRef = useRef(null);

  return (
    <tr
      key={user.id}
      className={`${
        user.selected ? "bg-gray-200" : ""
      } border-black border-[1px] text-left h-[10%]`}
    >
      <td className="px-1">
        <label for={`check-${user.id}`}>
          <input
            id={`check-${user.id}`}
            type="checkbox"
            data={`${user.selected}`}
            onChange={() => selectOne(user.id)}
            checked={user.selected}
            className={user.selected ? "bg-gray-200" : ""}
          ></input>
        </label>
      </td>
      <td>
        <input
          className={`${
            user.edit
              ? "border-black border-[1px] w-[90%] text-ellipsis"
              : "border-none w-[90%] text-ellipsis"
          } ${user.selected ? "bg-gray-200" : ""}`}
          readOnly={!user.edit}
          type="text"
          ref={nameRef}
          name="name"
          defaultValue={user.name}
        ></input>
      </td>
      <td>
        <input
          className={`${
            user.edit
              ? "border-black border-[1px] w-[90%] text-ellipsis"
              : "border-none w-[90%] text-ellipsis"
          } ${user.selected ? "bg-gray-200" : ""}`}
          readOnly={!user.edit}
          type="email"
          ref={emailRef}
          name="email"
          defaultValue={user.email}
        />
      </td>
      <td>
        <input
          className={`${
            user.edit
              ? "border-black border-[1px] w-[90%] text-ellipsis"
              : "border-none w-[90%] text-ellipsis"
          } ${user.selected ? "bg-gray-200" : ""}`}
          readOnly={!user.edit}
          type="text"
          ref={roleRef}
          name="role"
          defaultValue={user.role}
        />
      </td>
      <td>
        {user.edit ? (
          <button
            onClick={() => saveUser(user.id, nameRef, emailRef, roleRef)}
            className="p-2 m-2 rounded-lg text-white bg-black"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => editUser(user.id)}
            className="p-2 m-2 rounded-lg text-white bg-black"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => deleteUser(user.id)}
          className="p-2 m-2 rounded-lg text-white bg-black"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

User.propTypes = {
  user: PropTypes.object,
  deleteUser: PropTypes.func,
  editUser: PropTypes.func,
  saveUser: PropTypes.func,
  selectOne: PropTypes.func,
};

export default User;
