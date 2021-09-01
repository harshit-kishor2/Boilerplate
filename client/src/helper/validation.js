import * as Yup from 'yup'
export const registerSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email required'),
  password: Yup.string().required('Password required'),
  firstName: Yup.string().required('FirstName Required'),
  lastName: Yup.string().required('LastName Required'),
  mobile: Yup.number().required('Mobile number Required'),
})

export const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email required'),
  password: Yup.string().required('Password required'),
})
