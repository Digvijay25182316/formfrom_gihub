import React from "react";
import "./App.css";
import { DataProvider } from "./context/DataContext";
import MainPage from "./MainPage";

function App() {
  return (
    <DataProvider>
      <div className="App">
        <MainPage />
        <div>
          <p>coded by digvijay</p>
        </div>
      </div>
    </DataProvider>
  );
}

export default App;
