import React from 'react';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Ponude from './components/pages/Ponude';
import Prijava from './components/pages/Prijava';
import Registracija from './components/pages/Registracija';
import SingleRoom from "./components/pages/SingleRoom";
import StepOne from './components/pages/StepOne'
import StepTwo from './components/pages/StepTwo'
import StepThree from './components/pages/StepThree'
import StepFour from './components/pages/StepFour'
import Radnik from './RadnikPrijava';
import RadnikMojProfil from './components/pages/RadnikMojProfil'


function App() {
  return (
    <>
      <Router>
        
        <Switch>
          <Route path='/' exact component={Home} />
         
          <Route path='/rezervacija/0' component={StepOne} />
          <Route path='/rezervacija/1' component={StepTwo} />
          <Route path='/rezervacija/2' component={StepThree} />
          <Route path='/rezervacija/3' component={StepFour} />
          
          <Route path='/ponude' exact component={Ponude} />
          <Route path='/prijava' component={Prijava} />
          <Route path='/registracija' component={Registracija} />
          <Route exact path="/rooms/:slug" component={SingleRoom} />
          
          <Route  exact path='/radnik' component={Radnik} />
          <Route   path='/radnik-profil' component={RadnikMojProfil} />
        </Switch>
      </Router>
    </>
  );
}

export default App;