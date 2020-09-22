import React from 'react';
import './App.css';
import './reset.css'
import ReportIndex from './components/ReportIndex'
import IncidentPage from './components/IncidentPage'
import {
  BrowserRouter as Router,
  Switch,
  Route
  //Link
} from "react-router-dom";

function App() {
  return (
   <>
    <header>
      <h1>The Stolen Bike Index</h1>
      <h3>The description of the app goes here.</h3>
    </header>
    <Router>
      <Switch>
        <Route path="/" exact component={ReportIndex}/>
        <Route path="/incidentpage/:id" component={IncidentPage}/>
      </Switch>
    </Router>
   </>
  );
}

export default App;
