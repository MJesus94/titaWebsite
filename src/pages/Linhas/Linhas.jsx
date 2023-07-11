import "./Linhas.css";
import Pin from "../../components/Pin/Pin";
import productService from "../../services/product.service";

import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Linhas() {
  const [allProducts, setAllProducts] = useState("");
  const { Linhas } = useParams();

  const getAllProducts = async () => {
    try {
      const response = await productService.findAllProducts();
      let copy = [...response.data.productLinhas];
      let currentIndex = copy.length;
      while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        let temporaryValue = copy[currentIndex];
        copy[currentIndex] = copy[randomIndex];
        copy[randomIndex] = temporaryValue;
      }
      setAllProducts(copy);
    } catch (error) {}
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <section className="main-section">
      <div className="infoContainer">
        <ol className="routePath">
          <li>
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
            <span className="currentProduct">{Linhas}</span>
          </li>
        </ol>
      </div>

      <div className="wrapper">
        <div className="columns">
          {allProducts &&
            allProducts.map((product) => {
              return (
                <Pin
                  size={product.cardSize}
                  key={product.id}
                  product={product}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default Linhas;
