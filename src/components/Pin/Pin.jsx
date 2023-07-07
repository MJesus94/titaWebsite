import React from "react";
import "./Pin.css";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Pin({ size, product }) {
  const navigate = useNavigate();
  const navigation = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <div className={`pin ${size} linhasCard`}>
      {size === "small" ? (
        <img
          className="productPicSmall"
          src={product.imgUrl}
          alt="Linhas"
          onClick={() => {
            navigation(product._id);
          }}
        />
      ) : size === "medium" ? (
        <img
          className="productPicMedium"
          src={product.imgUrl}
          alt="Linhas"
          onClick={() => {
            navigation(product._id);
          }}
        />
      ) : (
        <img
          className="productPicLarge"
          src={product.imgUrl}
          alt="Linhas"
          onClick={() => {
            navigation(product._id);
          }}
        />
      )}
      <div
        className="infoTag"
        onClick={() => {
          navigation(product._id);
        }}
      >
        <div>
          <span className="titleTag links">{product.title}</span>
        </div>
        <div>
          <span className="priceTag links">€ {product.price}</span>
        </div>
      </div>
    </div>
  );
}

export default Pin;
