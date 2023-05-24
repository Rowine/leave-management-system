import { useFormik } from 'formik'
import { useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import RegisterForm from '../components/forms/RegisterForm'
import { createUser } from '../features/admin/adminSlice'
import { userRegisterSchema } from '../utils/validationSchema'

const AdminCreatePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.user)

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    } else if (!userInfo.isAdmin) {
      navigate('/home')
    }
  }, [userInfo, navigate])

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      isAdmin: false,
    },
    validationSchema: userRegisterSchema,
    onSubmit: (values) => {
      dispatch(createUser(values))
      navigate('/admin/users')
      toast.success('User created successfully')
    },
  })

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <h1>Create User</h1>
        </Col>
        <Col className="text-end">
          <Link to="/admin/users">
            <Button variant="primary">Go Back</Button>
          </Link>
        </Col>
      </Row>
      <Row className="my-3">
        <Col md={6} className="mx-auto">
          <RegisterForm formik={formik} />
        </Col>
      </Row>
    </Container>
  )
}
export default AdminCreatePage
