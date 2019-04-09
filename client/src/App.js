import React from 'react'
import {connect} from 'react-redux'
import { HashRouter as Router, Route, Redirect } from "react-router-dom"
import { SelectRoom, SelectCharacter, Tracker } from './components'

const mapStateToProps = (state) => ({})

const App = () => {
  return (
    <Router>
      <Route path={'/'} exact
             render={() => (
               <Redirect to={'/rooms'} />
             )} />
      <Route path={'/rooms'} exact component={SelectRoom} />
      <Route path={'/rooms/:id'} exact render={({ match }) => <SelectCharacter roomId={match.params.id}/>} />
      <Route path={'/rooms/:id/tracker'} exact render={({match}) => <Tracker roomId={match.params.id}/> }/>
    </Router>
  )
}

export default connect(
  mapStateToProps,
)(App)