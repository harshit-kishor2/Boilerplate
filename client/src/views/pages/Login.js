import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { loginSchema } from '../../helper'
import { ErrorMessage, Formik } from 'formik'
import { ErrorLabel } from 'src/components'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from 'src/redux/auth.slice'
import ReactNotification from 'react-notifications-component'

const Login = () => {
  const loginState = useSelector((state) => state.authReducer)

  const dispatch = useDispatch()
  const onFormSubmit = (values) => {
    dispatch(loginAction(values))
  }
  if (loginState.userDetails !== null) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <Formik
                    initialValues={{
                      password: '',
                      email: '',
                    }}
                    onSubmit={onFormSubmit}
                    validationSchema={loginSchema}
                  >
                    {(formik) => (
                      <CForm onSubmit={formik.handleSubmit}>
                        <h1>Admin Login</h1>
                        {loginState.loginLoadingStatus === 'error' && (
                          <CAlert color="danger">{loginState.loginError}</CAlert>
                        )}

                        <CRow className="mb-3">
                          <CCol>
                            <CInputGroup>
                              <CInputGroupText>Email</CInputGroupText>
                              <CFormControl
                                name="email"
                                type="email"
                                placeholder="Email"
                                autoComplete="email"
                                {...formik.getFieldProps('email')}
                              />
                            </CInputGroup>
                            <ErrorMessage
                              name="email"
                              render={(msg) => <ErrorLabel message={msg} />}
                            />
                          </CCol>
                        </CRow>
                        <CRow className="mb-3">
                          <CCol>
                            <CInputGroup>
                              <CInputGroupText>password</CInputGroupText>
                              <CFormControl
                                name="password"
                                type="password"
                                placeholder="Password"
                                //autoComplete="email"
                                {...formik.getFieldProps('password')}
                              />
                            </CInputGroup>
                            <ErrorMessage
                              name="password"
                              render={(msg) => <ErrorLabel message={msg} />}
                            />
                          </CCol>
                        </CRow>
                        <CRow className="mb-3">
                          <CCol xs="6">
                            <CButton type="submit" color="primary" className="px-4">
                              Login
                            </CButton>
                          </CCol>
                        </CRow>
                        <CRow className="mb-3">
                          <CCol xs="6">
                            <Link to="/login">Forgot Password ?</Link>
                          </CCol>
                        </CRow>
                      </CForm>
                    )}
                  </Formik>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <ReactNotification />
    </div>
  )
}

export default Login
