import { useFormik } from 'formik'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createCategory } from '../../features/admin/adminSlice'
import { categorySchema } from '../../utils/validationSchema'

const CreateCategoryForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const initialValues = {
    name: '',
  }

  const formik = useFormik({
    initialValues,
    validationSchema: categorySchema,
    onSubmit: (values) => {
      dispatch(createCategory(values))
      navigate('/admin/categories')
    },
  })

  return (
    <Form onSubmit={formik.handleSubmit} className="m-3">
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
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
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}
export default CreateCategoryForm
