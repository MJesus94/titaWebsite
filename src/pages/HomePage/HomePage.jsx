import "./HomePage.css";
import React from "react";
import Carousel from "../../components/Carousel/Carousel";

function HomePage() {
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
      url: "https://res.cloudinary.com/df3vc4osi/image/upload/v1683721650/titaWebsite/481d85ea8b291d27e85d38b6e07f1c1d_v6g3di.jpg",
      title: "Pincéis",
    },
    {
      url: "https://res.cloudinary.com/df3vc4osi/image/upload/v1683720591/titaWebsite/WhatsApp_Image_2023-05-10_at_12.38.30_eutwp0.jpg",
      title: "Panelas",
    },
  ];

  return (
    <section>
      <div className="containerCarousel">
        <Carousel slides={slides} />
      </div>
    </section>
  );
}

export default HomePage;
