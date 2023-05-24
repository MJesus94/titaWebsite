import "./Login.css";
import authService from "../../services/auth.service";
import { AuthContext } from "../../context/auth.context";


import { useState, useContext, React } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ toggleHiddenH, currentUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { storedToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    // Send a request to the server using axios

    try {
      const response = await authService.login(requestBody);
      if (!errorMessage) {
        toggleHiddenH();
        currentUser();
      }

      localStorage.setItem("authToken", response.data.authToken, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      authenticateUser();

      navigate("/Linhas");
    } catch (error) {
      setErrorMessage(error);
    }
  };

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
          <button className="buttonLogin" type="submit">
            Login
          </button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </>
  );
}

export default Login;
