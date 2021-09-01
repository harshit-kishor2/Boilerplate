import React from 'react'
import ReactNotification from 'react-notifications-component'
import { AppContent, AppSidebar, AppHeader, AppFooter } from './index'

const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
      <ReactNotification />
    </div>
  )
}

export default DefaultLayout
