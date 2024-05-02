import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants";

const useDeleteProducts = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const deleteData = async (id: string) => {
    setIsLoading(true);

    try {
      const response = await axios.delete(`${BASE_URL}/bp/products?id=${id}`, {
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

  return { deleteData, isSuccess, isLoading, error };
};

export default useDeleteProducts;
