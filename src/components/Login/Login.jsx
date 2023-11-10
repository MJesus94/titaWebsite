import "./Login.css";
import "./LoginL.css";
import authService from "../../services/auth.service";
import { AuthContext } from "../../context/auth.context";

import { useState, useContext, React, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({
  toggleHiddenH,
  currentUser,
  showSuccessToast,
  toggleHiddenForgotForm,
  showErrorToast,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false);

  const viewportWidth = window.innerWidth;

  const navigate = useNavigate();

  const { storedToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  /* const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    // Send a request to the server using axios

    try {
      console.log(requestBody);
      const response = await authService.login(requestBody);
      setErrorMessage(""); // Reset the error message here
      console.log("here");
      toggleHiddenH();
      currentUser();
      showSuccessToast("Successful Login");

      localStorage.setItem("authToken", response.data.authToken, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      authenticateUser();

      navigate("/Linhas");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  }; */
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    try {
      const response = await authService.login(requestBody);

      // Store both authToken and refreshToken in localStorage
      localStorage.setItem("authToken", response.data.authToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      setErrorMessage("");
      toggleHiddenH();
      currentUser();
      showSuccessToast("Successful Login");
      authenticateUser();
      navigate("/Linhas");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else if (error.response && error.response.status === 401) {
        // Token expired, initiate refresh using refreshToken
        const refreshToken = localStorage.getItem("refreshToken");

        try {
          const refreshResponse = await authService.refreshToken(refreshToken);

          // Update the authToken in localStorage
          localStorage.setItem("authToken", refreshResponse.data.authToken);

          // Retry the original request
          handleLoginSubmit(e);
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          setErrorMessage("Error refreshing token. Please login again.");
        }
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  useEffect(() => {
    showErrorToast(errorMessage);
  }, [errorMessage]);

  if (viewportWidth <= 426) {
    return (
      <>
        <div className="form">
          <div className="loginFormHeader">
            <div className="login">
              <h1>Login</h1>
            </div>
            <div className="closeLogin"></div>
            <Link>
              <img
                className="exitCross"
                src="https://res.cloudinary.com/df3vc4osi/image/upload/v1686585930/titaWebsite/Exit_button_icon_png_kzipsv.png"
                alt="exit"
                onClick={toggleHiddenH}
              />
            </Link>
          </div>
          <form onSubmit={handleLoginSubmit} className="loginFormBox">
            <div className="form-group">
              <label className="line" htmlFor="email">
                Email
              </label>
              <input
                className="input"
                type="email"
                name="email"
                onChange={handleEmail}
              />
            </div>
            <div className="form-group">
              <label className="line" htmlFor="password">
                Password
              </label>
              <input
                className="input"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handlePassword}
              />
              {!showPassword ? (
                <img
                  className="eyeIcon"
                  src="https://res.cloudinary.com/df3vc4osi/image/upload/v1684510168/titaWebsite/eye_icon_2-removebg-preview_di1qug.png"
                  alt="password Visible"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <img
                  className="eyeIcon"
                  src="https://res.cloudinary.com/df3vc4osi/image/upload/v1684510169/titaWebsite/eye_icon_3-removebg-preview_nx7bm0.png"
                  alt="password Visible"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            <button className="buttonLogin buttonPos" type="submit">
              Login
            </button>
          </form>
        </div>
      </>
    );
  } else if (viewportWidth <= 768) {
    return <></>;
  } else {
    return (
      <>
        <div className="gradientGrey" onClick={toggleHiddenH}></div>
        <div className="form">
          <div className="formHeader">
            <h1>Login</h1>
            <Link>
              <img
                className="exitCross"
                src="https://res.cloudinary.com/df3vc4osi/image/upload/v1678934027/movie-gallery/images-removebg-preview_cbnsxm.png"
                alt="exit"
                onClick={toggleHiddenH}
              />
            </Link>
          </div>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group loginFormGroupPos">
              <label className="line" htmlFor="email">
                Email
              </label>
              <input
                className="input"
                type="email"
                name="email"
                onChange={handleEmail}
              />
            </div>
            <div className="form-group loginFormGroupPos">
              <label className="line" htmlFor="password">
                Password
              </label>
              <input
                className="input"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handlePassword}
              />
              {!showPassword ? (
                <img
                  className="eyeIcon"
                  src="https://res.cloudinary.com/df3vc4osi/image/upload/v1684510168/titaWebsite/eye_icon_2-removebg-preview_di1qug.png"
                  alt="password Visible"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <img
                  className="eyeIcon"
                  src="https://res.cloudinary.com/df3vc4osi/image/upload/v1684510169/titaWebsite/eye_icon_3-removebg-preview_nx7bm0.png"
                  alt="password Visible"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            <div className="forgotPasswordDiv">
              <Link className="forgotPassword" onClick={toggleHiddenForgotForm}>
                Forgot password?
              </Link>
            </div>
            <button className="buttonLogin buttonPos" type="submit">
              Login
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Login;
