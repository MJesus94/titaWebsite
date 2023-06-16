import React from "react";
import "./Pin.css";

function Pin({ size, product }) {
  return (
    <div className={`pin ${size} linhasCard`}>
      {size === "small" ? (
        <img className="productPicSmall" src={product.imgUrl} alt="Linhas" />
      ) : size === "medium" ? (
        <img className="productPicMedium" src={product.imgUrl} alt="Linhas" />
      ) : (
        <img className="productPicLarge" src={product.imgUrl} alt="Linhas" />
      )}
      <div className="infoTag">
        <div>
          <span className="titleTag">{product.title}</span>
        </div>
        <div>
          <span className="priceTag">€ {product.price}</span>
        </div>
      </div>
    </div>
  );
}

export default Pin;
