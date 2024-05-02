import { renderHook } from "@testing-library/react-hooks";
import useGetProductById from "../useGetProductById";
import useGetFinancialProducts, { Product } from "../useGetFinancialProducts";

jest.mock("../useGetFinancialProducts", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedUseGetFinancialProducts = useGetFinancialProducts as jest.MockedFunction<typeof useGetFinancialProducts>;

describe("useGetProductById", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns product by id when found", () => {
    const products: Product[] = [
      { id: "1", date_release: "2024-05-01", date_revision: "2024-05-01", description: "Product 1", logo: "logo1.png", name: "Product 1" },
      { id: "2", date_release: "2024-05-02", date_revision: "2024-05-02", description: "Product 2", logo: "logo2.png", name: "Product 2" },
    ];

    const id = "1";
    const expectedProduct = products[0];

    mockedUseGetFinancialProducts.mockReturnValueOnce({
        data: products, isLoading: false,
        error: false,
        refetch: jest.fn()
    });

    const { result } = renderHook(() => useGetProductById({ id }));

    expect(result.current.product).toEqual(expectedProduct);
    expect(result.current.isLoading).toBe(false);
  });

  it("returns undefined product when not found", () => {
    const products: Product[] = [
      { id: "1", date_release: "2024-05-01", date_revision: "2024-05-01", description: "Product 1", logo: "logo1.png", name: "Product 1" },
      { id: "2", date_release: "2024-05-02", date_revision: "2024-05-02", description: "Product 2", logo: "logo2.png", name: "Product 2" },
    ];

    const id = "3"; // Product with id 3 doesn't exist

    mockedUseGetFinancialProducts.mockReturnValueOnce({
        data: products, isLoading: false,
        error: false,
        refetch: jest.fn()
    });

    const { result } = renderHook(() => useGetProductById({ id }));

    expect(result.current.product).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });

  it("handles loading state", () => {
    mockedUseGetFinancialProducts.mockReturnValueOnce({
        data: [], isLoading: true,
        error: false,
        refetch: jest.fn()
    });

    const id = "1";

    const { result } = renderHook(() => useGetProductById({ id }));

    expect(result.current.product).toBeUndefined();
    expect(result.current.isLoading).toBe(true);
  });
});
