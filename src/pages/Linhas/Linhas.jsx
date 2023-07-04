import "./Linhas.css";
import Pin from "../../components/Pin/Pin";
import productService from "../../services/product.service";

import { React, useState, useEffect } from "react";

function Linhas() {
  const [allProducts, setAllProducts] = useState("");

  const getAllProducts = async () => {
    try {
      const response = await productService.findAllProducts();
      let copy = [...response.data.ProductLinhas];
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
    <div className="pin-container">
      {allProducts &&
        allProducts.map((product) => {
          if (product.category === "Linhas") {
            return (
              <Pin size={product.cardSize} key={product.id} product={product} />
            );
          }
        })}
    </div>
  );
}

export default Linhas;
