import "./HomePage.css";
import "./HomePageM.css";
import "./HomePageL.css";
import React from "react";


import Carousel from "../../components/Carousel/Carousel";

function HomePage({ hiddenS, hiddenL, toggleHiddenL, toggleHiddenS, toggleHiddenH }) {
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

  const crochet = [
    {
      url: "https://res.cloudinary.com/df3vc4osi/image/upload/v1683568959/titaWebsite/20230506_083320189_iOS_oabnw8.jpg",
      title: "O que quiser",
      price: "€ 10.00",
    },
    {
      url: "https://res.cloudinary.com/df3vc4osi/image/upload/v1683568960/titaWebsite/20230506_083326808_iOS_lce8d6.jpg",
      title: "O que quiser",
      price: "€ 10.00",
    },
    {
      url: "https://res.cloudinary.com/df3vc4osi/image/upload/v1683568959/titaWebsite/20230506_083350950_iOS_utfuxm.jpg",
      title: "O que quiser",
      price: "€ 10.00",
    },
  ];

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
              <h4>Novo por aqui</h4>
              <span>Ver coleções</span>
            </div>
            <div className="promoZone">
              {crochet.map((crochet, crochetIndex) => (
                <div className="itemCard" key={crochetIndex}>
                  <img
                    className="productImg"
                    src={crochet.url}
                    alt={crochet.title}
                  ></img>

                  <h2>{crochet.title}</h2>
                  <h5>{crochet.price}</h5>
                </div>
              ))}
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
  }  else if (viewportWidth <= 768) {
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
            {crochet.map((crochet, crochetIndex) => (
                <div className="productCard" key={crochetIndex}>
                  <img
                    className="productPic"
                    src={crochet.url}
                    alt={crochet.title}
                  ></img>

                  <h6>{crochet.title}</h6>
                  <h6>{crochet.price}</h6>
                </div>
              ))}
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
