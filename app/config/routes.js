import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {
  MainContainer,
  HomeContainer,
  AuthenticateContainer,
  FeedContainer,
  LogoutContainer,
  UserContainer,
  DuckDetailsContainer,
} from 'containers'

export default function getRoutes () {
  return (
    <Router>
      <MainContainer>
        <Switch>
          <Route exact={true} path='/' component={HomeContainer} />
          <Route path='/auth' component={AuthenticateContainer} />
          <Route path='/feed' component={FeedContainer} />
          <Route path='/logout' component={LogoutContainer} />
          <Route exact={true} path='/:uid' component={UserContainer} />
          <Route path='/duckDetail/:duckId' component={DuckDetailsContainer} />
        </Switch>
      </MainContainer>
    </Router>
  )
}
