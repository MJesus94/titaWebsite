import "../Linhas/Linhas.css";
import Pin from "../../components/Pin/Pin";
import productService from "../../services/product.service";

import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Pinceis() {
  const [pinceisProducts, setPinceisProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await productService.findAllProducts();
      let copy = [...response.data.productPinceis];
      let currentIndex = copy.length;
      while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        let temporaryValue = copy[currentIndex];
        copy[currentIndex] = copy[randomIndex];
        copy[randomIndex] = temporaryValue;
      }
      setPinceisProducts(copy);
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
            <span className="currentProduct">Pincéis</span>
          </li>
        </ol>
      </div>

      <div className="pinterestLayout">
        {pinceisProducts &&
          pinceisProducts
            .filter((product) => product.category === "Pincéis")
            .map((product) => <Pin key={product.id} product={product} />)}
      </div>
    </section>
  );
}

export default Pinceis;
