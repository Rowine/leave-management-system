import { useFormik } from 'formik'

import { useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import RegisterForm from '../components/forms/RegisterForm'
import { updateUserProfile } from '../features/user/userSlice'
import { userUpdateSchema } from '../utils/validationSchema'

const EditProfilePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.user)

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    }
  }, [navigate])

  const formik = useFormik({
    initialValues: {
      name: userInfo?.name,
      email: userInfo?.email,
      password: '',
      confirmPassword: '',
    },
    validationSchema: userUpdateSchema,
    onSubmit: (values) => {
      dispatch(updateUserProfile(values))
      toast.success('Profile updated')
      navigate('/home')
    },
  })

  return (
    <Container className="my-3">
      <Row>
        <Col xs>
          <h1>Edit Profile</h1>
        </Col>
        <Col xs="auto">
          <Link to="/home">
            <Button variant="primary">Back</Button>
          </Link>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-3">
        <Col xs md="6" className="border rounded p-3 bg-light">
          <RegisterForm formik={formik} update />
        </Col>
      </Row>
    </Container>
  )
}
export default EditProfilePage
