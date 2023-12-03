// Importing the 'axios' library for making HTTP requests
import axios from "axios";

// Importing the 'processUsersResponse' function from the UsersUtility file
import { processUsersResponse } from "../utilities/UsersUtility";

// API URL for fetching user data
const API_URL =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

// Function to fetch users using the axios library
const getUsers = (setUsers) => {
  // Making a GET request to the specified API URL
  axios
    .get(API_URL)
    .then((res) => {
      // Processing the response data using the 'processUsersResponse' function
      setUsers(processUsersResponse(res.data));
    })
    .catch((error) => {
      // Handling errors by logging them to the console
      console.error(error);
    });
};

// Exporting the 'getUsers' function for external use
export { getUsers };
