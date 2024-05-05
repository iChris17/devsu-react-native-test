import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants";
import { Product } from "./useGetFinancialProducts";

const usePutProducts = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const putData = async (body: Product) => {
    setIsLoading(true);

    try {
      const response = await axios.put(`${BASE_URL}/bp/products`, body, {
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

  return { putData, isSuccess, isLoading, error };
};

export default usePutProducts;
