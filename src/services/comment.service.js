import axios from "axios";

class CommentService {
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

  // POST / Create a comment

  createComment = async (id, requestBody) => {
    return this.api.post(`/api/createComment/${id}`, requestBody);
  };

  // DELETE / Remove the comment

  removeComment = async (id, commentId) => {
    return this.api.delete(`/api/deleteComment/${id}/${commentId}`);
  };

  // PUT / Edit the comment

  editComment = async (id, requestBody) => {
    return this.api.put(`/api/editComment/${id}`, requestBody);
  };
}

const commentService = new CommentService();

export default commentService;
