// Importing the getTotalPages function from the specified utility file
import { getTotalPages } from "../../utilities/PagingUtility";

// Importing PropTypes for type-checking React props
import PropTypes from "prop-types";

// Functional component for pagination
const Pagination = (props) => {
  
  // Destructuring props for easier access
  const { usersLength, setPage, page, deleteSelected } = props;

  // Get the total number of pages based on the length of users
  const totalPages = getTotalPages(usersLength);

  // Function to handle changing the current page
  const changePage = (index) => {
    setPage(index);
  };

  // Function to handle navigating to a specific page with boundary checks
  const navigatePage = (index) => {
    // Ensure index is within valid bounds
    if (index < 1) {
      index = 1;
    } else if (index > totalPages) {
      index = totalPages;
    }
    // Set the page to the calculated index
    setPage(index);
  };

  // Array to store the pagination components
  let pages = [];

  // Add the "First Page" component
  pages.push(
    <div
      key={-3}
      className={`first-page text-white bg-black rounded-[10%] p-1 m-[10px] cursor-pointer h-auto w-auto leading-[25px] ${
        page === 1 ? "bg-gray-400 cursor-not-allowed" : ""
      }`}
      onClick={() => changePage(1)}
    >
      first-page
    </div>
  );

  // Add the "Previous Page" component
  pages.push(
    <div
      key={-2}
      className={`previous-page text-white bg-black rounded-[10%] p-1 m-[10px] cursor-pointer h-auto w-auto leading-[25px] ${
        page === 1 ? "bg-gray-400 cursor-not-allowed" : ""
      }`}
      onClick={() => navigatePage(page - 1)}
    >
      previous-page
    </div>
  );

  // Loop to generate page number components
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <div
        key={i}
        onClick={() => changePage(i)}
        className={`text-white bg-black rounded-[50%] m-[10px] cursor-pointer h-[25px] w-[25px] leading-[25px] ${
          page === i ? "bg-red-400 text-black" : ""
        }`}
      >
        {i}
      </div>
    );
  }

  // Add the "Next Page" component
  pages.push(
    <div
      key={-1}
      className={`next-page text-white bg-black rounded-[10%] p-1 m-[10px] cursor-pointer h-auto w-auto leading-[25px] ${
        page === totalPages ? "bg-gray-400 cursor-not-allowed" : ""
      }`}
      onClick={() => navigatePage(page + 1)}
    >
      next-page
    </div>
  );

  // Add the "Last Page" component
  pages.push(
    <div
      key={0}
      className={`last-page text-white bg-black rounded-[10%] p-1 m-[10px] cursor-pointer h-auto w-auto leading-[25px] ${
        page === totalPages ? "bg-gray-400 cursor-not-allowed" : ""
      }`}
      onClick={() => changePage(totalPages)}
    >
      last-page
    </div>
  );

  // Rendering the pagination component
  return (
    <div className="grid grid-rows-1">
      {/* Button to delete selected items */}
      <button
        className="mr-auto ml-[10%] bg-black text-white rounded-[20px] p-[6px] m-5 cursor-pointer"
        onClick={() => deleteSelected()}
      >
        Delete Selected
      </button>
      {/* Displaying the pagination components in a row */}
      <div className="flex justify-center gap-[30px]">{pages}</div>
    </div>
  );
};

// Prop-type validation for ensuring correct prop types
Pagination.propTypes = {
  usersLength: PropTypes.number,
  setPage: PropTypes.func,
  page: PropTypes.number,
  deleteSelected: PropTypes.func,
};

// Exporting the Pagination component as the default export
export default Pagination;
