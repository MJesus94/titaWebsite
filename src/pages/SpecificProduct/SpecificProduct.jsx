import "./SpecificProduct.css";

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import productService from "../../services/product.service";
import userService from "../../services/user.service";

function SpecificProduct({ showSuccessToast, showErrorToast }) {
  const [oneProduct, setOneProduct] = useState(null);
  const [imgWidth, setImgWidth] = useState(null);
  const [imgHeight, setImgHeight] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [specsVisible, setSpecsVisible] = useState(false);
  const [additionalInfoVisible, setAdditionalInfoVisible] = useState(false);
  const [user, setCurrentUser] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const viewportWidth = window.innerWidth;
  console.log(viewportWidth);

  const { id } = useParams();

  const getOneProduct = async () => {
    try {
      const response = await productService.findOneProduct(id);
      setOneProduct(response.data);
    } catch (error) {}
  };

  const currentUser = async () => {
    try {
      const response = await userService.getCurrentUser();
      setCurrentUser(response.data);
      console.log(response.data);
    } catch (error) {
      setErrorMessage("Error getting current user");
    }
  };

  const addProductAsFavorite = async () => {
    try {
      if (!user) {
        showErrorToast("Tem que efetuar o login primeiro");
      } else {
        const response = await productService.addAsFavourite(oneProduct._id);
        showSuccessToast("Produto adicionado à wishlist com sucesso");
        setIsFavorite(true);
      }
    } catch (error) {
      showErrorToast("Failed to add as favourite");
    }
  };

  const removeProductAsFavorite = async () => {
    try {
      await productService.removeFromFavourites(oneProduct._id);
      showSuccessToast("Produto removido da sua Wishlist");
      setIsFavorite(false);
    } catch (error) {
      setErrorMessage("Failed to remove from favorites");
    }
  };

  const turnSpecsAsVisible = () => {
    setSpecsVisible(!specsVisible);
  };

  const turnAdditionalInfoVisible = () => {
    setAdditionalInfoVisible(!additionalInfoVisible);
  };

  const checkFavorite = () => {
    if (user && user.favourites) {
      const isInArray = user.favourites.includes(oneProduct._id);
      setIsFavorite(isInArray);
    }
  };

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
    getOneProduct();
    currentUser();
  }, []);

  useEffect(() => {
    if (oneProduct && user) {
      checkFavorite();
    }
  }, [oneProduct, user]);

  useEffect(() => {
    const updateProductDimensions = async () => {
      if (oneProduct && oneProduct.imgUrl) {
        const dimensions = await calculateImageDimensions(oneProduct.imgUrl);

        if (oneProduct.dimensions) {
          if (
            dimensions.width !== oneProduct.dimensions.width ||
            dimensions.height !== oneProduct.dimensions.height
          ) {
            setOneProduct((prevProduct) => ({ ...prevProduct, dimensions }));
          }
        } else {
          setOneProduct((prevProduct) => ({ ...prevProduct, dimensions }));
        }
      }
    };

    updateProductDimensions();
  }, [oneProduct]);

  if (viewportWidth <= 769) {
    return (
      <>
        {oneProduct && (
          <section className="main-section">
            <div className="infoContainer">
              <ol className="routePath">
                <li>
                  {" "}
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
                  {" "}
                  <Link
                    to={
                      oneProduct.category === "Pincéis"
                        ? "/Pinceis"
                        : `/${oneProduct.category}`
                    }
                    className="link"
                  >
                    {" "}
                    <span className="categorySpan">
                      {oneProduct.category}
                    </span>{" "}
                    <img
                      src="https://res.cloudinary.com/df3vc4osi/image/upload/v1688657721/titaWebsite/images-removebg-preview_q3tb4e.png"
                      alt="right caret"
                      className="icon-caret"
                    />
                  </Link>
                </li>
                <li className="currentProduct"> {oneProduct.title} </li>
              </ol>
            </div>
            <div className="productDisplay productMobileCard">
              <div className="productInformation">
                <div className="productDetails">
                  <div>
                    <h1 className="productTitle">{oneProduct.title}</h1>
                  </div>
                </div>
                <div className="imgUrlDisplayDiv">
                  <img
                    className="imgUrlDisplayWidth"
                    src={oneProduct.imgUrl}
                    alt={oneProduct.title}
                  />
                </div>
                <div className="buttonsDiv">
                  {/* <button className="buttonAddToCart">
                  <span>ADICIONAR AO CARRINHO</span>
                </button> */}
                  <div className="priceFavDiv">
                    <span className="productPrice">€ {oneProduct.price}</span>
                    {isFavorite ? (
                      <button
                        className="buttonAddToFavourites"
                        onClick={removeProductAsFavorite}
                      >
                        <img
                          className="favouriteHeart"
                          src="https://res.cloudinary.com/df3vc4osi/image/upload/v1698340755/titaWebsite/fullheart_icon_qq8kpw.png"
                          alt="heart"
                        />{" "}
                        <span className="favoritesSpan">
                          REMOVE FROM WISHLIST
                        </span>
                      </button>
                    ) : (
                      <button
                        className="buttonAddToFavourites"
                        onClick={addProductAsFavorite}
                      >
                        <img
                          className="favouriteHeart"
                          src="https://res.cloudinary.com/df3vc4osi/image/upload/v1688747630/titaWebsite/images__1_-removebg-preview_yayvcy.png"
                          alt="heart"
                        />{" "}
                        ADD TO WISHLIST
                      </button>
                    )}
                  </div>
                  <div className="prodSpecMainDiv">
                    <div
                      className="prodSpec"
                      onClick={() => {
                        turnSpecsAsVisible();
                      }}
                    >
                      <span className="specSpan">
                        Características do Produto
                      </span>
                      {!specsVisible ? (
                        <img
                          className="specArrow"
                          src="https://res.cloudinary.com/df3vc4osi/image/upload/v1699366743/titaWebsite/right_arrow_ymcged.png"
                          alt="right arrow"
                        />
                      ) : (
                        <img
                          className="specArrow"
                          src="https://res.cloudinary.com/df3vc4osi/image/upload/v1699382307/titaWebsite/arrow_up-removebg-preview_frihnb.png"
                          alt="arrow up"
                        />
                      )}
                    </div>
                    {specsVisible && (
                      <div className="descriptionDiv">
                        <ul className="ulDescription">
                          <li>{oneProduct.description}</li>
                          <li>
                            <span className="corSpan">Cor:</span>
                            {oneProduct.color.map((color, index) =>
                              index === oneProduct.color.length - 1 ? (
                                <span key={index}>{color}</span>
                              ) : (
                                <span key={index}>{`${color}, `}</span>
                              )
                            )}
                          </li>
                        </ul>
                      </div>
                    )}
                    {oneProduct.category === "Panelas" ? (
                      <>
                        <div
                          className="prodSpec"
                          onClick={() => {
                            turnAdditionalInfoVisible();
                          }}
                        >
                          <span className="specSpan">Informação Adicional</span>
                          {!additionalInfoVisible ? (
                            <img
                              className="specArrow"
                              src="https://res.cloudinary.com/df3vc4osi/image/upload/v1699366743/titaWebsite/right_arrow_ymcged.png"
                              alt="right arrow"
                            />
                          ) : (
                            <img
                              className="specArrow"
                              src="https://res.cloudinary.com/df3vc4osi/image/upload/v1699382307/titaWebsite/arrow_up-removebg-preview_frihnb.png"
                              alt="arrow up"
                            />
                          )}
                        </div>
                        {additionalInfoVisible && (
                          <div className="addInfoDivDisplay">
                            <div className="additionalInfoDisplay">
                              <div className="titleAddInfoDisplay">
                                Formato:
                              </div>
                              <div className="InfoAttribute">
                                {oneProduct.formato}
                              </div>
                            </div>
                            <div className="additionalInfoDisplay">
                              <div className="titleAddInfoDisplay">Massa:</div>
                              <div className="InfoAttribute">
                                {oneProduct.massa}
                              </div>
                            </div>
                            <div className="additionalInfoDisplay">
                              <div className="titleAddInfoDisplay">
                                Cobertura:
                              </div>
                              <div className="InfoAttribute">
                                {oneProduct.cobertura}
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    ) : oneProduct.category === "Pincéis" ? (
                      <>
                        <div
                          className="prodSpec"
                          onClick={() => {
                            turnAdditionalInfoVisible();
                          }}
                        >
                          <span className="specSpan">Informação Adicional</span>
                          {!additionalInfoVisible ? (
                            <img
                              className="specArrow"
                              src="https://res.cloudinary.com/df3vc4osi/image/upload/v1699366743/titaWebsite/right_arrow_ymcged.png"
                              alt="right arrow"
                            />
                          ) : (
                            <img
                              className="specArrow"
                              src="https://res.cloudinary.com/df3vc4osi/image/upload/v1699382307/titaWebsite/arrow_up-removebg-preview_frihnb.png"
                              alt="arrow up"
                            />
                          )}
                        </div>
                        {additionalInfoVisible && (
                          <div className="addInfoDivDisplay">
                            <div className="additionalInfoDisplay">
                              <div className="titleAddInfoDisplay">
                                Tema:
                              </div>
                              <div className="InfoAttribute">
                                {oneProduct.tema}
                              </div>
                            </div>
                            <div className="additionalInfoDisplay">
                              <div className="titleAddInfoDisplay">Formato:</div>
                              <div className="InfoAttribute">
                                {oneProduct.formato}
                              </div>
                            </div>
                            <div className="additionalInfoDisplay">
                              <div className="titleAddInfoDisplay">
                                Tamanho:
                              </div>
                              <div className="InfoAttribute">
                                {oneProduct.tamanho}
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </>
    );
  } else {
    return (
      <>
        {oneProduct && (
          <section className="main-section">
            <div className="infoContainer">
              <ol className="routePath">
                <li>
                  {" "}
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
                  {" "}
                  <Link
                    to={
                      oneProduct.category === "Pincéis"
                        ? "/Pinceis"
                        : `/${oneProduct.category}`
                    }
                    className="link"
                  >
                    {" "}
                    <span className="categorySpan">
                      {oneProduct.category}
                    </span>{" "}
                    <img
                      src="https://res.cloudinary.com/df3vc4osi/image/upload/v1688657721/titaWebsite/images-removebg-preview_q3tb4e.png"
                      alt="right caret"
                      className="icon-caret"
                    />
                  </Link>
                </li>
                <li className="currentProduct"> {oneProduct.title} </li>
              </ol>
            </div>

            <div className="productDisplay">
              <div className="productInformation">
                <div className="productDetails">
                  <div>
                    <h1 className="productTitle">{oneProduct.title}</h1>
                  </div>
                  <div>
                    <span className="productPrice">€ {oneProduct.price}</span>
                  </div>
                </div>
                <div className="buttonsDiv">
                  {/* <button className="buttonAddToCart">
                    <span>ADICIONAR AO CARRINHO</span>
                  </button> */}
                  {isFavorite ? (
                    <button
                      className="buttonAddToFavourites"
                      onClick={removeProductAsFavorite}
                    >
                      <img
                        className="favouriteHeart"
                        src="https://res.cloudinary.com/df3vc4osi/image/upload/v1698340755/titaWebsite/fullheart_icon_qq8kpw.png"
                        alt="heart"
                      />{" "}
                      REMOVE FROM WISHLIST
                    </button>
                  ) : (
                    <button
                      className="buttonAddToFavourites"
                      onClick={addProductAsFavorite}
                    >
                      <img
                        className="favouriteHeart"
                        src="https://res.cloudinary.com/df3vc4osi/image/upload/v1688747630/titaWebsite/images__1_-removebg-preview_yayvcy.png"
                        alt="heart"
                      />{" "}
                      ADD TO WISHLIST
                    </button>
                  )}
                </div>
              </div>
              <div className="imgUrlDisplayDiv">
                {" "}
                {imgWidth > imgHeight ? (
                  <img
                    className="imgUrlDisplay"
                    src={oneProduct.imgUrl}
                    alt={oneProduct.title}
                  />
                ) : imgWidth === imgHeight ? (
                  <img
                    className="imgUrlDisplay"
                    src={oneProduct.imgUrl}
                    alt={oneProduct.title}
                  />
                ) : (
                  <img
                    className="imgUrlDisplay"
                    src={oneProduct.imgUrl}
                    alt={oneProduct.title}
                  />
                )}
              </div>
              <div className="descriptionDiv">
                <ul className="ulDescription">
                  <li>{oneProduct.description}</li>
                  <li>
                    <span className="corSpan">Cor:</span>
                    {oneProduct.color.map((color, index) =>
                      index === oneProduct.color.length - 1 ? (
                        <span key={index}>{color}</span>
                      ) : (
                        <span key={index}>{`${color}, `}</span>
                      )
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </>
    );
  }
}

export default SpecificProduct;
