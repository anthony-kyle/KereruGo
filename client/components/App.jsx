import React from 'react'
// import {HashRouter as Router, Route, Link} from 'react-router-dom'
// import {connect} from 'react-redux'

import Map from './Map'
// import Login from './Login'
// import Register from './Register'
// import Nav from './Nav'
// import { checkAuth } from '../actions/auth'

export class App extends React.Component {
  // componentDidMount() {
  //   const confirmSuccess = () => { }
  //   this.props.dispatch(checkAuth(confirmSuccess))
  // }

  render() {
    const {auth} = this.props
    return (
        <>
          <Map />
       </>
    )
  }
}

// const mapStateToProps = ({auth}) => {
//   return {
//     auth
//   }
// }

// export default connect(mapStateToProps)(App)
export default App
