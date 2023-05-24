import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { categoryReset } from '../../features/category/categorySlice'
import { leaveReset } from '../../features/leave/leaveSlice'
import { deleteUser, logout } from '../../features/user/userSlice'

const RegisterForm = ({ formik, update = false }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.user)

  const handleDelete = () => {
    dispatch(deleteUser(userInfo._id))
    dispatch(logout())
    dispatch(leaveReset())
    dispatch(categoryReset())
    navigate('/')
    toast.warning('Account deleted')
  }

  return (
    <Form onSubmit={formik.handleSubmit} className="m-3">
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.name && formik.errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.name}
        </Form.Control.Feedback>
      </Form.Group>

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

      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.confirmPassword}
        </Form.Control.Feedback>
      </Form.Group>

      {userInfo && userInfo.isAdmin && (
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Admin"
            name="isAdmin"
            checked={formik.values.isAdmin}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Group>
      )}

      {update ? (
        <Button variant="primary" type="submit" className="me-2">
          Update
        </Button>
      ) : (
        <Button variant="primary" type="submit" className="me-2">
          Register
        </Button>
      )}

      {!userInfo && (
        <p className="small fw-bold mt-2 pt-1 mb-0">
          Already have an account?{' '}
          <Link to="/" className="link-danger">
            Login
          </Link>
        </p>
      )}
    </Form>
  )
}

export default RegisterForm
