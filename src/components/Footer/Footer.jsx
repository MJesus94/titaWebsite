import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <ul>
        <li>
          <h2>Quem nós somos</h2>
        </li>
        <li>
          <h2>Contactos</h2>
        </li>
      </ul>
      <div className="copyrightDiv">
        <div>
          <h6>Developed by Miguel Jesus</h6>
          <h6>Copyright ©2023 Fonzie</h6>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
