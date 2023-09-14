import "./ForgotPassword.css";

import { useState, useEffect, useRef, React } from "react";
import { Link } from "react-router-dom";

import authService from "../../services/auth.service";

function ForgotPassword({
  toggleHiddenH,
  showSentEmailSuccessToast,
  showCodeConfirmSuccessToast,
  showPasswordChangedToast,
}) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [confirmedCode, setConfirmedCode] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState(false);

  const inputRef = useRef();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestBody = { email: email };
      const response = await authService.sendPasswordResetCode(requestBody);
      if (response.data.sent) {
        setSent(response.data.sent);
        showSentEmailSuccessToast();
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password === confirmPassword) {
        const requestBody = {
          password: password,
          confirmPassword: confirmPassword,
          email: email,
        };
        const response = await authService.newPassword(requestBody);
        if (response.data.message) {
          showPasswordChangedToast();
          setConfirmedCode(!confirmedCode);
          toggleHiddenH();
        }
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  const handleRecoveryPasswordCodeSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    try {
      const requestBody = { recoveryPasswordCode: code };
      const response = await authService.passwordResetCode(requestBody);
      if (response.data.message) {
        setConfirmedCode(true);
        setSent(!sent);
        setOtp(new Array(6).fill(""));
        showCodeConfirmSuccessToast();
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value[element.value.length - 1];
    setOtp(newOtp);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const clipboardData = e.clipboardData.getData("text");

    // Check if the clipboard data is numeric
    if (/^\d+$/.test(clipboardData)) {
      const newOtp = clipboardData.split("").slice(0, 6);
      setOtp(newOtp);
    }
  };

  return (
    <>
      {!sent && !confirmedCode ? (
        <>
          {" "}
          <div className="gradientGrey" onClick={toggleHiddenH}></div>
          <div className="form">
            <div className="formHeader">
              <h1>Forgot Password</h1>
              <Link>
                <img
                  className="exitCross"
                  src="https://res.cloudinary.com/df3vc4osi/image/upload/v1678934027/movie-gallery/images-removebg-preview_cbnsxm.png"
                  alt="exit"
                />
              </Link>
            </div>
            <form onSubmit={handleForgotSubmit}>
              <div className="form-group forgotFormGroupPos">
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
              <button className="buttonLogin buttonPosi" type="submit">
                Submit
              </button>
            </form>
          </div>
        </>
      ) : sent ? (
        <>
          <div className="gradientGrey"></div>
          <div className="form">
            <div className="formHeader">
              <label className="" htmlFor="recoveryPasswordCode">
                <h1>Confirm code</h1>
              </label>
            </div>
            <form onSubmit={handleRecoveryPasswordCodeSubmit}>
              <div className="form-group confirmFormGroupPos">
                {otp.map((data, index) => {
                  return (
                    <>
                      <input
                        key={index}
                        type="number"
                        maxLength={1}
                        name="recoveryPasswordCode"
                        id="recoveryPasswordCode"
                        className="inputSquare"
                        value={data}
                        onChange={(e) => handleChange(e.target, index)}
                        onFocus={(e) => e.target.select()}
                        onPaste={handlePaste}
                      />
                    </>
                  );
                })}
              </div>
              <button className="buttonLogin codeButtonPos" type="submit">
                Submit
              </button>
            </form>
          </div>
        </>
      ) : confirmedCode ? (
        <>
          {" "}
          <div className="gradientGrey"></div>
          <div className="form">
            <div className="formHeader">
              <h1>Reset Password</h1>
            </div>
            <form onSubmit={handleResetPasswordSubmit}>
              <div className="form-group loginFormGroupPos">
                <label className="line" htmlFor="password">
                  Password
                </label>
                <input
                  className="input"
                  type="password"
                  name="password"
                  onChange={handlePassword}
                />
                {password &&
                  confirmPassword &&
                  password === confirmPassword && (
                    <img
                      className="correctIcon"
                      src="https://res.cloudinary.com/df3vc4osi/image/upload/v1694709309/titaWebsite/visto_vsvmdp.png"
                      alt="correct icon"
                    />
                  )}
              </div>
              <div className="form-group loginFormGroupPos">
                <label className="line" htmlFor="password">
                  Confirm Password
                </label>
                <input
                  className="input"
                  type="password"
                  name="password"
                  onChange={handleConfirmPassword}
                />
                {password &&
                  confirmPassword &&
                  password === confirmPassword && (
                    <img
                      className="correctIcon"
                      src="https://res.cloudinary.com/df3vc4osi/image/upload/v1694709309/titaWebsite/visto_vsvmdp.png"
                      alt="correct icon"
                    />
                  )}
              </div>
              <button className="buttonLogin codeButtonPos" type="submit">
                Submit
              </button>
            </form>
          </div>
        </>
      ) : (
        <></>
      )}
      {error && <p className="absolute">{error} </p>}
    </>
  );
}

export default ForgotPassword;
