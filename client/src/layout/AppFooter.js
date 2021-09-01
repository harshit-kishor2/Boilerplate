import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="/" rel="noopener noreferrer">
          MyProject
        </a>
        <span className="ml-1">&copy; 2021.</span>
      </div>
      <div className="mfs-auto"></div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
