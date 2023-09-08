import "../SpecificProduct/SpecificProduct.css";

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import productService from "../../services/product.service";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [oneProduct, setOneProduct] = useState(false);
  const [imgWidth, setImgWidth] = useState(false);
  const [imgHeight, setImgHeight] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedSelectedColors, setEditedSelectedColors] = useState([]);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedTema, setEditedTema] = useState("");
  const [editedFormato, setEditedFormato] = useState("");
  const [editedTamanho, setEditedTamanho] = useState("");
  const [editedCobertura, setEditedCobertura] = useState("");
  const [editedMassa, setEditedMassa] = useState("");

  const [missingFields, setMissingFields] = useState([]);
  const [error, setError] = useState("");

  const handleEditedTitle = (e) => setEditedTitle(e.target.value);
  const handleEditedPrice = (e) => {
    const priceValue = parseFloat(e.target.value);
    setEditedPrice(priceValue);
  };
  const handleSelectedColors = (selectedOptions) => {
    setEditedSelectedColors(selectedOptions);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const isValidNumber = (value) => {
      return /^-?\d+(\.\d+)?$/.test(value);
    };

    if (!isValidNumber(editedPrice)) {
      setError("Please enter a valid price.");
      return;
    }
    
    const priceValue = parseFloat(editedPrice);

    const body = {
      title: editedTitle,
      description: editedDescription,
      price: priceValue,
      color: editedSelectedColors.map((color) => color.value),
    };
    console.log(oneProduct.category);
    const requiredFields = ["title", "imgUrl", "category", "price", "color"];

    const missing = requiredFields.filter((field) => !body[field]);

    if (editedSelectedColors.length === 0) {
      missing.push("color");
    }

    // additional fields based on category
    if (oneProduct.category === "Pincéis") {
      body.tema = editedTema;
      body.formato = editedFormato;
      body.tamanho = editedTamanho;
    } else if (oneProduct.category === "Panelas") {
      body.cobertura = editedCobertura;
      body.formato = editedFormato;
      body.massa = editedMassa;
    }

    if (missing.length > 0) {
      setMissingFields(missing);
      console.log(missingFields);
      return;
    }
    console.log(body);
    try {
      await productService.createProduct(body);

      // Navigation based on category
      if (oneProduct.category === "Linhas") {
        navigate(`/Linhas`);
      } else if (oneProduct.category === "Pincéis") {
        navigate("/Pinceis");
      } else {
        navigate("/Panelas");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const { message, missingFields } = error.response.data;
        if (missingFields && missingFields.length > 0) {
          // Construct the missing fields message
          const missingFieldsMessage = `Please fill in the following fields: ${missingFields.join(
            ", "
          )}`;
          setError(missingFieldsMessage);
        } else {
          setError(message);
        }
      } else {
        console.log("An error occurred:", error);
      }
    }
  };

  const getOneProduct = async () => {
    try {
      const response = await productService.findOneProduct(id);
      setOneProduct(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getOneProduct();
  }, []);

  useEffect(() => {
    if (oneProduct && oneProduct.imgUrl) {
      const img = new Image();
      img.src = oneProduct.imgUrl;

      img.addEventListener("load", () => {
        setImgWidth(img.naturalWidth);
        setImgHeight(img.naturalHeight);
      });

      return () => {
        img.removeEventListener("load", () => {});
      };
    }
  }, [oneProduct]);

  return (
    <>
      {oneProduct && (
        <section className="main-section">
          <div className="infoContainer">
            <ol className="routePath">
              <li>
                {" "}
                <Link to="/" className="link">
                  <span className="categorySpan">Página Inicial</span>
                  <img
                    src="https://res.cloudinary.com/df3vc4osi/image/upload/v1688657721/titaWebsite/images-removebg-preview_q3tb4e.png"
                    alt="right caret"
                    className="icon-caret"
                  />
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  to={
                    oneProduct.category === "Pincéis"
                      ? "/Pinceis"
                      : `/${oneProduct.category}`
                  }
                  className="link"
                >
                  {" "}
                  <span className="categorySpan">
                    {oneProduct.category}
                  </span>{" "}
                  <img
                    src="https://res.cloudinary.com/df3vc4osi/image/upload/v1688657721/titaWebsite/images-removebg-preview_q3tb4e.png"
                    alt="right caret"
                    className="icon-caret"
                  />
                </Link>
              </li>
              <li className="currentProduct"> {oneProduct?.title} </li>
            </ol>
          </div>
          <form onSubmit={handleEditSubmit}>
            <div className="productDisplay">
              <div className="productInformation">
                <div className="productDetails">
                  <div>
                    <label htmlfor="text">Title</label>
                    <input
                      type="text"
                      placeholder={oneProduct.title}
                      name="title"
                      value={editedTitle}
                      onChange={handleEditedTitle}
                    />
                  </div>
                  <div>
                    <label htmlFor="price">Price</label>
                    <input
                      type="text"
                      name="price"
                      value={editedPrice}
                      onChange={handleEditedPrice}
                      placeholder={oneProduct.price}
                    />
                  </div>
                </div>
                <div className="buttonsDiv">
                  <button className="buttonAddToCart">
                    <span>ADICIONAR AO CARRINHO</span>
                  </button>
                  <button className="buttonAddToFavourites">
                    <img
                      className="favouriteHeart"
                      src="https://res.cloudinary.com/df3vc4osi/image/upload/v1688747630/titaWebsite/images__1_-removebg-preview_yayvcy.png"
                      alt="heart"
                    />{" "}
                    ADD TO WISHLIST
                  </button>
                </div>
              </div>
              <div className="imgUrlDisplayDiv">
                {" "}
                {imgWidth > imgHeight ? (
                  <img
                    className="imgUrlDisplay"
                    src={oneProduct.imgUrl}
                    alt={oneProduct.title}
                  />
                ) : imgWidth === imgHeight ? (
                  <img
                    className="imgUrlDisplay"
                    src={oneProduct.imgUrl}
                    alt={oneProduct.title}
                  />
                ) : (
                  <img
                    className="imgUrlDisplay"
                    src={oneProduct.imgUrl}
                    alt={oneProduct.title}
                  />
                )}
              </div>
              <div></div>
            </div>
          </form>
        </section>
      )}
    </>
  );
}

export default EditProduct;
