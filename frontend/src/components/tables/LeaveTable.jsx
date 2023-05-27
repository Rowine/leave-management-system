import { useState } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import dateFormat from '../../utils/dateFormat'
import LeaveStatus from '../LeaveStatus'
import PaginationItem from '../PaginationItem'
import TableAction from './TableAction'

const LeaveTable = ({ leaves }) => {
  const { categories } = useSelector((state) => state.category)
  const [currentPage, setCurrentPage] = useState(1)
  const [leavesPerPage] = useState(10)

  // Get current leaves
  const indexOfLastLeave = currentPage * leavesPerPage
  const indexOfFirstLeave = indexOfLastLeave - leavesPerPage
  const currentLeaves = leaves.slice(indexOfFirstLeave, indexOfLastLeave)

  const getCategoryName = (id) => {
    const category = categories.find((category) => category._id === id)
    return category?.name
  }

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Category</th>
            <th>Reason</th>
            <th>Leave Start</th>
            <th>Leave End</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentLeaves.map((leave) => (
            <tr key={leave._id}>
              <td>
                <p className="fw-bold mb-1 text-muted">
                  {getCategoryName(leave.category)
                    ? getCategoryName(leave.category)
                    : 'No category'}
                </p>
              </td>
              <td>
                <p className="fw-normal mb-1">{leave.reason}</p>
              </td>
              <td>
                <p className="fw-normal mb-1">
                  {dateFormat(leave.startDate, 'MMM DD, YYYY')}
                </p>
              </td>
              <td>
                <p className="fw-normal mb-1">
                  {dateFormat(leave.endDate, 'MMM DD, YYYY')}
                </p>
              </td>
              <td>
                <LeaveStatus status={leave.status} />
              </td>
              <td>
                <TableAction
                  id={leave._id}
                  disable={leave.status !== 'pending'}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <PaginationItem
        perPage={leavesPerPage}
        total={leaves.length}
        paginate={setCurrentPage}
      />
    </>
  )
}
export default LeaveTable
