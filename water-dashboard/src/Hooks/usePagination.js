import { useState } from 'react';

function usePagination(totalLength) {
  
  const itemsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(totalLength / itemsPerPage);

  const handlePageChange = (selected) => {
    setCurrentPage(selected);
  };

  return {
    currentPage,
    pageCount,
    handlePageChange,
    setCurrentPage
  };
}

export default usePagination;
