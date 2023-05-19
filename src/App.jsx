import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Linhas from "./pages/Linhas/Linhas";
import Pinceis from "./pages/Pincéis/Pinceis";
import Panelas from "./pages/Panelas/Panelas";

import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";

function App() {
  const [hiddenS, setHiddenS] = useState(true);
  const [hiddenL, setHiddenL] = useState(true);

  const toggleHiddenS = () => {
    setHiddenS(!hiddenS);
    setHiddenL(true);
  };

  const toggleHiddenL = () => {
    setHiddenL(!hiddenL);
    setHiddenS(true);
  };

  const toggleHiddenH = () => {
    setHiddenL(true);
    setHiddenS(true);
  };

  return (
    <div className="App">
      <Navbar
        toggleHiddenS={toggleHiddenS}
        toggleHiddenL={toggleHiddenL}
        toggleHiddenH={toggleHiddenH}
      />
      {!hiddenS && (
        <Signup toggleHiddenL={toggleHiddenL} toggleHiddenH={toggleHiddenH} />
      )}
      {!hiddenL && <Login toggleHiddenH={toggleHiddenH} />}
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              hiddenS={hiddenS}
              hiddenL={hiddenL}
              toggleHiddenS={toggleHiddenS}
              toggleHiddenL={toggleHiddenL}
              toggleHiddenH={toggleHiddenH}
            />
          }
        />

        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
        <Route path="/Linhas" element={<Linhas />} />
        <Route path="/Pinceis" element={<Pinceis />} />
        <Route path="/Panelas" element={<Panelas />} />
      </Routes>
    </div>
  );
}

export default App;
