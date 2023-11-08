import "./ProfilePage.css";
import userService from "../../services/user.service";
import productService from "../../services/product.service";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProfilePage({ showSuccessToast }) {
  const [activeMenuItem, setActiveMenuItem] = useState(0);
  const [dadosPessoaisActive, setDadosPessoaisActive] = useState(true);
  const [encomendasActive, setEncomendasActive] = useState(false);
  const [wishlistActive, setWishlistActive] = useState(false);
  const [optionTitle, setOptionTitle] = useState("Dados Pessoais");
  const [activeUser, setActiveUser] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);

  const [names, setNames] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");

  const viewportWidth = window.innerWidth;

  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleStreet = (e) => setStreet(e.target.value);
  const handleZipCode = (e) => {
    let value = e.target.value;
    const sanitizedValue = value.replace(/\D/g, "");
    let modifiedValue = sanitizedValue;

    if (sanitizedValue.length >= 7) {
      modifiedValue =
        sanitizedValue.slice(0, 4) + "-" + sanitizedValue.slice(4);
    }

    e.target.value = modifiedValue;
    setZipCode(modifiedValue);
  };
  const handleCity = (e) => setCity(e.target.value);

  const validateInput = (e) => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/\D/g, "");
    if (sanitizedValue !== value) {
      e.target.value = sanitizedValue;
      setPhoneNumber(sanitizedValue);
      console.log(phoneNumber);
    } else {
      setPhoneNumber(value);
    }
  };

  const handleUpdateProfileInfo = async (e) => {
    e.preventDefault();
    const name = firstName + " " + lastName;

    const requestBody = {
      name,
      phoneNumber,
      street,
      zipCode,
      city,
    };

    try {
      const response = await userService.editUser(requestBody);
      if (response) {
        showSuccessToast("Your profile info was updated");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  const handleItemClick = (index) => {
    setActiveMenuItem(index);
    if (index === 0) {
      setDadosPessoaisActive(true);
      setEncomendasActive(false);
      setWishlistActive(false);
      setOptionTitle("Dados Pessoais");
    } else if (index === 1) {
      setDadosPessoaisActive(false);
      setEncomendasActive(true);
      setOptionTitle("As minhas encomendas");
    } else {
      setDadosPessoaisActive(false);
      setEncomendasActive(false);
      setWishlistActive(true);
      setOptionTitle("Wishlist");
    }
  };

  const navigate = useNavigate();
  const navigation = (id) => {
    navigate(`/product/${id}`);
  };

  const currentUser = async () => {
    try {
      const response = await userService.getCurrentUser();
      setActiveUser(response.data);
    } catch (error) {
      console.log("error");
    }
  };

  const getAllProducts = async () => {
    try {
      const response = await productService.findAllProducts();
      const mergedArray = [
        ...response.data.productLinhas,
        ...response.data.productPinceis,
        ...response.data.productPanelas,
      ];
      console.log(mergedArray);

      setAllProducts(mergedArray);
    } catch (error) {}
  };

  const removeProductById = (idToRemove) => {
    // Use filter to create a new array without the object with the specified ID
    const updatedProducts = filteredProducts.filter(
      (product) => product._id !== idToRemove
    );

    // Update the state with the new array
    setFilteredProducts(updatedProducts);
  };

  const removeProductAsFavorite = async (id) => {
    try {
      await productService.removeFromFavourites(id);
      removeProductById(id);
      showSuccessToast("Produto removido da sua Wishlist");
    } catch (error) {
      setErrorMessage("Failed to remove from favorites");
    }
  };

  const filterFavorites = (allProducts, favorites) => {
    return allProducts.filter((product) => favorites.includes(product._id));
  };

  useEffect(() => {
    currentUser();
    getAllProducts();
  }, []);

  useEffect(() => {
    if (activeUser) {
      console.log(activeUser);
      setCity(activeUser.address.city);
      setZipCode(activeUser.address.zipCode);
      setStreet(activeUser.address.street);
      setPhoneNumber(activeUser.phoneNumber);
      const namesArray = activeUser.name.split(" ");
      setNames(namesArray);
    }
  }, [activeUser]);

  useEffect(() => {
    if (names.length > 2) {
      const namesF = names[0];
      const namesS = names[1];
      const firstTwoNames = [namesF, namesS].join(" ");
      setFirstName(firstTwoNames);
      const remainingNames = names.slice(2).join(" ");
      setLastName(remainingNames);
    } else {
      setLastName(names[1]);
      setFirstName(names[0]);
    }
  }, [names]);

  useEffect(() => {
    if (activeUser && activeUser.favourites && allProducts) {
      const filteredProducts = filterFavorites(
        allProducts,
        activeUser.favourites
      );
      console.log(filteredProducts);
      setFilteredProducts(filteredProducts);
    }
  }, [allProducts, activeUser]);

  return (
    <div className="mainDiv">
      <div className="contentDiv">
        <div className="userNameDiv">
          {names && <h2>Olá {`${names[0]} ${names[names.length - 1]}`}</h2>}
        </div>
        <div className="optionTitleDiv">
          <div className="rectStyle"></div>
          <h2>{optionTitle}</h2>
        </div>
      </div>

      <div className="menuOptions">
        <p>A SUA CONTA</p>
        <ul className="ulOptions">
          <li
            onClick={() => handleItemClick(0)}
            className={activeMenuItem === 0 ? "active fontColor" : ""}
          >
            Dados Pessoais
          </li>
          <li
            onClick={() => handleItemClick(1)}
            className={activeMenuItem === 1 ? "active fontColor" : ""}
          >
            As minhas encomendas
          </li>
          <li
            onClick={() => handleItemClick(2)}
            className={activeMenuItem === 2 ? "active fontColor" : ""}
          >
            Wishlist
          </li>
        </ul>
      </div>
      {dadosPessoaisActive && activeUser && city && zipCode && (
        <form className="personalInfo" onSubmit={handleUpdateProfileInfo}>
          <div className="changePersonalInfoForm">
            <div className="formLabel">
              <label className="nameLabel" htmlFor="firstName">
                Nome
              </label>
              <input
                type="text"
                name="firstName"
                className="inputPersonalInfo"
                value={firstName}
                onChange={handleFirstName}
              ></input>
            </div>
            <div className="formLabel">
              <label className="nameLabel" htmlFor="lastName">
                Apelido
              </label>
              <input
                type="text"
                name="lastName"
                className="inputPersonalInfo"
                value={lastName}
                onChange={handleLastName}
              ></input>
            </div>
            <div className="formLabel">
              <label className="nameLabel" htmlFor="phoneNumber">
                Número de Telefone
              </label>
              <input
                type="text"
                maxLength="9"
                name="phoneNumber"
                className="inputPersonalInfo"
                placeholder={
                  !phoneNumber.length ? "Indique aqui um contacto válido" : ""
                }
                value={phoneNumber.length ? phoneNumber : ""}
                onChange={validateInput}
              ></input>
            </div>
            <div className="formLabel">
              <label className="nameLabel" htmlFor="street">
                Morada
              </label>
              <input
                type="text"
                name="street"
                className="inputPersonalInfo"
                value={
                  street === "Rua São Bernardo"
                    ? "Introduza a sua morada (Rua/Travessa/Avenida)"
                    : street
                }
                onChange={handleStreet}
              ></input>
            </div>
            <div className="formLabel">
              <label className="nameLabel" htmlFor="zipCode">
                Código-Postal
              </label>
              <input
                type="text"
                name="zipCode"
                maxLength="8"
                className="inputPersonalInfo"
                value={zipCode}
                onInput={handleZipCode}
              ></input>
            </div>
            <div className="formLabel">
              <label className="nameLabel" htmlFor="city">
                Cidade
              </label>
              <input
                type="text"
                name="city"
                className="inputPersonalInfo"
                value={city}
                onChange={handleCity}
              ></input>
            </div>
          </div>
          <button className="formPIButton">GUARDAR</button>
        </form>
      )}
      {encomendasActive && (
        <div className="personalInfo">
          <h2>Under Development ...</h2>
        </div>
      )}
      {wishlistActive && viewportWidth <= 375 ? (
        <div className="wishlistDiv">
          {filteredProducts.map((product) => {
            return (
              <div className="wishlistProduct">
                <div>
                  <img
                    onClick={() => {
                      navigation(product._id);
                    }}
                    className="favoriteImg"
                    src={product.imgUrl}
                    alt={product.title}
                  />
                </div>
                <div className="favoritePriceDiv">
                  <h4>{product.title}</h4>
                  <span>{`${product.price} €`}</span>
                  <button
                    className="buttonAddToFavouritesP"
                    onClick={() => {
                      removeProductAsFavorite(product._id);
                    }}
                  >
                    <span className="removeWishlist">REMOVE FROM WISHLIST</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : wishlistActive && viewportWidth >= 1024 ? (
        <div className="wishlistDiv">
          {filteredProducts.map((product) => {
            return (
              <div className="wishlistProduct">
                <div>
                  <img
                    onClick={() => {
                      navigation(product._id);
                    }}
                    className="favoriteImg"
                    src={product.imgUrl}
                    alt={product.title}
                  />
                </div>
                <div className="favoriteTitleDiv">
                  <h2>{product.title}</h2>
                  <span>{product.description}</span>
                </div>
                <div className="favoritePriceDiv">
                  <span>{`${product.price} €`}</span>
                  <button
                    className="buttonAddToFavouritesP"
                    onClick={() => {
                      removeProductAsFavorite(product._id);
                    }}
                  >
                    REMOVE FROM WISHLIST
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProfilePage;
