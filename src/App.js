import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import StopSearch from './pages/StopSearch';

function App() {
  let path = '';
  if (window.location.hostname === 'localhost') {
    path = '/:bus?/:tram?/:line?/:stop?';
  } else {
    path = '/cts-2019/:bus?/:tram?/:line?/:stop?';
  }

  return (
    <Router>
      <Route exact path={path} component={StopSearch} />
    </Router>
  );
}

export default App;
