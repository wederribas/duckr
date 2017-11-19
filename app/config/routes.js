import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { MainContainer, HomeContainer } from 'containers'

const routes = (
  <MainContainer>
    <Router>
      <Switch>
        <Route exact path='/' component={HomeContainer} />
      </Switch>
    </Router>
  </MainContainer>
)

export default routes
