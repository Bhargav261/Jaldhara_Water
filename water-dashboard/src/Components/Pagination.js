import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import usePagination from '../Hooks/usePagination';

const Pagination = ({ totalLength, getCurrentPage, searchValue }) => {

    const {
        currentPage,
        pageCount,
        handlePageChange,
    } = usePagination(totalLength);

    useEffect(() => {
        getCurrentPage(searchValue, currentPage);
    }, [currentPage, searchValue])

    useEffect(() => {
        handlePageChange(0);
    }, [searchValue])
    return (
        <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={({ selected }) => handlePageChange(selected)}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
            forcePage={currentPage}
        />
    )
}
export default Pagination;