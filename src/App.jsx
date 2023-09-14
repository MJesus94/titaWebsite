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

import Login from "./components/Login/Login";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Signup from "./components/Signup/Signup";
import Navbar from "./components/Navbar/Navbar";
import IsAdmin from "./components/IsAdmin/IsAdmin";
import IsPrivate from "./components/IsPrivate/IsPrivate";

import userService from "./services/user.service";

function App() {
  const [hiddenS, setHiddenS] = useState(true);
  const [hiddenL, setHiddenL] = useState(true);
  const [hiddenForgotForm, setHiddenForgotForm] = useState(true);
  const [admin, setAdmin] = useState("");

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

  const toggleHiddenForgotForm = () => {
    setHiddenForgotForm(!hiddenForgotForm);
    setHiddenL(true);
    setHiddenS(true);
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
    setHiddenForgotForm(true);
  };

  const showSuccessToast = () => {
    toast.success("Successful Signup, please confirm your email before Login");
  };

  const showLoginSuccessToast = () => {
    toast.success("Successful Login");
  };

  const showDeleteSuccessToast = () => {
    toast.success("Product successfully deleted");
  };

  const showEditProductSuccessToast = () => {
    toast.success("Product successfully edited");
  };

  const showSentEmailSuccessToast = () => {
    toast.success("Email was sent");
  };

  const showCodeConfirmSuccessToast = () => {
    toast.success("Your code is correct");
  };

  const showPasswordChangedToast = () => {
    toast.success("Your password has been changed");
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
          toggleHiddenForgotForm={toggleHiddenForgotForm}
        />
      )}

      {!hiddenForgotForm && (
        <ForgotPassword
          toggleHiddenH={toggleHiddenH}
          showSentEmailSuccessToast={showSentEmailSuccessToast}
          showCodeConfirmSuccessToast={showCodeConfirmSuccessToast}
          showPasswordChangedToast={showPasswordChangedToast}
        />
      )}
      <Routes>
        <Route
          path="/confirm-email/:confirmationCode"
          element={<EmailConfirmationPage />}
        />
        <Route path="/" element={<HomePage />} />

        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
        <Route
          path="/Linhas"
          element={
            <Linhas
              admin={admin}
              showDeleteSuccessToast={showDeleteSuccessToast}
            />
          }
        />
        <Route
          path="/Pinceis"
          element={
            <Pinceis
              admin={admin}
              showDeleteSuccessToast={showDeleteSuccessToast}
            />
          }
        />
        <Route
          path="/Panelas"
          element={
            <Panelas
              admin={admin}
              showDeleteSuccessToast={showDeleteSuccessToast}
            />
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
        <Route path="/product/:id" element={<SpecificProduct />} />
        <Route
          path="/editProduct/:id"
          element={
            <IsAdmin>
              <EditProduct
                showEditProductSuccessToast={showEditProductSuccessToast}
              />
            </IsAdmin>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
