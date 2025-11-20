import { useState } from 'react';
// Make sure this import path is correct based on where you put your service file!
import { registerUser } from '../services/register'; 

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const signup = async (firstName, lastName, email, password) => {
        setIsLoading(true);
        setError(null);
        
        try {
            await registerUser({
                first_name: firstName,
                last_name: lastName,
                email,
                password
            });
            setIsSuccess(true);
        } catch (err) {
            // Handle Django field errors (e.g., { email: ["User with this email already exists."] })
            setIsSuccess(false);
            setError(err.response ? err.response.data : { detail: "Network Error" });
        } finally {
            setIsLoading(false);
        }
    };

    return { signup, isLoading, error, isSuccess };
};