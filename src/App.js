import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import StopSearch from './pages/StopSearch';
import MakeLinesFile from './pages/MakeLinesFile';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/admin/lines' component={MakeLinesFile} />
        <Route exact path='/:bus?/:tram?/:line?/:stop?' component={StopSearch} />
      </Switch>
    </Router>
  );
}

export default App;
