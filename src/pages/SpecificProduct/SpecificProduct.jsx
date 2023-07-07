import "./SpecificProduct.css";

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import productService from "../../services/product.service";

function SpecificProduct() {
  const [oneProduct, setOneProduct] = useState(null);
  const [imgWidth, setImgWidth] = useState(null);
  const [imgHeight, setImgHeight] = useState(null);

  const { id } = useParams();

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
              <li className="currentProduct"> {oneProduct.title} </li>
            </ol>
          </div>

          <div className="productDisplay">
            <div className="productInformation">
              <div className="productDetails">
                <div>
                  <h1 className="productTitle">{oneProduct.title}</h1>
                </div>
                <div>
                  <span className="productPrice">€ {oneProduct.price}</span>
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
                <img className="imgUrlDisplay" src={oneProduct.imgUrl} alt={oneProduct.title} />
              ) : imgWidth === imgHeight ? (
                <img className="imgUrlDisplay" src={oneProduct.imgUrl} alt={oneProduct.title} />
              ) : (
                <img className="imgUrlDisplay" src={oneProduct.imgUrl} alt={oneProduct.title} />
              )}
            </div>
            <div></div>
          </div>
        </section>
      )}
    </>
  );
}

export default SpecificProduct;
