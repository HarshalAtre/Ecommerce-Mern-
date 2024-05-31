import logo from './logo.svg';
import Header from './components/layout/Header/Header.jsx';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import WebFont from "webfontloader"
import { useEffect } from 'react';
import Footer from './components/layout/Footer/Footer.jsx';
import Home from './components/layout/Home/Home.js';
import "./App.css"
function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });
  })
  return (
    <>
     <Router>
      <Header/>
      
      <Routes>
        <Route exact path="/" element={<Home/>}/>
      </Routes>
    <Footer/>
    
    </Router>
    </>
  );
}

export default App;
