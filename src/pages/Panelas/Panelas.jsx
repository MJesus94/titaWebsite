import "../Linhas/Linhas.css";
import Pin from "../../components/Pin/Pin";
import productService from "../../services/product.service";

import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Panelas({ admin, showDeleteSuccessToast }) {
  const [panelasProducts, setPanelasProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await productService.findAllProducts();
      let copy = [...response.data.productPanelas];
      let currentIndex = copy.length;
      while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        let temporaryValue = copy[currentIndex];
        copy[currentIndex] = copy[randomIndex];
        copy[randomIndex] = temporaryValue;
      }
      setPanelasProducts(copy);
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
            <span className="currentProduct">Panelas</span>
          </li>
        </ol>
      </div>

      <div className="pinterestLayout">
        {panelasProducts &&
          panelasProducts
            .filter((product) => product.category === "Panelas")
            .map((product) => (
              <Pin
                key={product._id}
                product={product}
                admin={admin}
                setPanelasProducts={setPanelasProducts}
                showDeleteSuccessToast={showDeleteSuccessToast}
              />
            ))}
      </div>
    </section>
  );
}

export default Panelas;
