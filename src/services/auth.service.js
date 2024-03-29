import axios from "axios";

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || "http://localhost:5005",
    });

    // Automatically set JWT token on the request headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  /* login = (requestBody) => {
    return this.api.post("/auth/login", requestBody);
    // same as
    // return axios.post("http://localhost:5005/auth/login");
  }; */
  login = (requestBody) => {
    return this.api.post("/auth/login", requestBody);
  };

  refreshToken = (refreshToken) => {
    return this.api.post("/auth/refresh-token", { refreshToken });
  };

  signup = (requestBody) => {
    return this.api.post("/auth/signup", requestBody);
    // same as
    // return axios.post("http://localhost:5005/auth/singup");
  };

  verify = () => {
    return this.api.get("/auth/verify");
    // same as
    // return axios.post("http://localhost:5005/auth/verify");
  };

  emailConfirmation = (confirmationCode) => {
    return this.api.get(`/auth/confirm-email/${confirmationCode}`);
  };

  sendPasswordResetCode = (requestBody) => {
    return this.api.post("/auth/sendPasswordResetCode", requestBody);
  };

  passwordResetCode = (requestBody) => {
    return this.api.post("/auth/passwordResetCode", requestBody);
  };

  newPassword = (requestBody) => {
    return this.api.put("/auth/newPassword", requestBody);
  };
}

// Create one instance (object) of the service
const authService = new AuthService();

export default authService;
