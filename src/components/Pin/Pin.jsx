/* import React from "react";
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

export default Pin; */

import { React, useState, useEffect } from "react";
import "./Pin.css";
import { useNavigate } from "react-router-dom";

function Pin({ product  }) {
  const navigate = useNavigate();
  const navigation = (id) => {
    navigate(`/product/${id}`);
  };

  const [imgWidth, setImgWidth] = useState(null);
  const [imgHeight, setImgHeight] = useState(null);
  const [proportion, setProportion] = useState(1);

  useEffect(() => {
    if (product && product.imgUrl) {
      const img = new Image();
      img.src = product.imgUrl;

      img.addEventListener("load", () => {
        setImgWidth(img.naturalWidth);
        setImgHeight(img.naturalHeight);
        const imgProportion = imgHeight / imgWidth;
        setProportion(imgProportion);
      });

      return () => {
        img.removeEventListener("load", () => {});
      };
    }
  }, [product]);

  return (
    <div
      className={`pin linhasCard`}
      style={{ height: `${284 * proportion}px` }}
    >
      <img
        className="productPicSmall"
        src={product.imgUrl}
        alt="Linhas"
        onClick={() => {
          navigation(product._id);
        }}
      />

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
