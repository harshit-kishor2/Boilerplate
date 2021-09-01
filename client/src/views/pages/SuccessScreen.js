/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react'
import {
    CButton,
    CCol,
    CContainer,
    CRow,
} from '@coreui/react'

import ReactNotification from 'react-notifications-component'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { varifyEmailAction } from 'src/redux/auth.slice'

const SuccessScreen = (props) => {
    //  const test = false
    const verifyState = useSelector((state) => state.authReducer)
    const { token } = useParams();
    const dispatch = useDispatch()

    const handleVarify = () => {
        dispatch(varifyEmailAction({ token }))
    }
    return (
        <>
            <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md="6">
                            {
                                verifyState.varifyEmailLoadingStatus === 'loaded' ?
                                    (<div className="clearfix">
                                        <h2 className="float-start display-3 me-4">Success</h2>
                                        <h4 className="pt-3">Hey! You{"'"}re varified successfully.</h4>
                                        <p className="text-medium-emphasis float-start">
                                            Now you can <Link to='/login'>login</Link> with your email and password.
                                            </p>
                                    </div>)
                                    :
                                    (
                                        <div className="clearfix">
                                            <h2 className="float-start display-3 me-4">Alert !</h2>
                                            <h4 className="pt-3">Hey! You{"'"}re not varified. </h4>
                                            <p className="text-medium-emphasis float-start">
                                                Click here to varify.
                                                <CButton
                                                    type="submit"
                                                    onClick={handleVarify}
                                                >
                                                    Varify Email
                                                </CButton>
                                            </p>
                                        </div>
                                    )
                            }
                        </CCol>
                    </CRow>
                </CContainer>
                <ReactNotification />
            </div>
        </>
    )
}

export default SuccessScreen
