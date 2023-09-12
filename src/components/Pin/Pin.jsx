import "./Pin.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import productService from "../../services/product.service";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal"; // Import the modal component

function Pin({
  product,
  admin,
  setAllProducts,
  setPinceisProducts,
  setPanelasProducts,
  showDeleteSuccessToast,
}) {
  const [editIsHovered, setEditIsHovered] = useState(false);
  const [deleteIsHovered, setDeleteIsHovered] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [productId, setProductId] = useState(false);

  const deleteProduct = async (id) => {
    try {
      // Show the confirmation modal
      setShowConfirmationModal(true);
      setProductId(id);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      console.log("Deleting product with ID:", setAllProducts);
      const response = await productService.deleteProduct(product._id);
      console.log("Response from deleteProduct API:", response);
      if (response.status === 200) {
        if (product.category === "Linhas") {
          setAllProducts((prevProducts) =>
            prevProducts.filter((product) => product._id !== productId)
          );
          showDeleteSuccessToast();
        } else if (product.category === "Pincéis") {
          setPinceisProducts((prevProducts) =>
            prevProducts.filter((product) => product._id !== productId)
          );
          showDeleteSuccessToast();
        } else {
          setPanelasProducts((prevProducts) =>
            prevProducts.filter((product) => product._id !== productId)
          );
          showDeleteSuccessToast();
        }
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }

    // Close the confirmation modal
    setShowConfirmationModal(false);
  };

  const toggleEditHover = () => {
    setEditIsHovered(!editIsHovered);
  };

  const toggleDeleteHover = () => {
    setDeleteIsHovered(!deleteIsHovered);
  };

  const hoverEditSrc =
    "https://res.cloudinary.com/df3vc4osi/image/upload/v1693991292/titaWebsite/Edit_icon_2_f4cjai.jpg";
  const normalEditSrc =
    "https://res.cloudinary.com/df3vc4osi/image/upload/v1693991291/titaWebsite/Screenshot_1_xwwom0.jpg";
  const normalDeleteSrc =
    "https://res.cloudinary.com/df3vc4osi/image/upload/v1693991292/titaWebsite/trash_bin_rkhtyp.jpg";
  const hoverDeleteSrc =
    "https://res.cloudinary.com/df3vc4osi/image/upload/v1693991291/titaWebsite/trash_bin_2_qzd5bu.jpg";

  const navigate = useNavigate();
  const navigation = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      <div className="box">
        {admin && (
          <div className="configDiv">
            <img
              className="editButton"
              onMouseEnter={toggleEditHover}
              onMouseLeave={toggleEditHover}
              onClick={() => {
                navigate(`/editProduct/${product._id}`);
              }}
              src={editIsHovered ? normalEditSrc : hoverEditSrc}
              alt="edit button"
            />
            <img
              className="deleteButton"
              onMouseEnter={toggleDeleteHover}
              onMouseLeave={toggleDeleteHover}
              onClick={() => {
                // Show the confirmation modal when delete is clicked
                deleteProduct(product._id);
              }}
              src={deleteIsHovered ? normalDeleteSrc : hoverDeleteSrc}
              alt="delete button"
            />
          </div>
        )}
        <img
          className="productImage"
          src={product.imgUrl}
          alt="Linhas"
          onClick={() => {
            navigation(product._id);
          }}
        />

        <div
          className="infoTag"
          onClick={() => {
            navigation(product._id);
          }}
        >
          <div>
            <span className="titleTag links">{product.title}</span>
          </div>
          <div>
            <span className="priceTag links">€ {product.price}</span>
          </div>
        </div>
      </div>

      {/* Render the confirmation modal if showConfirmationModal is true */}
      {showConfirmationModal && (
        <ConfirmationModal
          onCancel={() => setShowConfirmationModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}

export default Pin;
