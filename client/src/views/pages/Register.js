/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { Link, Redirect } from 'react-router-dom'
import { Formik, ErrorMessage } from 'formik'

import { registerSchema } from 'src/helper'
import { ErrorLabel } from 'src/components'
import { useDispatch, useSelector } from 'react-redux'
import { registrationAction, authActions } from 'src/redux/auth.slice'

import ReactNotification from 'react-notifications-component'
const Register = () => {
  const registerState = useSelector((state) => state.authReducer)

  const dispatch = useDispatch()
  const onFormSubmit = (values) => {
    dispatch(registrationAction(values))
  }

  useEffect(() => {
    dispatch(authActions.resetAuthState())
  }, [])

  if (registerState.userDetails !== null) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          {registerState.loadingStatus === 'loaded' ? (
            <CCol md="6">
              <div className="clearfix">
                <h2 className="float-start display-3 me-4">Success</h2>
                <h4 className="pt-3">Hey! You{"'"}re registered successfully.</h4>
                <p className="text-medium-emphasis float-start">
                  Now you can login after email varifiaction.
                  Please check your email.
                </p>
              </div>
            </CCol>
          ) : (
              <CCol md="9" lg="7" xl="6">
                <CCard className="mx-4">
                  <CCardBody className="p-4">
                    <Formik
                      initialValues={{
                        firstName: '',
                        lastName: '',
                        password: '',
                        mobile: '',
                        email: '',
                      }}
                      onSubmit={onFormSubmit}
                      validationSchema={registerSchema}
                    >
                      {(formik) => (
                        <CForm onSubmit={formik.handleSubmit}>
                          <h1>Admin Registration</h1>
                          <p className="text-muted">Register yourself...</p>
                          {registerState.loadingStatus === 'error' && (
                            <CAlert color="danger">{registerState.error}</CAlert>
                          )}
                          <CRow className="mb-3">
                            <CCol>
                              <CInputGroup>
                                <CInputGroupText>First Name</CInputGroupText>
                                <CFormControl
                                  name="firstName"
                                  type="text"
                                  placeholder="First Name"
                                  {...formik.getFieldProps('firstName')}
                                />
                              </CInputGroup>
                              <ErrorMessage
                                name="firstName"
                                render={(msg) => <ErrorLabel message={msg} />}
                              />
                            </CCol>
                          </CRow>
                          <CRow className="mb-3">
                            <CCol>
                              <CInputGroup>
                                <CInputGroupText>Last Name</CInputGroupText>
                                <CFormControl
                                  name="lastName"
                                  type="text"
                                  placeholder="Last Name"
                                  {...formik.getFieldProps('lastName')}
                                />
                              </CInputGroup>
                              <ErrorMessage
                                name="lastName"
                                render={(msg) => <ErrorLabel message={msg} />}
                              />
                            </CCol>
                          </CRow>
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
                                <CInputGroupText>Mobile</CInputGroupText>
                                <CFormControl
                                  name="mobile"
                                  type="number"
                                  placeholder="Mobile"
                                  {...formik.getFieldProps('mobile')}
                                />
                              </CInputGroup>
                              <ErrorMessage
                                name="mobile"
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
                                Registration
                            </CButton>
                            </CCol>
                          </CRow>
                          <CRow className="mb-3">
                            <CCol xs="6">
                              <Link to="/login">Already have an account ?</Link>
                            </CCol>
                          </CRow>
                        </CForm>
                      )}
                    </Formik>
                  </CCardBody>
                </CCard>
              </CCol>
            )}
        </CRow>
      </CContainer>
      <ReactNotification />
    </div>
  )
}

export default Register
