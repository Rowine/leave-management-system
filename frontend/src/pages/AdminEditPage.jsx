import { useFormik } from 'formik'
import { useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import RegisterForm from '../components/forms/RegisterForm'
import { getUser, resetUser, updateUser } from '../features/admin/adminSlice'

const AdminEditPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()

  const { userInfo } = useSelector((state) => state.user)
  const { user } = useSelector((state) => state.admin)

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      isAdmin: false,
    },
    onSubmit: (values) => {
      dispatch(updateUser({ _id: id, ...values }))
      toast.success('User updated')
      navigate('/admin/users')
    },
  })

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    } else if (!userInfo.isAdmin) {
      navigate('/home')
    }

    if (user.name) {
      formik.setFieldValue('name', user.name)
      formik.setFieldValue('email', user.email)
      formik.setFieldValue('isAdmin', user.isAdmin)
    } else {
      dispatch(getUser(id))
    }
  }, [dispatch, id, navigate, user, userInfo])

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <h1>Edit User</h1>
        </Col>
        <Col className="text-end">
          <Link to="/admin/users" onClick={() => dispatch(resetUser())}>
            <Button variant="primary">Go Back</Button>
          </Link>
        </Col>
      </Row>

      <Row className="my-3">
        <Col md={6} className="mx-auto">
          <RegisterForm formik={formik} update />
        </Col>
      </Row>
    </Container>
  )
}
export default AdminEditPage
