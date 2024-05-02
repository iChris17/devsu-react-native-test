import useGetFinancialProducts, { Product } from "./useGetFinancialProducts";

const useGetProductById = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetFinancialProducts();

  const product: Product | undefined = data.find((product) => {
    return product.id === id;
  });

  return { product, isLoading };
};

export default useGetProductById;
