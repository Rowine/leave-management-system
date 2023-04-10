import { useFormik } from 'formik'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../../features/user/userSlice'
import { userLoginSchema } from '../../utils/validationSchema'

const LoginForm = () => {
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: userLoginSchema,
    onSubmit: (values) => {
      dispatch(login({ email: values.email, password: values.password }))
      formik.resetForm()
    },
  })

  return (
    <Form onSubmit={formik.handleSubmit} className="m-3">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.email && formik.errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.password && formik.errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Login
      </Button>
      <p className="small fw-bold mt-2 pt-1 mb-0">
        Don't have an account?{' '}
        <Link to="/register" className="link-danger">
          Register
        </Link>
      </p>
    </Form>
  )
}
export default LoginForm
