/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import './scss/style.scss'
import publicRoutes from './routes/publicRoutes'
import { getCsrfToken, getUserDataFromLocalStorage } from './redux/auth.slice'
import { connect } from 'react-redux'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
class App extends Component {
  constructor(props) {
    super(props)
    this.props.getUserDataFromLocalStorage()
    this.props.getCsrfToken()
  }

  render() {
    return (
      <>
        <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              {publicRoutes.map((route, idx) => {
                return (
                  route.component && (
                    <Route
                      key={idx}
                      path={route.path}
                      render={(props) => <route.component {...props} />}
                    />
                  )
                )
              })}
              <Route
                path="/"
                render={(props) => {
                  const isAuthenticated = this.props.authReducer.userDetails !== null
                  return isAuthenticated ? <DefaultLayout {...props} /> : <Redirect to="/login" />
                }}
              />
            </Switch>
          </React.Suspense>
        </HashRouter>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCsrfToken: () => dispatch(getCsrfToken()),
    getUserDataFromLocalStorage: () => dispatch(getUserDataFromLocalStorage()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
