import "../Linhas/Linhas.css";
import Pin from "../../components/Pin/Pin";
import Loading from "../../components/Loading/Loading";
import productService from "../../services/product.service";

import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Panelas({ admin, showSuccessToast }) {
  const [panelasProducts, setPanelasProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllProducts = async () => {
    try {
      const response = await productService.findAllProducts();
      setPanelasProducts(response.data.productPanelas);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
                showSuccessToast={showSuccessToast}
              />
            ))}
      </div>
    </section>
  );
}

export default Panelas;
