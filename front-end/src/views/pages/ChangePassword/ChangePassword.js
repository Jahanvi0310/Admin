import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CLabel,
  CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Product = () => {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm className="text-center">
                
                <CLabel>ENTER CURRENT PASSWORD</CLabel>
                  <CInputGroup className="mb-3">  
                      <br/>                 
                    <CInput type="text" placeholder="Enter Current Password" autoComplete="username" />
                  </CInputGroup>
                  <CLabel>ENTER NEW PASSWORD</CLabel>
                  <CInputGroup className="mb-3">  
                      <br/>                 
                    <CInput type="text" placeholder="Enter New Password" autoComplete="username" />
                  </CInputGroup>
                  <CLabel>CONFIRM NEW PASSWORD</CLabel>
                  <CInputGroup className="mb-3">  
                      <br/>                 
                    <CInput type="text" placeholder="Confirm New Password" autoComplete="username" />
                  </CInputGroup>
                  
                  <CButton color="success" block>CHANGE PASSWORD</CButton>
                </CForm>
              </CCardBody>
              
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Product
