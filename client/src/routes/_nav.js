import React from 'react'
import CIcon from '@coreui/icons-react'
import { NavLink } from 'react-router-dom'

const _nav = [
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    _component: 'CNavGroup',
    anchor: 'Users',
    to: '/to',
    icon: <CIcon name="cil-address-book" customClassName="nav-icon" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Customer',
        to: '/users/customer',
        icon: <CIcon name="cil-user" customClassName="nav-icon" />,
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Merchant',
        to: '/users/merchant',
        icon: <CIcon name="cil-user" customClassName="nav-icon" />,
      },
    ],
  },
  /*   //USer group
    {
      _component: 'CNavTitle',
      anchor: 'Users',
    },
    {
      _component: 'CNavItem',
      as: NavLink,
      anchor: 'Customer',
      to: '/customer',
      icon: <CIcon name="cil-user" customClassName="nav-icon" />,
    },
    {
      _component: 'CNavItem',
      as: NavLink,
      anchor: 'Merchant',
      to: '/merchant',
      icon: <CIcon name="cil-user" customClassName="nav-icon" />,
    }, */

  //For testing purpose
  /* {
    _component: 'CNavGroup',
    anchor: 'Notifications',
    icon: <CIcon name="cil-bell" customClassName="nav-icon" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Alerts',
        to: '/notifications/alerts',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Badges',
        to: '/notifications/badges',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Modal',
        to: '/notifications/modals',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Toasts',
        to: '/notifications/toasts',
      },
    ],
  }, */

  //Pages Auth related

  /*   
  {
      _component: 'CNavItem',
      as: NavLink,
      anchor: 'Widgets',
      to: '/widgets',
      icon: <CIcon name="cil-calculator" customClassName="nav-icon" />,
      badge: {
        color: 'info',
        text: 'NEW',
      },
    }, */

  /*  {
     _component: 'CNavGroup',
     anchor: 'Pages',
     icon: <CIcon name="cil-star" customClassName="nav-icon" />,
     items: [
       {
         _component: 'CNavItem',
         as: NavLink,
         anchor: 'Login',
         to: '/login',
       },
       {
         _component: 'CNavItem',
         as: NavLink,
         anchor: 'Register',
         to: '/register',
       },
       {
         _component: 'CNavItem',
         as: NavLink,
         anchor: 'Error 404',
         to: '/404',
       },
       {
         _component: 'CNavItem',
         as: NavLink,
         anchor: 'Error 500',
         to: '/500',
       },
     ],
   }, */
]

export default _nav
