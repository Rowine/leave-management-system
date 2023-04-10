import { useFormik } from 'formik'
import { useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getLeaveById, updateLeave } from '../../features/leave/leaveSlice'
import dateFormat from '../../utils/dateFormat'
import { leaveSchema } from '../../utils/validationSchema'
import Loader from '../Loader'

const EditLeaveForm = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { categories } = useSelector((state) => state.category)
  const { leave, loading } = useSelector((state) => state.leave)

  useEffect(() => {
    if (!leave._id) {
      dispatch(getLeaveById(id))
    } else {
      formik.setValues({
        category: leave.category,
        reason: leave.reason,
        startDate: dateFormat(leave.startDate),
        endDate: dateFormat(leave.endDate),
      })
    }
  }, [leave])

  const formik = useFormik({
    initialValues: {
      category: '',
      reason: '',
      startDate: '',
      endDate: '',
    },
    validationSchema: leaveSchema,
    onSubmit: (values) => {
      dispatch(updateLeave({ _id: leave._id, ...values }))
      navigate('/home')
      toast.info('Updated successfully')
    },
  })
  return (
    <>
      {loading === 'pending' ? (
        <Loader />
      ) : (
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
      )}
    </>
  )
}
export default EditLeaveForm
