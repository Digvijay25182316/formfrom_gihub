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
          <p
            style={{
              textAlign: "center",
              fontFamily: "Share Tech Mono, sans",
              marginTop: "15px",
              fontSize: "14px",
              color: "#a50d0d",
            }}
          >
            Designed And Coded By
          </p>
          <p
            style={{
              textAlign: "center",
              color: "#00264d",
              fontSize: "16px",
              lineHeight: "26px",
            }}
          >
            Digvijay Edake
          </p>
        </div>
      </div>
    </DataProvider>
  );
}

export default App;
