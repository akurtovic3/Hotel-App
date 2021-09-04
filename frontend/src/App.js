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
import RadnikPregledRez from './RadnikPregledRez'
import RadnikPregledSpecPon from './components/pages/RadnikPregledSpecPon'
import RadnikDodajRez from './components/pages/RadnikDodajRez'
import RadnikDodajPonudu from './components/pages/RadnikDodajPonudu'
import RadnikEditProfil from './components/pages/RadnikEditProfil'
import RadnikAzurirajRez from './components/pages/RadnikAzurirajRez'
import RadnikRezInfo from './components/pages/RadnikRezInfo'
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
          <Route   path='/radnik/pregled-rezervacija' component={RadnikPregledRez} />
          <Route   path='/radnik/pregled-spec-pon' component={RadnikPregledSpecPon} />
          <Route path='/radnik/dodaj-rezervaciju' component={RadnikDodajRez} />
          <Route path='/radnik/dodaj-spec-pon' component={RadnikDodajPonudu} />
          <Route path='/radnik/edit-profil' component={RadnikEditProfil} />
          <Route path='/radnik/azuriraj-rezervaciju' component={RadnikAzurirajRez}/>
          <Route path='/radnik/info-rezervacija' component={RadnikRezInfo}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;