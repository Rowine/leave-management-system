import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CreateLeaveForm from '../components/forms/CreateLeaveForm'
const CreateLeavePage = () => {
  return (
    <Container className="my-3">
      <Row>
        <Col xs>
          <h1>Create Leave Application</h1>
        </Col>
        <Col xs="auto">
          <Link to="/home">
            <Button variant="primary">Back</Button>
          </Link>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-3">
        <Col xs md="6" className="border rounded p-3 bg-light">
          <CreateLeaveForm />
        </Col>
      </Row>
    </Container>
  )
}
export default CreateLeavePage
