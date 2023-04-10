import * as yup from 'yup'

const userRegisterSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Names must have at least 2 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Email must be a valid email address')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
})

const userLoginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email must be a valid email address')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
})

const userUpdateSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Names must have at least 2 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Email must be a valid email address')
    .required('Email is required'),
  password: yup.string(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

const leaveSchema = yup.object().shape({
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

export { leaveSchema, userLoginSchema, userRegisterSchema, userUpdateSchema }
