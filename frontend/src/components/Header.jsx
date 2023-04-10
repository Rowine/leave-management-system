import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Container } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { categoryReset } from '../features/category/categorySlice'
import { leavesReset } from '../features/leave/leaveSlice'
import { logout } from '../features/user/userSlice'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(logout())
    dispatch(leavesReset())
    dispatch(categoryReset())

    navigate('/')
    toast.success('Logout successfully')
  }

  if (userInfo) {
    return (
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <LinkContainer to="/home">
            <Navbar.Brand>L.M.S</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/home">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/profile">
                <Nav.Link>Profile</Nav.Link>
              </LinkContainer>
            </Nav>
            <Button variant="primary" onClick={handleLogout}>
              <FontAwesomeIcon icon={faRightFromBracket} /> Logout as{' '}
              <strong>{userInfo.name}</strong>
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }

  return (
    <div className="text-center">
      <h1 className="fw-bold display-1">L.M.S</h1>
      <h2 className="fw-semibold text-muted">Leave Management System</h2>
    </div>
  )
}
export default Header
