import { faCheck, faFilter, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import {
  Badge,
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Row,
  Table,
} from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import PaginationItem from '../components/Pagination'
import {
  approveLeave,
  getAllLeaves,
  getLeavesByStatus,
  rejectLeave,
} from '../features/admin/adminSlice'
import dateFormat from '../utils/dateFormat'

const AdminLeavesPage = () => {
  const dispatch = useDispatch()
  const { leaves, loading } = useSelector((state) => state.admin)

  // Get 10 leaves per page
  const [currentPage, setCurrentPage] = useState(1)
  const [leavesPerPage] = useState(10)

  // Get current leaves
  const indexOfLastLeave = currentPage * leavesPerPage
  const indexOfFirstLeave = indexOfLastLeave - leavesPerPage
  const currentLeaves = leaves.slice(indexOfFirstLeave, indexOfLastLeave)

  useEffect(() => {
    dispatch(getAllLeaves())
  }, [dispatch])

  const handleApprove = (leave) => {
    dispatch(approveLeave(leave))
  }

  const handleReject = (leave) => {
    dispatch(rejectLeave(leave))
  }

  const filterAll = () => {
    dispatch(getAllLeaves())
  }

  const filterPending = () => {
    dispatch(getLeavesByStatus('pending'))
  }

  const filterApproved = () => {
    dispatch(getLeavesByStatus('approved'))
  }

  const filterRejected = () => {
    dispatch(getLeavesByStatus('rejected'))
  }

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <h1>Leaves</h1>
        </Col>
        <Col>
          <DropdownButton
            id="dropdown-basic-button"
            title={<FontAwesomeIcon icon={faFilter} className="me-2" />}
            className="float-end"
          >
            <Dropdown.Item onClick={filterAll}>All</Dropdown.Item>
            <Dropdown.Item onClick={filterPending}>Pending</Dropdown.Item>
            <Dropdown.Item onClick={filterApproved}>Approved</Dropdown.Item>
            <Dropdown.Item onClick={filterRejected}>Rejected</Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
      {loading === 'pending' ? (
        <Loader />
      ) : (
        <>
          <Row className="my-3">
            <Col>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>USER</th>
                    <th>CATEGORY</th>
                    <th>REASON</th>
                    <th>START DATE</th>
                    <th>END DATE</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {currentLeaves.map((leave) => (
                    <tr key={leave._id}>
                      <td>{leave.user.name}</td>
                      <td>{leave.category.name}</td>
                      <td>{leave.reason}</td>
                      <td>{dateFormat(leave.startDate)}</td>
                      <td>{dateFormat(leave.endDate)}</td>
                      <td>
                        {leave.status === 'approved' ? (
                          <Badge bg="success">Approved</Badge>
                        ) : leave.status === 'rejected' ? (
                          <Badge bg="danger">Rejected</Badge>
                        ) : (
                          <Badge bg="warning">Pending</Badge>
                        )}
                      </td>
                      <td>
                        {leave.status === 'pending' ? (
                          <>
                            <Button
                              variant="primary"
                              className="mx-1"
                              onClick={() => handleApprove(leave)}
                            >
                              <FontAwesomeIcon icon={faCheck} />
                            </Button>
                            <Button
                              variant="danger"
                              className="mx-1"
                              onClick={() => handleReject(leave)}
                            >
                              <FontAwesomeIcon icon={faXmark} />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              variant="secondary"
                              className="mx-1"
                              disabled
                            >
                              <FontAwesomeIcon icon={faCheck} />
                            </Button>
                            <Button
                              variant="secondary"
                              className="mx-1"
                              disabled
                            >
                              <FontAwesomeIcon icon={faXmark} />
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>

          <PaginationItem
            perPage={leavesPerPage}
            total={leaves.length}
            paginate={setCurrentPage}
          />
        </>
      )}
    </Container>
  )
}
export default AdminLeavesPage
