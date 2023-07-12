import React from "react";
import "./App.css";
import Form from "./Form";
import Landingpage from "./Landing_Page";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GetData from "./GetData";

function App() {
  return (
      <div className="secondApp">
      <Router>
        <Routes>
      <Route path="/" element={<Landingpage />}/>
      <Route path="/form" element={<Form />}/>
      <Route path="/getdata" element={<GetData/>}/>
      </Routes>
      </Router>
      </div>
  );
}

export default App;
