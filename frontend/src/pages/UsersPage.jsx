import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Button, Col, Container, Modal, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import PaginationItem from '../components/PaginationItem'
import { deleteUser, getAllUsers } from '../features/admin/adminSlice'
import dateFormat from '../utils/dateFormat'

const UsersPage = () => {
  const [show, setShow] = useState(false)
  const [id, setId] = useState('')
  const dispatch = useDispatch()
  const { users, loading } = useSelector((state) => state.admin)

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage] = useState(10)

  const indexOfLastPost = currentPage * perPage
  const indexOfFirstPost = indexOfLastPost - perPage
  const currentUsers = users.slice(indexOfFirstPost, indexOfLastPost)

  const handleClose = () => setShow(false)

  const handleDelete = (id) => {
    dispatch(deleteUser(id))
    setId('')
    setShow(false)
  }

  const handleClick = (id) => {
    setId(id)
    setShow(true)
  }

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <h1>Users</h1>
        </Col>
        <Col className="text-end">
          <Link to="/admin/users/create">
            <Button variant="primary">Create User</Button>
          </Link>
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
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>IS ADMIN</th>
                    <th>CREATED AT</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                      <td>{dateFormat(user.createdAt)}</td>
                      <td>
                        <Link to={`/admin/users/edit/${user._id}`}>
                          <Button variant="light" className="btn-sm">
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => handleClick(user._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col>
              <PaginationItem
                perPage={perPage}
                total={users.length}
                paginate={setCurrentPage}
              />
            </Col>
          </Row>
        </>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => handleDelete(id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}
export default UsersPage
