import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Linhas from "./pages/Linhas/Linhas";
import Pinceis from "./pages/Pincéis/Pinceis";
import Panelas from "./pages/Panelas/Panelas";
import EmailConfirmationPage from "./pages/EmailConfirmationPage/EmailConfirmationPage";
import NewProducts from "./pages/NewProducts/NewProducts";

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
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    currentUser();
  }, []);

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

  const showSuccessToast = () => {
    toast.success("Successful Signup");
  };

  const showLoginSuccessToast = () => {
    toast.success("Successful Login");
  };

  return (
    <div className="App">
      <ToastContainer />
      <Navbar
        toggleHiddenS={toggleHiddenS}
        toggleHiddenL={toggleHiddenL}
        toggleHiddenH={toggleHiddenH}
        admin={admin}
        setAdmin={setAdmin}
      />
      {!hiddenS && (
        <Signup
          toggleHiddenL={toggleHiddenL}
          toggleHiddenH={toggleHiddenH}
          showSuccessToast={showSuccessToast}
        />
      )}
      {!hiddenL && (
        <Login
          toggleHiddenH={toggleHiddenH}
          currentUser={currentUser}
          showLoginSuccessToast={showLoginSuccessToast}
        />
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
        <Route path="/NewProduct" element={<NewProducts />} />
      </Routes>
    </div>
  );
}

export default App;
