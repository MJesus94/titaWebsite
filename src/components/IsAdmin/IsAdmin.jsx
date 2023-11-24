import { useEffect, useState } from "react";
import userService from "../../services/user.service";
import { Navigate } from "react-router-dom";

/* function IsAdmin({ children, showErrorToast }) {
  const [admin, setAdmin] = useState(false);

  const currentUser = async () => {
    try {
      const response = await userService.getCurrentUser();
      setAdmin(response.data.admin);

      if (!admin) {
        return <Navigate to="/" />;
      }

      // If the user is admin, allow to see the page ✅
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    currentUser();
  }, []);

  if (admin) return children;
}

export default IsAdmin; */

function IsAdmin({ children, showErrorToast }) {
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const currentUser = async () => {
      try {
        const response = await userService.getCurrentUser();

        setAdmin(response.data.admin);
        if (!admin) return <Navigate to="/" />;
      } catch (error) {
        showErrorToast("Tem que efetuar o Login para poder ver esta página");
      }
    };

    currentUser();
  }, []);

  return children;
}

export default IsAdmin;
