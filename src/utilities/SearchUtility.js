// Function to search for a keyword in a list of users
export const searchInUsers = (search, users) => {
  // Convert search keyword to lowercase for case-insensitive comparison
  let tempSearch = search.toLowerCase();

  // Map through the users array and check if the search keyword matches user details
  return users.map((user) => {
    if (
      user.name.toLowerCase().includes(tempSearch) || // Check if the name includes the search keyword
      user.email.toLowerCase().includes(tempSearch) || // Check if the email includes the search keyword
      user.role.toLowerCase().includes(tempSearch) // Check if the role includes the search keyword
    ) {
      // If a match is found, set the 'show' property to true
      user.show = true;
      return user; // Return the user with 'show' property updated
    }

    // If no match is found, set the 'show' property to false
    user.show = false;
    return user; // Return the user with 'show' property updated
  });
};
