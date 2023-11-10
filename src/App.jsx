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
import SpecificProduct from "./pages/SpecificProduct/SpecificProduct";
import EditProduct from "./pages/EditProduct/EditProduct";
import { NavbarVisibilityProvider } from "./context/NavbarVisibilityContext";

import Login from "./components/Login/Login";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Signup from "./components/Signup/Signup";
import Navbar from "./components/Navbar/Navbar";
import IsAdmin from "./components/IsAdmin/IsAdmin";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import Footer from "./components/Footer/Footer";

import userService from "./services/user.service";

function App() {
  const [hiddenS, setHiddenS] = useState(true);
  const [hiddenL, setHiddenL] = useState(true);
  const [hiddenForgotForm, setHiddenForgotForm] = useState(true);
  const [admin, setAdmin] = useState("");
  const [activeUser, setActiveUser] = useState(false);
  const [navElement, setNavElement] = useState(null);

  const showNavBar = () => {
    navElement.current.classList.toggle("responsive_nav");
  };

  const currentUser = async () => {
    try {
      const response = await userService.getCurrentUser();
      setAdmin(response.data.admin);
      setActiveUser(response.data);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    currentUser();
  }, []);

  const toggleHiddenForgotForm = () => {
    setHiddenForgotForm(!hiddenForgotForm);
    setHiddenL(true);
    setHiddenS(true);
  };

  const toggleHiddenS = () => {
    setHiddenS(!hiddenS);
    setHiddenL(true);
    setHiddenForgotForm(true);
  };

  const toggleHiddenL = () => {
    setHiddenL(!hiddenL);
    setHiddenS(true);
    setHiddenForgotForm(true);
  };

  const toggleHiddenH = () => {
    setHiddenL(true);
    setHiddenS(true);
    setHiddenForgotForm(true);
  };

  const showSuccessToast = (message) => {
    toast.success(message);
  };

  const showErrorToast = (message) => {
    toast.error(message);
  };

  return (
    <NavbarVisibilityProvider>
      <div className="App">
        <ToastContainer />
        <Navbar
          toggleHiddenS={toggleHiddenS}
          toggleHiddenL={toggleHiddenL}
          toggleHiddenH={toggleHiddenH}
          admin={admin}
          setAdmin={setAdmin}
          setNavElement={setNavElement}
          showNavBar={showNavBar}
        />
        {!hiddenS && (
          <Signup
            toggleHiddenL={toggleHiddenL}
            toggleHiddenH={toggleHiddenH}
            showSuccessToast={showSuccessToast}
            showErrorToast={showErrorToast}
          />
        )}
        {!hiddenL && (
          <Login
            toggleHiddenH={toggleHiddenH}
            currentUser={currentUser}
            showSuccessToast={showSuccessToast}
            toggleHiddenForgotForm={toggleHiddenForgotForm}
            showErrorToast={showErrorToast}
          />
        )}

        {!hiddenForgotForm && (
          <ForgotPassword
            toggleHiddenH={toggleHiddenH}
            toggleHiddenL={toggleHiddenL}
            showSuccessToast={showSuccessToast}
          />
        )}
        <Routes>
          <Route
            path="/confirm-email/:confirmationCode"
            element={<EmailConfirmationPage />}
          />
          <Route path="/" element={<HomePage showNavBar={showNavBar} />} />

          <Route
            path="/profile"
            element={
              <IsPrivate>
                <ProfilePage showSuccessToast={showSuccessToast} />
              </IsPrivate>
            }
          />
          <Route
            path="/Linhas"
            element={
              <Linhas admin={admin} showSuccessToast={showSuccessToast} />
            }
          />
          <Route
            path="/Pinceis"
            element={
              <Pinceis admin={admin} showSuccessToast={showSuccessToast} />
            }
          />
          <Route
            path="/Panelas"
            element={
              <Panelas admin={admin} showSuccessToast={showSuccessToast} />
            }
          />
          <Route
            path="/NewProduct"
            element={
              <IsAdmin>
                <NewProducts />
              </IsAdmin>
            }
          />
          <Route
            path="/product/:id"
            element={<SpecificProduct showSuccessToast={showSuccessToast} showErrorToast={showErrorToast}/>}
          />
          <Route
            path="/editProduct/:id"
            element={
              <IsAdmin>
                <EditProduct showSuccessToast={showSuccessToast} />
              </IsAdmin>
            }
          />
          <Route
            path="/profile/:id"
            element={<ProfilePage activeUser={activeUser} />}
          />
        </Routes>
        <Footer />
      </div>
    </NavbarVisibilityProvider>
  );
}

export default App;
