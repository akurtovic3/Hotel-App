import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Rezervacija from './components/pages/Rezervacija';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';
import SingleRoom from "./components/pages/SingleRoom";
import StepOne from './components/pages/StepOne'
import StepTwo from './components/pages/StepTwo'
import StepThree from './components/pages/StepThree'
import StepFour from './components/pages/StepFour'


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/rezervacija' component={Rezervacija} />
          <Route path='/rezervacija/0' component={StepOne} />
          <Route path='/rezervacija/1' component={StepTwo} />
          <Route path='/rezervacija/2' component={StepThree} />
          <Route path='/rezervacija/3' component={StepFour} />
          
          <Route path='/products' component={Products} />
          <Route path='/sign-up' component={SignUp} />
          <Route exact path="/rooms/:slug" component={SingleRoom} />
          
        </Switch>
      </Router>
    </>
  );
}

export default App;