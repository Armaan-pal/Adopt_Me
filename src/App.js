import "./App.css";
import Detail from "./Detail";
import { Route, Routes} from "react-router-dom"
import Search from "./search";
import ThemeContext from "./ThemeContext";
import { useState } from "react";
// import Monday from "./Rucha";


function App() {
  const theme = useState("darkblue");
  return (
    <ThemeContext.Provider value={theme}>
    <>
    
      <Routes>
      <Route  path="/details/:id"
      element={<Detail name="armaan" />} />

      <Route exact path="/"
      element={<Search />} />
      </Routes>

    </>
    </ThemeContext.Provider>
  );
 
}

export default App;


