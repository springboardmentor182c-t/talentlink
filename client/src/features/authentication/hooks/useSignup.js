


import { useState } from 'react';
import axios from 'axios'; 
// Note: If you have a custom axios instance (e.g., 'import api from "../api/axios"'), use that instead of 'import axios'.

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 1. Updated to accept 'role' as the 5th argument
  const signup = async (firstName, lastName, email, password, role) => {
    setIsLoading(true);
    setError(null);

    try {
      // 2. Construct the payload matching backend Serializer fields
      // Backend expects: first_name, last_name, email, password, role
      const payload = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        role: role // <--- Passing the role (client/freelancer)
      };

      // 3. Send POST request (Update URL if your backend port is different)
      const response = await axios.post('http://127.0.0.1:8000/api/register/', payload);

      if (response.status === 201) {
        setIsSuccess(true);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      
      // Handle errors (checks if backend sent a specific error message)
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError({ detail: "Something went wrong during registration." });
      }
    }
  };

  return { signup, isLoading, error, isSuccess };
};