import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { NavbarComp } from './components';
import {Home, Sukses, ErrorPage} from './pages/Index';


const App = () => {
  return (  
    <Router>
    <NavbarComp />
    <main>
      <Routes>
        <Route exact path="/*" element={<Home />}  />
        <Route exact path="/sukses" element={<Sukses />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </main>
    </Router>
  
  )
}

export default App;

