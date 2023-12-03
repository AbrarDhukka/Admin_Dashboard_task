import { useRef } from "react";
import PropTypes from "prop-types";

// Functional component representing a user row in a table
const User = (props) => {
  // Destructure props to extract required properties and functions
  const { user, deleteUser, editUser, saveUser, selectOne } = props;

  // Create refs for input fields to access their values
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const roleRef = useRef(null);

  return (
    <tr
      key={user.id}
      className={`${
        user.selected ? "bg-gray-200" : ""
      } border-b border-black text-left h-[10%]`}
    >
      {/* Checkbox column */}
      <td className="px-16">
        <label htmlFor={`check-${user.id}`}>
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

      {/* Name column */}
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

      {/* Email column */}
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

      {/* Role column */}
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

      {/* Action buttons column */}
      <td className="border-none">
        {/* Render either Save button or Edit button based on the edit mode */}
        {user.edit ? (
          <button
            onClick={() => saveUser(user.id, nameRef, emailRef, roleRef)}
            className="save p-2 m-2 rounded-lg text-white bg-black"
          >
            Save 💾
          </button>
        ) : (
          <button
            onClick={() => editUser(user.id)}
            className="edit p-2 m-2 rounded-lg text-white bg-black"
          >
            Edit ✏️
          </button>
        )}

        {/* Delete button */}
        <button
          onClick={() => deleteUser(user.id)}
          className="delete p-2 m-2 rounded-lg text-white bg-black"
        >
          Delete 🗑️
        </button>
      </td>
    </tr>
  );
};

// Prop types for type-checking React props
User.propTypes = {
  user: PropTypes.object,
  deleteUser: PropTypes.func,
  editUser: PropTypes.func,
  saveUser: PropTypes.func,
  selectOne: PropTypes.func,
};

// Export the User component as the default export
export default User;
