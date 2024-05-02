import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants";

export interface Product {
  date_release: string;
  date_revision: string;
  description: string;
  id: string;
  logo: string;
  name: string;
}

const usePostProducts = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const postData = async (body: Product) => {
    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/bp/products`, body, {
        headers: {
          authorId: 1,
        },
      });
      if (response.status === 200) {
        setIsSuccess(true);
      }
      setIsLoading(false);
      setError(false);
    } catch (error) {
      setError(true);
      setIsSuccess(false);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { postData, isSuccess, isLoading, error };
};

export default usePostProducts;
