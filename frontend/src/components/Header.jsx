import { Button } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { toast } from 'react-toastify'
import { logout } from '../features/user/userSlice'

const Header = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
    toast.success('Logout successfully')
  }

  if (userInfo) {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">L.M.S</Navbar.Brand>
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
            Logout as <strong>{userInfo.name}</strong>
          </Button>
        </Navbar.Collapse>
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
