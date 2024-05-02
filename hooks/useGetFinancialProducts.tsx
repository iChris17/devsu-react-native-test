import { useState, useEffect } from "react";
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

const useGetFinancialProducts = () => {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const options = {
    method: "GET",
    url: `${BASE_URL}/bp/products`,
    headers: {
      authorId: 1,
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      setData(response.data);
      setIsLoading(false);
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useGetFinancialProducts;
