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
      <img className ="logo" src="https://res.cloudinary.com/df3vc4osi/image/upload/v1683732465/titaWebsite/345753260_556282476419009_5163430452511384756_n_sznx4x.jpg" alt="Logo Fonzie"/>
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