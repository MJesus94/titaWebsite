import "./HomePage.css";
import "./HomePageM.css";
import "./HomePageS.css";
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import productService from "../../services/product.service";

import Carousel from "../../components/Carousel/Carousel";

function HomePage() {
  const viewportWidth = window.innerWidth;

  const slides = [
    {
      url: "https://res.cloudinary.com/df3vc4osi/image/upload/v1683648593/titaWebsite/WhatsApp_Image_2023-05-09_at_16.32.24_cvbvgr.jpg",
      title: "Linhas",
    },
    {
      url: "https://res.cloudinary.com/df3vc4osi/image/upload/v1683725736/titaWebsite/anna-kolosyuk-D5nh6mCW52c-unsplash_wxxqrp.jpg",
      title: "Pincéis",
    },
    {
      url: "https://res.cloudinary.com/df3vc4osi/image/upload/v1683720591/titaWebsite/WhatsApp_Image_2023-05-10_at_12.38.30_eutwp0.jpg",
      title: "Panelas",
    },
  ];

  const [allProducts, setAllProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await productService.findAllProducts();
      const { productLinhas, productPanelas, productPinceis } = response.data;

      const combinedArray = [
        ...productLinhas,
        ...productPanelas,
        ...productPinceis,
      ];

      const combinedArrayWithDates = combinedArray.map((item) => ({
        ...item,
        createdAt: new Date(item.createdAt),
      }));

      combinedArrayWithDates.sort((a, b) => b.createdAt - a.createdAt);

      setAllProducts(combinedArrayWithDates);
    } catch (error) {}
  };

  const navigate = useNavigate();

  const handleSlideClick = (id) => {
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const calculateImageDimensions = (url) => {
    const img = new Image();
    img.src = url;

    return new Promise((resolve) => {
      img.addEventListener("load", () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      });
    });
  };

  useEffect(() => {
    const updateProductDimensions = async () => {
      const productsWithDimensions = await Promise.all(
        allProducts.map(async (product) => {
          const dimensions = await calculateImageDimensions(product.imgUrl);
          return { ...product, dimensions };
        })
      );

      setAllProducts(productsWithDimensions);
    };

    if (allProducts.length > 0) {
      updateProductDimensions();
    }
  }, [allProducts]);

  if (viewportWidth <= 769) {
    return (
      <>
        <section>
          <div className="containerCarousel">
            <Carousel slides={slides} />
          </div>
          <hr />
          <section className="promoCode">
            <div className="categoryCrochet">
              <h4>Novo por aqui</h4>
            </div>
            <div className="promoZone">
              {allProducts.slice(0, 4).map((product, index) => (
                <div
                  key={index}
                  className={
                    product.dimensions &&
                    product.dimensions.width < product.dimensions.height
                      ? "itemCard box addWidth"
                      : "itemCard box"
                  }
                  onClick={() => handleSlideClick(product._id)}
                >
                  <img
                    className={
                      product.dimensions &&
                      product.dimensions.width < product.dimensions.height
                        ? "productImg moreHeight centerImg"
                        : "productImg moreHeight"
                    }
                    src={product.imgUrl}
                    alt={product.title}
                  />
                  {product.dimensions &&
                  product.dimensions.width < product.dimensions.height ? (
                    <h3 className="mobileSTitle">{`${product.title}`}</h3>
                  ) : (
                    <h2 className="mobileSTitle">{`${product.title}`}</h2>
                  )}

                  <h4 className="mobileSPrice">{`${product.price} €`}</h4>
                </div>
              ))}
            </div>
          </section>
        </section>
      </>
    );
  } else {
    return (
      <>
        <section>
          <div className="containerCarousel">
            <Carousel slides={slides} />
          </div>
          <hr />

          <section className="mainContainer">
            <div className="mainTextDiv">
              <h2>Novo por aqui</h2>
            </div>
            <div className="thematicDiv">
              <img
                className="thematicPic"
                src="https://res.cloudinary.com/df3vc4osi/image/upload/v1683568960/titaWebsite/20230506_083326808_iOS_lce8d6.jpg"
                alt="Small Bag"
              ></img>
            </div>
            <div className="productPromo">
              {allProducts.slice(0, 4).map((product, index) => (
                <div
                  key={index}
                  className={
                    product.dimensions &&
                    product.dimensions.width < product.dimensions.height
                      ? "itemCard box addWidth"
                      : "itemCard box"
                  }
                  onClick={() => handleSlideClick(product._id)}
                >
                  <img
                    className={
                      product.dimensions &&
                      product.dimensions.width < product.dimensions.height
                        ? "productImg moreHeight centerImg"
                        : "productImg moreHeight"
                    }
                    src={product.imgUrl}
                    alt={product.title}
                  />
                  {product.dimensions &&
                  product.dimensions.width < product.dimensions.height ? (
                    <h3 className="mobileSTitle">{product.title}</h3>
                  ) : (
                    <h2 className="mobileSTitle">{product.title}</h2>
                  )}
                  <h5 className="mobileSPrice">{`${product.price} €`}</h5>
                </div>
              ))}
            </div>
          </section>
        </section>
      </>
    );
  }
}

export default HomePage;
