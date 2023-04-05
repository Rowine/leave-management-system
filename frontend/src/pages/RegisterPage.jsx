import { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import RegisterForm from '../components/forms/RegisterForm'

const RegisterPage = () => {
  const navigate = useNavigate()
  const { userInfo, error } = useSelector((state) => state.user)

  useEffect(() => {
    if (userInfo) {
      navigate('/home')
      toast.success('Registration successful')
    } else {
      toast.error(error)
    }
  }, [userInfo, error])

  return (
    <Row className="justify-content-center">
      <Col md={6} xl={5}>
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid"
          alt="Sample image"
        />
      </Col>
      <Col md={6} xl={4}>
        <h1 className="text-center p-3">Sign Up</h1>
        <RegisterForm />
      </Col>
    </Row>
  )
}
export default RegisterPage
