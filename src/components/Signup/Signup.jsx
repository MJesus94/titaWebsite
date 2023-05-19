import "./Signup.css";
import authService from "../../services/auth.service";

import { React, useState } from "react";
import { Link } from "react-router-dom";

function Signup({ toggleHiddenL, toggleHiddenH }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUserame = (e) => setUsername(e.target.value);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, username };

    // Send a request to the server using axios
    try {
      await authService.signup(requestBody);
      if (!errorMessage) toggleHiddenL();
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <>
      <div className="gradientGrey"></div>
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
        <form onSubmit={handleSignupSubmit}>
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
          <div className="form-group">
            <label className="line" htmlFor="name">
              Name
            </label>
            <input
              className="input"
              type="text"
              name="name"
              onChange={handleUserame}
            />
          </div>
          <button class="button-56" type="submit">
            Sign up
          </button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </>
  );
}

export default Signup;
