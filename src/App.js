import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import StopSearch from './pages/StopSearch';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Route exact path='/:bus?/:tram?/:line?/:stop?' component={StopSearch} />
    </Router>
  );
}

export default App;
