import { getTotalPages } from "../../utilities/PagingUtility";
import PropTypes from "prop-types";

const Pagination = (props) => {
  const { usersLength, setPage, page, deleteSelected } = props;

  const totalPages = getTotalPages(usersLength);
  const changePage = (index) => {
    setPage(index);
  };

  const navigatePage = (index) => {
    if (index < 1) {
      index = 1;
    } else if (index > totalPages) {
      index = totalPages;
    }
    setPage(index);
  };

  let pages = [];
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

  return (
    <div className="grid grid-rows-1">
      <button
        className="mr-auto ml-[10%] bg-black text-white rounded-[20px] p-[6px] m-5 cursor-pointer"
        onClick={() => deleteSelected()}
      >
        Delete Selected
      </button>
      <div className="flex justify-center gap-[30px]">{pages}</div>
    </div>
  );
};

Pagination.propTypes = {
  usersLength: PropTypes.number,
  setPage: PropTypes.func,
  page: PropTypes.number,
  deleteSelected: PropTypes.func,
};

export default Pagination;
