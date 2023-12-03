// Function to process the response of users
export const processUsersResponse = (users) => {
  // Map through each user in the array
  return users.map((user) => {
    // Set initial values for additional properties
    user.selected = false; // Property to track user selection status
    user.edit = false; // Property to track whether user is in edit mode
    user.show = true; // Property to determine whether to display the user

    // Return the modified user object
    return user;
  });
};
