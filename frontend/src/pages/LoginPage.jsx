import { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import LoginForm from '../components/forms/LoginForm'
import { reset } from '../features/user/userSlice'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo, error } = useSelector((state) => state.user)

  useEffect(() => {
    if (userInfo) {
      navigate('/home')
      toast.success('You are logged in')
    } else {
      toast.error(error)
      dispatch(reset())
    }
  }, [userInfo, error])
  return (
    <Row className="justify-content-center">
      <Col md={6} xl={5}>
        <img
          src="https://img.freepik.com/free-vector/tiny-people-testing-quality-assurance-software-isolated-flat-vector-illustration-cartoon-character-fixing-bugs-hardware-device-application-test-it-service-concept_74855-10172.jpg?w=996&t=st=1669732899~exp=1669733499~hmac=186c2f0c08cdd2f3895a1f4d17a03b271a5e4afded9d46eb86127bf7106012ed"
          className="img-fluid"
          alt="Hero Image"
        />
      </Col>
      <Col md={6} xl={4}>
        <h1 className="text-center p-3">Sign In</h1>
        <LoginForm />
      </Col>
    </Row>
  )
}
export default LoginPage
