import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from "react";

function Navbars() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  // const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navRef = useRef();

  const showNavBar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <h3>Logo</h3>
      <nav ref={navRef}>
        <a href="/#">Home</a>
        <a href="/#">Linhas</a>
        <a href="/#">Pincéis</a>
        <a href="/#">Panelas</a>
        <a href="/#">Signup</a>
        <a href="/#">Login</a>
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