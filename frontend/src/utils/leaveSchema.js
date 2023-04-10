import * as yup from 'yup'

const schema = yup.object().shape({
  category: yup.string().required('Category is required'),
  reason: yup.string().required('Reason is required'),
  startDate: yup
    .date()
    .required('Start date is required')
    .min(new Date(), 'Start date must be in the future'),
  endDate: yup
    .date()
    .required('End date is required')
    .min(yup.ref('startDate'), 'End date must be after start date'),
})

export default schema
