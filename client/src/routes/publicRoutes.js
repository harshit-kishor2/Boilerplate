import React from 'react'

const SuccessScreen = React.lazy(() => import('src/views/pages/SuccessScreen'))
const Login = React.lazy(() => import('../views/pages/Login'))
const Register = React.lazy(() => import('../views/pages/Register'))
const Page404 = React.lazy(() => import('../views/pages/Page404'))
const Page500 = React.lazy(() => import('../views/pages/Page500'))

const routes = [
  { path: '/login', exact: true, name: 'Login', component: Login },
  { path: '/register', exact: true, name: 'Register', component: Register },
  { path: '/404', name: '404', exact: true, component: Page404 },
  { path: '/500', name: '500', exact: true, component: Page500 },
  { path: '/success', name: 'SuccessScreen', exact: true, component: SuccessScreen },
  { path: '/email-varify/:token', name: 'SuccessScreen', component: SuccessScreen },
]

export default routes
