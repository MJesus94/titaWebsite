import "../Linhas/Linhas.css";
import Pin from "../../components/Pin/Pin";
import Loading from "../../components/Loading/Loading";
import productService from "../../services/product.service";

import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Pinceis({ admin, showSuccessToast, showErrorToast }) {
  const [pinceisProducts, setPinceisProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllProducts = async () => {
    try {
      const response = await productService.findAllProducts();
      setPinceisProducts(response.data.productPinceis);
      setLoading(false);
      if (!response.data.productPinceis) {
        showErrorToast("Pedido esgotou o tempo, por favor atualize a página");
      }
    } catch (error) {
      setLoading(false);
      showErrorToast("An error occurred. Please refresh the page.");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <section className="main-section">
      {loading && <Loading />}
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
            .map((product) => (
              <Pin
                key={product._id}
                product={product}
                admin={admin}
                setPinceisProducts={setPinceisProducts}
                showSuccessToast={showSuccessToast}
              />
            ))}
      </div>
    </section>
  );
}

export default Pinceis;
