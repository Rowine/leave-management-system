import { Pagination } from 'react-bootstrap'

const PaginationItem = ({ perPage, total, paginate }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <Pagination className="justify-content-center">
      {pageNumbers.map((number) => (
        <Pagination.Item key={number} onClick={() => paginate(number)}>
          {number}
        </Pagination.Item>
      ))}
    </Pagination>
  )
}
export default PaginationItem
