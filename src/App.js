import "./App.css";
import Aprompt from "./Aprompt";
import Anotherprompt from "./Anotherprompt";
import { DataProvider } from "./context/DataContext.js";

function App() {
  return (
    <DataProvider>
      <div className="App">
        <Aprompt />
        <Anotherprompt />
      </div>
    </DataProvider>
  );
}

export default App;
