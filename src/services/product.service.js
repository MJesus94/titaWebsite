import axios from "axios";

class ProductService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || "http://localhost:5005",
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST / Add a product to the website

  createProduct = async (requestBody) => {
    return this.api.post("/api/product", requestBody);
  };

  // POST / Add imageFile to cloudinary and return file URL

  uploadPic = async (file) => {
    const response = await this.api.post("/api/upload", file);
    return response.data;
  };

  // GET / get all products

  findAllProducts = async () => {
    return this.api.get("/api/product");
  };

  // GET / get one specific product

  findOneProduct = async (id) => {
    return this.api.get(`/api/product/${id}`);
  };

  // PUT / edit one specific product

  editProduct = async (id, requestBody) => {
    return this.api.put(`/api/editProduct/${id}`, requestBody);
  };

  // DELETE / Delete a specific product from  the DB

  deleteProduct = async (id) => {
    return this.api.delete(`/api/product/${id}`);
  };

  // PUT  / Add the product to the favourites

  addAsFavourite = async (id) => {
    return this.api.put(`/api/favourites/${id}`);
  };

  // DELETE / Remove product from the favourites

  removeFromFavourites = async (id) => {
    return this.api.delete(`/api/deleteFavourites/${id}`);
  };

  // GET / Check if the product is a favourite

  checkFavourite = async (id) => {
    return this.api.get(`/api/checkFavourite/${id}`);
  };
}

// Create one instance of the service
const productService = new ProductService();

export default productService;
