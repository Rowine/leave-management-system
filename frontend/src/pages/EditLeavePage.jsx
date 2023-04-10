import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import EditLeaveForm from '../components/forms/EditLeaveForm'
import { leaveReset } from '../features/leave/leaveSlice'

const EditLeavePage = () => {
  const dispatch = useDispatch()

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
