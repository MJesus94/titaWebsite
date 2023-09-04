import { React} from "react";
import "./Pin.css";
import { useNavigate } from "react-router-dom";

function Pin({ product }) {
  const navigate = useNavigate();
  const navigation = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div
      className="box"
    >
      <img
        src={product.imgUrl}
        alt="Linhas"
        onClick={() => {
          navigation(product._id);
          product = [];
        }}
      />

      <div
        className="infoTag"
        onClick={() => {
          navigation(product._id);
          product = [];
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
