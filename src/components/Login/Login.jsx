import "./Login.css";
import authService from "../../services/auth.service";
import { AuthContext } from "../../context/auth.context";

import { useState, useContext, React } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ toggleHiddenH }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storedToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    // Send a request to the server using axios

    try {
      const response = await authService.login(requestBody);
      if (!errorMessage) toggleHiddenH();

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
      <div className="gradientGrey"></div>
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
              type="password"
              name="password"
              onChange={handlePassword}
            />
          </div>
          <button class="button-56" type="submit">
            Login
          </button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </>
  );
}

export default Login;
