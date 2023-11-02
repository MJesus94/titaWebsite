import "./HomePage.css";
import "./HomePageM.css";
import "./HomePageL.css";
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
  const [imgWidth, setImgWidth] = useState(null);
  const [imgHeight, setImgHeight] = useState(null);

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

  const calculateImageDimensions = (url) => {
    const img = new Image();
    img.src = url;

    img.addEventListener("load", () => {
      setImgWidth(img.naturalWidth);
      setImgHeight(img.naturalHeight);
    });
  };

  const navigate = useNavigate();
  const navigation = (id) => {
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (allProducts[0]) {
      calculateImageDimensions(allProducts[0].imgUrl);
    }
    if (allProducts[1]) {
      calculateImageDimensions(allProducts[1].imgUrl);
    }
    if (allProducts[2]) {
      calculateImageDimensions(allProducts[2].imgUrl);
    }
    if (allProducts[3]) {
      calculateImageDimensions(allProducts[3].imgUrl);
    }
  }, [allProducts]);

  if (viewportWidth <= 425) {
    return (
      <>
        <section>
          <div className="containerCarousel">
            <Carousel slides={slides} />
          </div>
          <hr />
          <section className="promoCode">
            <div className="categoryCrochet">
              <h4>Novo por aquis</h4>
              <span>Ver coleções</span>
            </div>
            <div className="promoZone">
              {allProducts[0] && (
                <div
                  className="itemCard"
                  onClick={() => {
                    navigation(allProducts[0]._id);
                  }}
                >
                  <img
                    className="productImg"
                    src={allProducts[0].imgUrl}
                    alt={allProducts[0].title}
                  ></img>

                  <h2>{allProducts[0].title}</h2>
                  <h5>{allProducts[0].price}</h5>
                </div>
              )}
            </div>
          </section>
        </section>
        <footer>
          <ul>
            <li>
              <h2>Quem nós somos</h2>
            </li>
            <li>
              <h2>Contactos</h2>
            </li>
          </ul>
          <div className="copyrightDiv">
            <div>
              <h6>Developed by Miguel Jesus</h6>
              <h6>Copyright ©2023 Fonzie</h6>
            </div>
          </div>
        </footer>
      </>
    );
  } else if (viewportWidth <= 768) {
    return <></>;
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
              {allProducts[0] && (
                <div
                  className="itemCard box"
                  onClick={() => {
                    navigation(allProducts[0]._id);
                  }}
                >
                  <img
                    className={
                      imgWidth > imgHeight
                        ? "productImg moreWidth"
                        : imgWidth < imgHeight
                        ? "productImg moreHeight"
                        : "productImg moreWidth"
                    }
                    src={allProducts[0].imgUrl}
                    alt={allProducts[0].title}
                  ></img>

                  <h2>{allProducts[0].title}</h2>
                  <h5>{`${allProducts[0].price} €`}</h5>
                </div>
              )}
              {allProducts[1] && (
                <div
                  className="itemCard box"
                  onClick={() => {
                    navigation(allProducts[1]._id);
                  }}
                >
                  <img
                    className={
                      imgWidth > imgHeight
                        ? "productImg moreWidth"
                        : imgWidth < imgHeight
                        ? "productImg moreHeight"
                        : "productImg moreWidth"
                    }
                    src={allProducts[1].imgUrl}
                    alt={allProducts[1].title}
                  ></img>

                  <h2>{allProducts[1].title}</h2>
                  <h5>{`${allProducts[1].price} €`}</h5>
                </div>
              )}
              {allProducts[2] && (
                <div
                  className="itemCard box"
                  onClick={() => {
                    navigation(allProducts[2]._id);
                  }}
                >
                  <img
                    className={
                      imgWidth > imgHeight
                        ? "productImg moreWidth"
                        : imgWidth < imgHeight
                        ? "productImg moreHeight"
                        : "productImg moreWidth"
                    }
                    src={allProducts[2].imgUrl}
                    alt={allProducts[2].title}
                  ></img>
                  <h2>{allProducts[2].title}</h2>
                  <h5>{`${allProducts[2].price} €`}</h5>
                </div>
              )}
              {allProducts[3] && (
                <div
                  className="itemCard box"
                  onClick={() => {
                    navigation(allProducts[3]._id);
                  }}
                >
                  <img
                    className={
                      imgWidth > imgHeight
                        ? "productImg moreWidth"
                        : imgWidth < imgHeight
                        ? "productImg moreHeight"
                        : "productImg moreWidth"
                    }
                    src={allProducts[3].imgUrl}
                    alt={allProducts[3].title}
                  ></img>
                  <h2>{allProducts[3].title}</h2>
                  <h5>{`${allProducts[3].price} €`}</h5>
                </div>
              )}
            </div>
          </section>
        </section>
        <footer>
          <ul>
            <li>
              <h2>Quem nós somos</h2>
            </li>
            <li>
              <h2>Contactos</h2>
            </li>
          </ul>
          <div className="copyrightDiv">
            <div>
              <h6>Developed by Miguel Jesus</h6>
              <h6>Copyright ©2023 Fonzie</h6>
            </div>
          </div>
        </footer>
      </>
    );
  }
}

export default HomePage;
