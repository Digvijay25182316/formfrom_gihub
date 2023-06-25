import React from "react";
import "./App.css";
import MainPage from "./MainPage";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <DataProvider>
      <div className="App">
        <MainPage />
      </div>
    </DataProvider>
  );
}

export default App;
