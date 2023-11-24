import "../SpecificProduct/SpecificProduct.css";
import Loading from "../../components/Loading/Loading";
import "./EditProduct.css";

import { colourOptions } from "../../Assets/Data";

import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useParams, Link, useNavigate } from "react-router-dom";
import productService from "../../services/product.service";

function EditProduct({ showSuccessToast }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const animatedComponents = makeAnimated();

  const [oneProduct, setOneProduct] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imgWidth, setImgWidth] = useState(false);
  const [imgHeight, setImgHeight] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedPrice, setEditedPrice] = useState(false);
  const [editedSelectedColors, setEditedSelectedColors] = useState([]);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedTema, setEditedTema] = useState("");
  const [editedFormato, setEditedFormato] = useState("");
  const [editedTamanho, setEditedTamanho] = useState("");
  const [editedCobertura, setEditedCobertura] = useState("");
  const [editedMassa, setEditedMassa] = useState("");
  const [error, setError] = useState("");
  const [hidden, setHidden] = useState(false);

  const handleEditedTitle = (e) => setEditedTitle(e.target.value);
  const handleEditedPrice = (e) => {
    const priceValue = parseFloat(e.target.value);
    setEditedPrice(priceValue);
  };
  const handleEditedDescription = (e) => setEditedDescription(e.target.value);
  const handleEditedTema = (e) => setEditedTema(e.target.value);
  const handleEditedFormato = (e) => setEditedFormato(e.target.value);
  const handleEditedTamanho = (e) => setEditedTamanho(e.target.value);
  const handleEditedMassa = (e) => setEditedMassa(e.target.value);
  const handleEditedCobertura = (e) => setEditedCobertura(e.target.value);
  const handleSelectedColors = (selectedOptions) => {
    setEditedSelectedColors(selectedOptions);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const priceValue = editedPrice || oneProduct.price;

      const body = {
        title: editedTitle,
        description: editedDescription,
        price: priceValue,
        color: editedSelectedColors.map((color) => color.value),
      };

      validateFields(body);

      if (oneProduct.category === "Pincéis") {
        body.tema = editedTema;
        body.formato = editedFormato;
        body.tamanho = editedTamanho;
        validateAdditionalFields(body, ["tema", "formato", "tamanho"]);
      } else if (oneProduct.category === "Panelas") {
        body.cobertura = editedCobertura;
        body.formato = editedFormato;
        body.massa = editedMassa;
        validateAdditionalFields(body, ["cobertura", "formato", "massa"]);
      }

      await productService.editProduct(id, body);
      navigateBasedOnCategory();
      showSuccessToast("Product successfully edited");
    } catch (error) {
      handleFormSubmissionError(error);
    }
  };

  const validateFields = (body) => {
    const requiredFields = ["title", "price", "color"];

    const missing = requiredFields.filter((field) => !body[field]);

    if (editedSelectedColors.length === 0) {
      missing.push("color");
    }

    if (missing.length > 0) {
      const missingFieldsMessage = `Please fill in the following fields: ${missing.join(
        ", "
      )}`;
      setError(missingFieldsMessage);
      setHidden(false);
      throw new Error(missingFieldsMessage);
    }
  };

  const validateAdditionalFields = (body, fields) => {
    const missing = fields.filter((field) => !body[field]);

    if (missing.length > 0) {
      const missingFieldsMessage = `Please fill in the following fields: ${missing.join(
        ", "
      )}`;
      setError(missingFieldsMessage);
      setHidden(false);
      throw new Error(missingFieldsMessage);
    }
  };

  const navigateBasedOnCategory = () => {
    const categoryRoutes = {
      Linhas: "/Linhas",
      Pincéis: "/Pinceis",
      Panelas: "/Panelas",
    };

    navigate(categoryRoutes[oneProduct.category]);
  };

  const handleFormSubmissionError = (error) => {
    if (error.response && error.response.status === 400) {
      const { message, missingFields } = error.response.data;
      if (missingFields && missingFields.length > 0) {
        const missingFieldsMessage = `Please fill in the following fields: ${missingFields.join(
          ", "
        )}`;
        setError(missingFieldsMessage);
        setHidden(false);
      } else {
        setError(message);
        setHidden(false);
      }
    } else {
      console.error("An error occurred:", error);
    }
  };

  const hideErrorMessage = () => {
    setHidden(!hidden);
  };
  const getOneProduct = async () => {
    try {
      const response = await productService.findOneProduct(id);
      console.log(response.data);
      setOneProduct(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOneProduct();
  }, []);

  useEffect(() => {
    if (oneProduct && oneProduct.imgUrl) {
      setEditedTitle(oneProduct.title);
      setEditedDescription(oneProduct.description);
      const selectedColors = oneProduct.color.map((color) => ({
        value: color,
        label: color,
      }));
      setEditedSelectedColors(selectedColors);
      setEditedCobertura(oneProduct.cobertura);
      setEditedFormato(oneProduct.formato);
      setEditedMassa(oneProduct.massa);
      setEditedPrice(oneProduct.price);
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
      {loading && <Loading />}
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
            <div className="productDisplay editProductDisplay">
              <div className="productInformation">
                <div className="productDetails">
                  <div className="editPriceTitleDiv">
                    <label htmlFor="text">Title</label>
                    <input
                      type="text"
                      placeholder={oneProduct.title}
                      name="title"
                      id="title"
                      value={editedTitle}
                      onChange={handleEditedTitle}
                      className="editInputs inputSizes"
                    />
                  </div>
                  <div className="editPriceTitleDiv">
                    <label htmlFor="price">Price</label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      value={editedPrice}
                      onChange={handleEditedPrice}
                      placeholder={oneProduct.price}
                      className="editInputs inputSizes"
                    />
                  </div>
                </div>
                {/* <div className="buttonsDiv">
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
                </div> */}
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
              <div className="alignment editPriceTitleDiv">
                <label htmlFor="description">Description</label>
                <textarea
                  placeholder={oneProduct.description}
                  name="description"
                  id="description"
                  value={editedDescription}
                  onChange={handleEditedDescription}
                  className="editInputs inputSizes"
                />
                <label htmlFor="color">Color</label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  name="color"
                  id="color"
                  options={colourOptions}
                  onChange={handleSelectedColors}
                  value={editedSelectedColors}
                  className="editInputs"
                />
                {oneProduct.category === "Pincéis" ? (
                  <>
                    <div className="editPriceTitleDiv">
                      <label htmlFor="tema">Tema</label>
                      <input
                        type="text"
                        name="tema"
                        id="tema"
                        value={editedTema}
                        onChange={handleEditedTema}
                        placeholder={oneProduct.tema}
                        className="editInputs inputSizes"
                      />
                    </div>
                    <div className="editPriceTitleDiv">
                      <label htmlFor="formato">Formato</label>
                      <input
                        type="text"
                        name="formato"
                        id="formato"
                        value={editedFormato}
                        onChange={handleEditedFormato}
                        placeholder={oneProduct.formato}
                        className="editInputs inputSizes"
                      />
                    </div>
                    <div className="editPriceTitleDiv">
                      <label htmlFor="tamanho">Tamanho</label>
                      <input
                        type="text"
                        name="tamanho"
                        id="tamanho"
                        value={editedTamanho}
                        onChange={handleEditedTamanho}
                        placeholder={oneProduct.tamanho}
                        className="editInputs inputSizes"
                      />
                    </div>
                  </>
                ) : oneProduct.category === "Panelas" ? (
                  <>
                    <div className="editPriceTitleDiv">
                      <label htmlFor="massa">Massa</label>
                      <input
                        type="text"
                        name="massa"
                        id="massa"
                        value={editedMassa}
                        onChange={handleEditedMassa}
                        placeholder={oneProduct.massa}
                        className="editInputs inputSizes"
                      />
                    </div>
                    <div className="editPriceTitleDiv">
                      <label htmlFor="formato">Formato</label>
                      <input
                        type="text"
                        name="formato"
                        id="formato"
                        value={editedFormato}
                        onChange={handleEditedFormato}
                        placeholder={oneProduct.formato}
                        className="editInputs inputSizes"
                      />
                    </div>
                    <div className="editPriceTitleDiv">
                      <label htmlFor="cobertura">Cobertura</label>
                      <input
                        type="text"
                        name="cobertura"
                        id="cobertura"
                        value={editedCobertura}
                        onChange={handleEditedCobertura}
                        placeholder={oneProduct.cobertura}
                        className="editInputs inputSizes"
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <Button
                  variant="warning"
                  className="submitEditButton"
                  size="md"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
          {error && !hidden && (
            <div className="overlay">
              <div className="errorDiv">
                <img
                  className="closeError"
                  src="https://res.cloudinary.com/df3vc4osi/image/upload/v1686585930/titaWebsite/Exit_button_icon_png_kzipsv.png"
                  alt="exit"
                  onClick={hideErrorMessage}
                />
                <p className="error">{error}</p>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
}

export default EditProduct;
