import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants";

const useGetIdVerification = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const verificateId = async (id: string) => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `${BASE_URL}/bp/products/verification?id=${id}`,
        {
          headers: {
            authorId: 1,
          },
        }
      );
      if (response.status === 200) {
        setIsSuccess(true);
      }
      setIsLoading(false);
      setError(false);
      return response.data;
    } catch (error) {
      setError(true);
      setIsSuccess(false);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { verificateId, isSuccess, isLoading, error };
};

export default useGetIdVerification;
