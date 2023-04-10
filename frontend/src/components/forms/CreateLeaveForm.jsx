import { useFormik } from 'formik'
import { useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getCategories } from '../../features/category/categorySlice'
import { createLeave } from '../../features/leave/leaveSlice'
import { leaveSchema } from '../../utils/validationSchema'

const CreateLeaveForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { categories } = useSelector((state) => state.category)

  useEffect(() => {
    if (!categories.length) {
      dispatch(getCategories())
    }
  }, [categories])

  const initialValues = {
    category: '',
    reason: '',
    startDate: '',
    endDate: '',
  }

  const formik = useFormik({
    initialValues,
    validationSchema: leaveSchema,
    onSubmit: (values) => {
      dispatch(createLeave(values))
      navigate('/home')
    },
  })

  return (
    <Form onSubmit={formik.handleSubmit} className="m-3">
      <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>Category</Form.Label>
        <Form.Select
          aria-label="Default select example"
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.category && formik.errors.category}
        >
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {formik.errors.category}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicReason">
        <Form.Label>Reason</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter reason"
          name="reason"
          value={formik.values.reason}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.reason && formik.errors.reason}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.reason}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicStartDate">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          placeholder="Enter start date"
          name="startDate"
          value={formik.values.startDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.startDate && formik.errors.startDate}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.startDate}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEndDate">
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          placeholder="Enter end date"
          name="endDate"
          value={formik.values.endDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.endDate && formik.errors.endDate}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.endDate}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}
export default CreateLeaveForm
