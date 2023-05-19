import React from "react";
import "./Pin.css";

function Pin(props) {
  
  return (
    <div style={{ ...styles.pin, ...styles[props.size] }} className="linhasCard">
      {props.size === "small" ? (
        <img
          className="productPicSmall"
          src="https://res.cloudinary.com/df3vc4osi/image/upload/v1683648593/titaWebsite/WhatsApp_Image_2023-05-09_at_16.32.24_cvbvgr.jpg"
          alt="Linhas"
        />
      ) : props.size === "medium" ? (
        <img
          className="productPicMedium"
          src="https://res.cloudinary.com/df3vc4osi/image/upload/v1683648593/titaWebsite/WhatsApp_Image_2023-05-09_at_16.32.24_cvbvgr.jpg"
          alt="Linhas"
        />
      ) : (
        <img
          className="productPicLarge"
          src="https://res.cloudinary.com/df3vc4osi/image/upload/v1683648593/titaWebsite/WhatsApp_Image_2023-05-09_at_16.32.24_cvbvgr.jpg"
          alt="Linhas"
        />
      )}
      <div className="infoTag">
        <span>Linhas</span> <span>€ 10.50</span>
      </div>
    </div>
  );
}

const styles = {
  pin: {
    margin: "15px 10px",
    padding: 0,
    borderRadius: "16px",
    backgroundColor: "lightGrey",
  },
  small: {
    gridRowEnd: "span 26",
  },
  medium: {
    gridRowEnd: "span 33",
  },
  large: {
    gridRowEnd: "span 45",
  },
};
export default Pin;
