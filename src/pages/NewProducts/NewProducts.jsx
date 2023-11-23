import "./NewProducts.css";
import { colourOptions } from "../../Assets/Data";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import React, { useState } from "react";

import productService from "../../services/product.service";

function NewProducts() {
  // Usestates to control mechanism
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Linhas");
  const [price, setPrice] = useState(0);
  const [selectedColors, setSelectedColors] = useState([]);
  const [tema, setTema] = useState("");
  const [formato, setFormato] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [cobertura, setCobertura] = useState("");
  const [massa, setMassa] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [missingFields, setMissingFields] = useState([]);

  const [hiddenForm, setHiddenForm] = useState(true);
  const [hiddenButton, setHiddenButton] = useState(true);
  const [hiddenElements, setHiddenElements] = useState(false);

  // Select animated

  const animatedComponents = makeAnimated();

  // Handling variables

  const handleTitle = (e) => setTitle(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleCategory = (e) => setCategory(e.target.value);
  const handlePrice = (e) => {
    const priceValue = parseFloat(e.target.value);
    setPrice(priceValue);
  };
  const handleTema = (e) => setTema(e.target.value);
  const handleFormato = (e) => setFormato(e.target.value);
  const handleTamanho = (e) => setTamanho(e.target.value);
  const handleCobertura = (e) => setCobertura(e.target.value);
  const handleMassa = (e) => setMassa(e.target.value);
  const handleSelectedColors = (selectedOptions) => {
    setSelectedColors(selectedOptions);
  };
  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    productService
      .uploadPic(uploadData)
      .then((response) => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImgUrl(response.fileUrl);
        setLoading(false);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      title,
      imgUrl,
      description,
      category,
      price,
      color: selectedColors.map((color) => color.value),
    };
    console.log(category);
    const requiredFields = ["title", "imgUrl", "category", "price", "color"];

    const missing = requiredFields.filter((field) => !body[field]);

    if (selectedColors.length === 0) {
      missing.push("color");
    }

    // additional fields based on category
    if (category === "Pincéis") {
      body.tema = tema;
      body.formato = formato;
      body.tamanho = tamanho;
    } else if (category === "Panelas") {
      body.cobertura = cobertura;
      body.formato = formato;
      body.massa = massa;
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
      if (category === "Linhas") {
        navigate(`/Linhas`);
      } else if (category === "Pincéis") {
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

  // Arrow functions to control button actions

  const backwards = () => {
    setHiddenButton(true);
    setHiddenElements(false);
    setHiddenForm(true);
  };

  const advance = () => {
    setHiddenForm(false);
    setHiddenButton(false);
    setHiddenElements(true);
  };

  // react router dom Navigate

  const navigate = useNavigate();

  return (
    <>
      <section className="addProductSection">
        {!hiddenElements && (
          <>
            <div className="divCategoryInput">
              <h1>Qual é a categoria do produto?</h1>
              <select
                className="categoryInput"
                name="category"
                value={category}
                onChange={handleCategory}
              >
                <option value="Linhas">Linhas</option>
                <option value="Pincéis">Pincéis</option>
                <option value="Panelas">Panelas</option>
              </select>
              <button className="nextButton" onClick={advance}>
                <span>NEXT</span>
              </button>
            </div>
          </>
        )}
        {!hiddenForm && (
          <>
            <div className="formDiv">
              <div className="formTitle">
                <h4 className="titlePost">Add new Product</h4>
              </div>
              <form className="addProductForm" onSubmit={handleSubmit}>
                <label
                  className={
                    category === "Pincéis" || category === "Panelas"
                      ? `addTitleLabelPinceis addProductLabel ${
                          missingFields.includes("title") && "errorLabel"
                        }`
                      : `addTitleLabel addProductLabel ${
                          missingFields.includes("title") && "errorLabel"
                        }`
                  }
                  htmlFor="text"
                >
                  Title
                </label>
                <input
                  className="addProductInput"
                  type="text"
                  name="email"
                  value={title}
                  onChange={handleTitle}
                />
                <label
                  className={
                    category === "Pincéis" || category === "Panelas"
                      ? `addDescriptionLabelPinceis addProductLabel `
                      : `addDescriptionLabel addProductLabel`
                  }
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="addProductInput textAreaDescription"
                  rows={4}
                  cols={40}
                  name="description"
                  value={description}
                  onChange={handleDescription}
                />
                <label
                  className={
                    category === "Pincéis" || category === "Panelas"
                      ? `addPriceLabelPinceis addProductLabel ${
                          missingFields.includes("title") && "errorLabel"
                        }`
                      : `addPriceLabel addProductLabel ${
                          missingFields.includes("title") && "errorLabel"
                        }`
                  }
                  htmlFor="price"
                >
                  Price
                </label>
                <input
                  className="addProductInput"
                  type="number"
                  name="price"
                  value={price}
                  onChange={handlePrice}
                />
                <label
                  className={`${
                    missingFields.includes("color") && "errorLabel"
                  }`}
                  htmlFor="color"
                >
                  Color
                </label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  name="color"
                  options={colourOptions}
                  onChange={handleSelectedColors}
                  value={selectedColors}
                  className="selectColorInput"
                />
                <label className="" htmlFor="file">
                  File
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileUpload(e)}
                  className="addFileInput"
                />

                {category === "Pincéis" ? (
                  <>
                    {" "}
                    <label
                      className="addProductLabel addTemaLabelPinceis"
                      htmlFor="tema"
                    >
                      Tema
                    </label>
                    <input
                      className="addProductInput"
                      type="text"
                      name="tema"
                      value={tema}
                      onChange={handleTema}
                      placeholder="Animais/Botânica/Abstrato etc."
                    />
                    <label
                      className="addProductLabel addFormatoLabelPinceis"
                      htmlFor="formato"
                    >
                      Formato
                    </label>
                    <input
                      className="addProductInput"
                      type="text"
                      name="formato"
                      value={formato}
                      onChange={handleFormato}
                      placeholder="Formato Paisagem/Formato vertical/Quadrado/Panorama"
                    />
                    <label
                      className="addProductLabel addTamanhoLabelPinceis"
                      htmlFor="tamanho"
                    >
                      Tamanho
                    </label>
                    <input
                      className="addProductInput"
                      type="text"
                      name="tamanho"
                      value={tamanho}
                      onChange={handleTamanho}
                      placeholder="100 x 130/120 x 160 etc."
                    />
                  </>
                ) : category === "Panelas" ? (
                  <>
                    <label
                      className="addProductLabel addTemaLabelPinceis"
                      htmlFor="cobertura"
                    >
                      Cobertura
                    </label>
                    <input
                      className="addProductInput"
                      type="text"
                      name="cobertura"
                      value={cobertura}
                      onChange={handleCobertura}
                      placeholder="Chocolate/Doce de Ovos etc."
                    />
                    <label
                      className="addProductLabel addFormatoLabelPinceis"
                      htmlFor="formato"
                    >
                      Formato
                    </label>
                    <input
                      className="addProductInput"
                      type="text"
                      name="formato"
                      value={formato}
                      onChange={handleFormato}
                      placeholder="Rectangular/Quadrado/Redondo etc."
                    />
                    <label
                      className="addProductLabel addTamanhoLabelPinceis"
                      htmlFor="massa"
                    >
                      Massa
                    </label>
                    <input
                      className="addProductInput"
                      type="text"
                      name="massa"
                      value={massa}
                      onChange={handleMassa}
                      placeholder="Massa Chocolate/Massa Iogurte/Massa Laranja"
                    />
                  </>
                ) : (
                  <></>
                )}

                {!loading ? (
                  <Button
                    variant="warning"
                    className="disabledButton submitButtonNewP"
                    size="md"
                    type="submit"
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    variant="warning"
                    className="disabledButton submitButtonDisabled"
                    size="md"
                    disabled
                  >
                    Submit
                  </Button>
                )}
              </form>
            </div>
          </>
        )}
        {!hiddenButton && (
          <button className="backButton" onClick={backwards}>
            Back
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </section>
    </>
  );
}

export default NewProducts;
