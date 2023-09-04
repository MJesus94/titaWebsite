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

import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";

import userService from "./services/user.service";

function App() {
  const [hiddenS, setHiddenS] = useState(true);
  const [hiddenL, setHiddenL] = useState(true);
  const [admin, setAdmin] = useState("");

  const images = [
    'https://res.cloudinary.com/df3vc4osi/image/upload/v1688898208/titaWebsite/e5p7mmaic978vexwgf9r.jpg',
    'https://res.cloudinary.com/df3vc4osi/image/upload/v1688899583/titaWebsite/snqr3wqbqv1bkffdqcve.jpg',
    "https://res.cloudinary.com/df3vc4osi/image/upload/v1688897902/titaWebsite/cwxntkrztgwq9o9pgrkq.jpg",
    "https://res.cloudinary.com/df3vc4osi/image/upload/v1688897776/titaWebsite/bskwmvzccthkoutbbvhw.jpg"
    // Add more image URLs as needed
  ];

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
    toast.success("Successful Signup, please confirm your email before Login");
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
        <Route path="/" element={<HomePage />} />

        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
        <Route path="/Linhas" element={<Linhas />} />
        <Route path="/Pinceis" element={<Pinceis  images={images}/>} />
        <Route path="/Panelas" element={<Panelas />} />
        <Route
          path="/NewProduct"
          element={
            <IsPrivate>
              <NewProducts />
            </IsPrivate>
          }
        />
        <Route path="/product/:id" element={<SpecificProduct />} />
      </Routes>
    </div>
  );
}

export default App;
