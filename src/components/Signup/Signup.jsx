import authService from "../../services/auth.service";
import "./Signup.css";
import "./SignupL.css";
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Signup({
  toggleHiddenL,
  toggleHiddenH,
  showSuccessToast,
  showErrorToast,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false);

  const viewportWidth = window.innerWidth;

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Send a request to the server using axios
    try {
      const response = await authService.signup(requestBody);

      setErrorMessage("");
      toggleHiddenL();
      showSuccessToast(
        "Successful Signup, please confirm your email before Login"
      );
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
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
          <div className="formHeader">
            <div className="signup">
              <h1>Sign Up</h1>
            </div>
            <div className="closeSignup"></div>
            <Link>
              <img
                className="exitCross"
                src="https://res.cloudinary.com/df3vc4osi/image/upload/v1686585930/titaWebsite/Exit_button_icon_png_kzipsv.png"
                alt="exit"
                onClick={toggleHiddenH}
              />
            </Link>
          </div>
          <form onSubmit={handleSignupSubmit} className="formBox">
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
            <div className="form-group">
              <label className="line" htmlFor="name">
                Name
              </label>
              <input
                className="input"
                type="text"
                name="name"
                onChange={handleName}
                placeholder="Primeiro e último nome"
              />
            </div>
            <button className="buttonSignup" type="submit">
              Sign up
            </button>
          </form>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="gradientGrey" onClick={toggleHiddenH}></div>
        <div className="form">
          <div className="formHeader">
            <h1>Sign Up</h1>
            <Link>
              <img
                className="exitCross"
                src="https://res.cloudinary.com/df3vc4osi/image/upload/v1678934027/movie-gallery/images-removebg-preview_cbnsxm.png"
                alt="exit"
                onClick={toggleHiddenH}
              />
            </Link>
          </div>
          <form onSubmit={handleSignupSubmit} className="formSignUpTablet">
            <div className="form-group signUpFormGroupPos">
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
            <div className="form-group signUpFormGroupPos">
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
            <div className="form-group signUpFormGroupPos">
              <label className="line" htmlFor="name">
                Name
              </label>
              <input
                className="input"
                type="text"
                name="name"
                onChange={handleName}
                placeholder="Primeiro e último nome"
              />
            </div>
            <button className="buttonSignup" type="submit">
              Sign up
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Signup;
