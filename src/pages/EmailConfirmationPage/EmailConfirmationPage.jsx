import authService from "../../services/auth.service";

import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EmailConfirmationPage() {
  const [answer, setAnswer] = useState(undefined);
  const { confirmationCode } = useParams();

  const isEmailConfirmed = async () => {
    console.log(confirmationCode);
    try {
      const response = await authService.emailConfirmation(confirmationCode);
      const { message } = response.data;
      setAnswer(message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isEmailConfirmed();
  }, []);

  return (
    <div>
      <p>{answer}</p>
    </div>
  );
}

export default EmailConfirmationPage;
