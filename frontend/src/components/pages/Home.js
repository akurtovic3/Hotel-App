import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import Navbar from '../Navbar';
import ScrollToTop from './ScrollToTop'


import {  Route, withRouter } from "react-router-dom";
class Home extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  render() {
    return (
      <>
        <Navbar />
        <HeroSection />
        <Cards />
        
        
        <Footer />
       
      </>
    );
  }
}
export default withRouter(Home);
