import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel={"< Previous"}
      nextLabel={"Next >"}
      pageCount={pageCount}
      onPageChange={onPageChange}
      containerClassName="flex justify-center items-center space-x-4 mt-10"
      pageClassName="border border-gray-300 px-3 py-1 rounded hover:bg-blue-500 cursor-pointer text-lg"
      activeClassName="bg-blue-500 text-white text-lg"
      pageLinkClassName="flex items-center justify-center w-full h-full"
      previousClassName="flex items-center justify-center cursor-pointer text-lg mx-2"
      nextClassName="flex items-center justify-center cursor-pointer text-lg mx-2"
      breakClassName="px-3 py-1 text-gray-500 cursor-pointer"
      breakLabel="..."
    />
  );
};

export default Pagination;
