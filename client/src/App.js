import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import { HashRouter as Router, Route, Redirect } from "react-router-dom"
import { SelectRoom, SelectCharacter } from './components'

const mapStateToProps = ({ roomId, characterId }) => {
  return { roomId, characterId }
}

const App = ({ roomId, characterId }) => {

  return (
    <Router>
      <Route path={'/'} exact
             render={() => (
               <Redirect to={'/rooms'} />
             )} />
      <Route path={'/characters'} exact component={SelectCharacter} />
      <Route path={'/rooms'} exact component={SelectRoom} />
    </Router>
  )
}

export default connect(
  mapStateToProps,
)(App)