import "./NewProducts.css";
import { colourOptions } from "../../Assets/Data";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import React, { useState } from "react";

import productService from "../../services/product.service";

function NewProducts() {
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Linhas");
  const [price, setPrice] = useState("");
  const [cardSize, setCardSize] = useState("small");
  const [selectedColors, setSelectedColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [missingFields, setMissingFields] = useState([]);

  const animatedComponents = makeAnimated();

  const handleTitle = (e) => setTitle(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleCategory = (e) => setCategory(e.target.value);
  const handlePrice = (e) => setPrice(e.target.value);
  const handleCardSize = (e) => setCardSize(e.target.value);
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

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello");
    const body = {
      title,
      imgUrl,
      description,
      category,
      price,
      cardSize,
      color: selectedColors.map((color) => color.value),
    };

    const requiredFields = [
      "title",
      "imgUrl",
      "category",
      "price",
      "cardSize",
      "color",
    ];

    const missing = requiredFields.filter((field) => !body[field]);
    if (selectedColors.length === 0) {
      missing.push("color");
    }

    if (missing.length > 0) {
      setMissingFields(missing);
      console.log(missingFields);
    }

    try {
      await productService.createProduct(body);
      navigate(`/profilePage`);
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

  return (
    <>
      <section className="addProductSection">
        <div className="formDiv">
          <div className="formTitle">
            <h4 className="titlePost">Add new Product</h4>
          </div>
          <form className="addProductForm" onSubmit={handleSubmit}>
            <label
              className={`addProductLabel ${
                missingFields.includes("title") && "errorLabel"
              }`}
              htmlFor="text"
            >
              Title:
            </label>
            <input
              className="addProductInput"
              type="text"
              name="email"
              value={title}
              onChange={handleTitle}
            />
            <label className="addProductLabel" htmlFor="description">
              Description:
            </label>
            <textarea
              className="addProductInput"
              rows={4}
              cols={40}
              name="description"
              value={description}
              onChange={handleDescription}
            />
            <label
              className={`addProductLabel ${
                missingFields.includes("price") && "errorLabel"
              }`}
              htmlFor="price"
            >
              Price:
            </label>
            <input
              className="addProductInput"
              type="number"
              name="price"
              value={price}
              onChange={handlePrice}
            />
            <label
              className={`addProductLabel ${
                missingFields.includes("color") && "errorLabel"
              }`}
              htmlFor="color"
            >
              Color:
            </label>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              name="color"
              options={colourOptions}
              onChange={handleSelectedColors}
              value={selectedColors}
            />
            <label className="addProductLabel" htmlFor="cardSize">
              Card Size:
            </label>
            <select
              className="addProductInput"
              name="cardSize"
              value={cardSize}
              onChange={handleCardSize}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
            <label className="addProductLabel" htmlFor="category">
              Category:
            </label>
            <select
              className="addProductInput"
              name="category"
              value={category}
              onChange={handleCategory}
            >
              <option value="Linhas">Linhas</option>
              <option value="Pincéis">Pincéis</option>
              <option value="Panelas">Panelas</option>
            </select>
            <label className="addProductLabel" htmlFor="file">
              File:
            </label>
            <input
              type="file"
              onChange={(e) => handleFileUpload(e)}
              className="addProductInput"
            />

            {!loading ? (
              <Button
                variant="warning"
                className="disabledButton addProductLabel"
                size="md"
                type="submit"
              >
                Submit
              </Button>
            ) : (
              <Button
                variant="warning"
                className="disabledButton addProductLabel"
                size="md"
                disabled
              >
                Submit
              </Button>
            )}
          </form>
        </div>
        {error && <p className="error">{error}</p>}
      </section>
    </>
  );
}

export default NewProducts;
