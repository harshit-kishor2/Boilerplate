import React from 'react'

// const Login = React.lazy(() => import('./views/examples/pages/login/Login'))
// const Register = React.lazy(() => import('./views/examples/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/examples/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/examples/pages/page500/Page500'))

const Dashboard = React.lazy(() => import('../views/dashboard/Dashboard'))
const Customer = React.lazy(() => import('../views/customer/Customer'))
const Merchant = React.lazy(() => import('../views/merchant/Merchant'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', name: 'Users', component: Customer, exact: true },
  { path: '/users/customer', name: 'Customer', component: Customer },
  { path: '/users/merchant', name: 'Merchant', component: Merchant },
  // { path: '/login', name: 'Login', component: Login },
  // { path: '/register', name: 'Register', component: Register },
  // { path: '/404', name: '404', component: Page404 },
  // { path: '/500', name: '500', component: Page500 },
]

export default routes
