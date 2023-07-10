import React from "react";
import "./App.css";
import Form from "./Form";
import Landingpage from "./Landing_Page";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
      <div className="secondApp">
      <Router>
        <Routes>
      <Route path="/" element={<Landingpage />}/>
      <Route path="/form" element={<Form />}/>
      </Routes>
      </Router>
      </div>
  );
}

export default App;
