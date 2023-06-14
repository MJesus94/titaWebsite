import "./NewProducts.css";
import productService from "../../services/product.service";

import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import React, { useState } from "react";

function NewProducts() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [cardSize, setCardSize] = useState("small"); // Default value is set to "small"
  const [loading, setLoading] = useState(true);

  const handleTitle = (e) => setTitle(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handlePrice = (e) => setPrice(e.target.value);
  const handleCardSize = (e) => setCardSize(e.target.value);
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
    const body = { title, description, price, imgUrl };
    try {
      await productService.createProduct(body);
      navigate(`/profilePage`);
    } catch (error) {
      console.log(error);
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
            <label className="addProductLabel" htmlFor="email">
              Title:
            </label>
            <input
              className="addProductInput"
              type="email"
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
            <label className="addProductLabel" htmlFor="price">
              Price:
            </label>
            <input
              className="addProductInput"
              type="number"
              name="price"
              value={price}
              onChange={handlePrice}
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
            <input
              type="file"
              onChange={(e) => handleFileUpload(e)}
              className="fileUpload"
            />

            {!loading ? (
              <Button variant="warning" className="disabledButton" size="md">
                Submit
              </Button>
            ) : (
              <Button
                variant="warning"
                className="disabledButton"
                size="md"
                disabled
              >
                Submit
              </Button>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

export default NewProducts;
