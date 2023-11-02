import "./Linhas.css";
import Pin from "../../components/Pin/Pin";
import productService from "../../services/product.service";

import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Linhas({ admin, showSuccessToast }) {
  const [allProducts, setAllProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await productService.findAllProducts();
      console.log(response.data.productLinhas);
      setAllProducts(response.data.productLinhas);
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
            <span className="currentProduct">Linhas</span>
          </li>
        </ol>
      </div>

      <div className="pinterestLayout">
        {allProducts &&
          allProducts
            .filter((product) => product.category === "Linhas")
            .map((product) => (
              <Pin
                key={product._id}
                product={product}
                admin={admin}
                setAllProducts={setAllProducts}
                showSuccessToast={showSuccessToast}
              />
            ))}
      </div>
    </section>
  );
}

export default Linhas;
