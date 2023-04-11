import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import AdminCard from '../components/AdminCard'
import {
  getAllCategories,
  getAllLeaves,
  getAllUsers,
} from '../features/admin/adminSlice'
import dateFormat from '../utils/dateFormat'

const AdminHomePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.user)
  const { users, leaves, categories } = useSelector((state) => state.admin)

  const getCategoryName = (id) => {
    const category = categories.find((category) => category._id === id)
    return category?.name
  }

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    } else if (!userInfo.isAdmin) {
      navigate('/home')
    } else {
      dispatch(getAllUsers())
      dispatch(getAllLeaves())
      dispatch(getAllCategories())
    }
  }, [userInfo, navigate])

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <h1>Admin Dashboard</h1>
        </Col>
      </Row>
      <Row className="my-3">
        <Col md={4} className="mb-3">
          <AdminCard
            title="Users"
            count={users.length}
            link="/admin/users"
            background="primary"
          />
        </Col>
        <Col md={4} className="mb-3">
          <AdminCard
            title="Leaves"
            count={leaves.length}
            link="/admin/leaves"
            background="success"
          />
        </Col>
        <Col md={4} className="mb-3">
          <AdminCard
            title="Categories"
            count={categories.length}
            link="/admin/categories"
            background="warning"
          />
        </Col>
      </Row>

      <Row className="my-3">
        <Col md={6}>
          <Row>
            <Col>
              <h1>Users</h1>
            </Col>
            <Col className="d-flex justify-content-end">
              <Button
                as={Link}
                to="/admin/users"
                variant="primary"
                className="m-3"
              >
                View More
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th className="text-center">Admin</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(
                    (user, index) =>
                      index < 5 && (
                        <tr key={user._id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td className="text-center">
                            {user.isAdmin ? (
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="text-success"
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faTimes}
                                className="text-danger"
                              />
                            )}
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </Col>
          </Row>
        </Col>

        <Col md={6}>
          <Row>
            <Col>
              <h1>Categories</h1>
            </Col>
            <Col className="d-flex justify-content-end">
              <Button
                as={Link}
                to="/admin/categories"
                variant="primary"
                className="m-3"
              >
                View More
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <ListGroup>
                {categories.map(
                  (category, index) =>
                    index < 5 && (
                      <ListGroup.Item key={category._id}>
                        <Row>
                          <Col md={3}>
                            <strong>{category.name}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )
                )}
              </ListGroup>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="my-3">
        <Col>
          <h1>Leaves</h1>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
            as={Link}
            to="/admin/leaves"
            variant="primary"
            className="m-3"
          >
            View More
          </Button>
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Category</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Approved</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map(
                (leave, index) =>
                  index < 5 && (
                    <tr key={leave._id}>
                      <td>
                        {getCategoryName(leave.category)
                          ? getCategoryName(leave.category)
                          : 'Category Deleted'}
                      </td>
                      <td>{dateFormat(leave.startDate, 'MMM DD, YYYY')}</td>
                      <td>{dateFormat(leave.endDate, 'MMM DD, YYYY')}</td>

                      <td>{leave.isApproved ? 'Yes' : 'No'}</td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  )
}
export default AdminHomePage
