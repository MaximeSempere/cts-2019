import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import StopSearch from './pages/StopSearch';
import MakeLinesFile from './pages/MakeLinesFile';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path='/admin/cache' component={MakeLinesFile} />
        <Route exact path='/:bus?/:tram?/:line?/:stop?' component={StopSearch} />
      </Switch>
    </Router>
  );
}

export default App;
