import "./Navbar.css";
import { AuthContext } from "../../context/auth.context";

import { FaBars, FaTimes } from "react-icons/fa";
import { useRef, useContext } from "react";
import { Link } from "react-router-dom";

function Navbars({
  toggleHiddenS,
  toggleHiddenL,
  toggleHiddenH,
  admin,
  setAdmin,
}) {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  const navRef = useRef();

  const showNavBar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const handleLinkClick = () => {
    showNavBar();
  };

  return (
    <header>
      <Link to="/" onClick={toggleHiddenH}>
        <img
          className="logo"
          src="https://res.cloudinary.com/df3vc4osi/image/upload/v1683732465/titaWebsite/345753260_556282476419009_5163430452511384756_n_sznx4x.jpg"
          alt="Logo Fonzie"
        />{" "}
      </Link>
      <nav ref={navRef}>
        <Link to="/Linhas" onClick={handleLinkClick}>
          Linhas
        </Link>
        <Link to="/Panelas" onClick={handleLinkClick}>
          Panelas
        </Link>
        <Link to="/Pinceis" onClick={handleLinkClick}>
          Pincéis
        </Link>
        {admin && (
          <Link to="/NewProduct" onClick={handleLinkClick}>
            + Produtos
          </Link>
        )}
        {!isLoggedIn ? (
          <>
            <Link
              onClick={() => {
                handleLinkClick();
                toggleHiddenS();
              }}
            >
              Sign up
            </Link>
            <Link
              onClick={() => {
                handleLinkClick();
                toggleHiddenL();
              }}
            >
              Login
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile" onClick={handleLinkClick}>
              {" "}
              Profile
            </Link>
            <Link
              to="/"
              onClick={() => {
                logOutUser(setAdmin);
                toggleHiddenH();
                handleLinkClick();
              }}
            >
              {" "}
              Logout
            </Link>
          </>
        )}

        <button className="nav-btn nav-close-btn" onClick={showNavBar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavBar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbars;
