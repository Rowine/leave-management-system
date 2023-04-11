import { useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import EditLeaveForm from '../components/forms/EditLeaveForm'
import { leaveReset } from '../features/leave/leaveSlice'

const EditLeavePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.user)

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    }
  }, [userInfo, navigate])

  const handleLeave = () => {
    dispatch(leaveReset())
  }

  return (
    <Container className="my-3">
      <Row>
        <Col xs>
          <h1>Edit Leave Application</h1>
        </Col>
        <Col xs="auto">
          <Link to="/home" onClick={handleLeave}>
            <Button variant="primary">Back</Button>
          </Link>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-3">
        <Col xs md="6" className="border rounded p-3 bg-light">
          <EditLeaveForm />
        </Col>
      </Row>
    </Container>
  )
}
export default EditLeavePage
