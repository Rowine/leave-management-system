import { useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CreateCategoryForm from '../components/forms/CreateCategoryForm'

const CreateCategoryPage = () => {
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.user)
  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    }
  }, [userInfo, navigate])

  return (
    <Container className="my-3">
      <Row>
        <Col xs>
          <h1>Create Category</h1>
        </Col>
        <Col xs="auto">
          <Link to="/admin/categories">
            <Button variant="primary">Back</Button>
          </Link>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-3">
        <Col xs md="6" className="border rounded p-3 bg-light">
          <CreateCategoryForm />
        </Col>
      </Row>
    </Container>
  )
}
export default CreateCategoryPage
