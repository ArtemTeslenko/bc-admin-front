import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { PiDogLight } from "react-icons/pi";
import {
  PaginationContainer,
  PaginationButtonsContainer,
  PaginationButton,
  PaginationCurrentPage,
  PaginationTotalContainer,
  PaginationTotalText,
} from "@/assets/components/Pagination";

export const Pagination = ({ list, page, handleChangePage }) => {
  const { totalItems, itemsPerPage, totalPages } = list;

  function decreasePage() {
    if (page < 2) {
      return;
    }
    handleChangePage((previousValue) => previousValue - 1);
  }

  function increasePage() {
    if (page + 1 > totalPages) {
      return;
    }
    handleChangePage((previousValue) => previousValue + 1);
  }

  return (
    <>
      <PaginationContainer>
        {totalPages > 1 ? (
          <PaginationButtonsContainer>
            <PaginationButton
              type="button"
              onClick={() => handleChangePage(1)}
              disabled={page < 2}
            >
              first page
            </PaginationButton>

            <PaginationButton
              type="button"
              onClick={decreasePage}
              disabled={page < 2}
            >
              <FaArrowLeft />
            </PaginationButton>

            {page === totalPages && totalPages > 2 && (
              <PaginationButton
                type="button"
                onClick={() => totalPages > 2 && handleChangePage(page - 2)}
              >
                {page - 2}
              </PaginationButton>
            )}

            {page - 1 > 0 && (
              <PaginationButton
                type="button"
                onClick={() => handleChangePage(page - 1)}
              >
                {page - 1}
              </PaginationButton>
            )}

            <PaginationCurrentPage>{page}</PaginationCurrentPage>

            {page + 1 <= totalPages && (
              <PaginationButton
                type="button"
                onClick={() => handleChangePage(page + 1)}
              >
                {page + 1}
              </PaginationButton>
            )}

            {page === 1 && totalPages > 2 && (
              <PaginationButton
                type="button"
                onClick={() => totalPages > 2 && handleChangePage(page + 2)}
              >
                {page + 2}
              </PaginationButton>
            )}

            <PaginationButton
              type="button"
              onClick={increasePage}
              disabled={page === totalPages}
            >
              <FaArrowRight />
            </PaginationButton>

            <PaginationButton
              type="button"
              onClick={() => handleChangePage(totalPages)}
              disabled={page === totalPages}
            >
              last page
            </PaginationButton>
          </PaginationButtonsContainer>
        ) : (
          <PiDogLight />
        )}

        <PaginationTotalContainer>
          <PaginationTotalText>
            Items per page: <b>{itemsPerPage + ""}</b>
          </PaginationTotalText>

          <PaginationTotalText>
            Total items: <b>{totalItems + ""}</b>
          </PaginationTotalText>

          <PaginationTotalText>
            Total pages: <b>{totalPages + ""}</b>
          </PaginationTotalText>
        </PaginationTotalContainer>
      </PaginationContainer>
    </>
  );
};
