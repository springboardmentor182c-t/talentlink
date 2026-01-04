import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const role = params.get("role");

    if (role === "freelancer") {
      navigate("/freelancer");
    } else {
      navigate("/client");
    }
  }, [navigate]);

  return <p>Logging you in...</p>;
};

export default OAuthSuccess;
