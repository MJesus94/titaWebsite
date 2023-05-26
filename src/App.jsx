import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Linhas from "./pages/Linhas/Linhas";
import Pinceis from "./pages/Pincéis/Pinceis";
import Panelas from "./pages/Panelas/Panelas";
import EmailConfirmationPage from "./pages/EmailConfirmationPage/EmailConfirmationPage";

import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";

import userService from "./services/user.service";

function App() {
  const [hiddenS, setHiddenS] = useState(true);
  const [hiddenL, setHiddenL] = useState(true);
  const [admin, setAdmin] = useState(undefined);

  const currentUser = async () => {
    try {
      const response = await userService.getCurrentUser();
      setAdmin(response.data.admin);
      console.log(admin);
    } catch (error) {
      console.log("error");
    }
  };

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
        admin={admin}
      />
      {!hiddenS && (
        <Signup toggleHiddenL={toggleHiddenL} toggleHiddenH={toggleHiddenH} />
      )}
      {!hiddenL && (
        <Login toggleHiddenH={toggleHiddenH} currentUser={currentUser} />
      )}
      <Routes>
        <Route
          path="/confirm-email/:confirmationCode"
          element={<EmailConfirmationPage />}
        />
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
