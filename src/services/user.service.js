import axios from "axios";

class UserService {
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

  // GET / get current user

  getCurrentUser = async () => {
    return this.api.get("/api/getUser");
  };

  // GET / get a specific user

  findUser = async (id) => {
    return this.api.get(`/api/getUser/${id}`);
  };

  // PUT / edit user information 

  editUser = async (requestBody) => {
    return this.api.put('/api/editUser', requestBody)
  }
}

// Create one instance of the service
const userService = new UserService();

export default userService;
