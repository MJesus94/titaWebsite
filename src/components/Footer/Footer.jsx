import React, { useState } from "react";
import "./Footer.css";

function Footer() {
  const [contactsVisible, setContactsVisible] = useState(false);

  const setContactsAsVisible = () => {
    setContactsVisible(!contactsVisible);
  };
  return (
    <footer>
      <ul>
        <li>
          <h2 className="whoWeAreTitle">Quem nós somos</h2>
        </li>
        <li>
          <h2 onClick={setContactsAsVisible}>Contactos</h2>
          {contactsVisible ? (
            <ul className="contacts">
              <li>
                <span className="contactsFooter">999 999 999</span>
              </li>
              <li>
                <span className="contactsFooter">fonzie@gmail.com</span>
              </li>
            </ul>
          ) : (
            <></>
          )}
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
