import "./HomePage.css";
import "./HomePageM.css";
import React from "react";
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
  if (viewportWidth <= 375) {
    return (
      <>
        <section>
          <div className="containerCarousel">
            <Carousel slides={slides} />
          </div>
          <hr />

          <section className="promoCode">
            <div className="categoryCrochet">
              <h4>Crochet para todos os gostos</h4>
              <span>Ver coleção</span>
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
  } else if (viewportWidth <= 420) {
    return <></>;
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
              <h2>Crochet para todos os gostos</h2>
            </div>
            <div className="thematicDiv">
              <img
                className="thematicPic"
                src="https://res.cloudinary.com/df3vc4osi/image/upload/v1683568960/titaWebsite/20230506_083326808_iOS_lce8d6.jpg"
                alt="Small Bag"
              ></img>
            </div>

            <div className="productPromo">
              <div className="productCard">
                <img
                  className="productPic"
                  src="https://res.cloudinary.com/df3vc4osi/image/upload/v1683568959/titaWebsite/20230506_083320189_iOS_oabnw8.jpg"
                  alt="Basket"
                ></img>
                <h6>Basket</h6>
                <h6>€ 10.00</h6>
              </div>
              <div className="productCard">
                <img
                  className="productPic"
                  src="https://res.cloudinary.com/df3vc4osi/image/upload/v1683568959/titaWebsite/20230506_083320189_iOS_oabnw8.jpg"
                  alt="Basket"
                ></img>
                <h6>Basket</h6>
                <h6>€ 10.00</h6>
              </div>
              <div className="productCard">
                <img
                  className="productPic"
                  src="https://res.cloudinary.com/df3vc4osi/image/upload/v1683568959/titaWebsite/20230506_083320189_iOS_oabnw8.jpg"
                  alt="Basket"
                ></img>
                <h6>Basket</h6>
                <h6>€ 10.00</h6>
              </div>
              <div className="buttonCollection">
                <h4>Ver Coleção</h4>
              </div>
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
