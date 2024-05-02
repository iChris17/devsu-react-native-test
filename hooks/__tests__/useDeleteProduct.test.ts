import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import useDeleteProduct from "../useDeleteProduct";
import { BASE_URL } from "@/constants";

jest.mock("axios");

describe("useDeleteProduct", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deletes data successfully", async () => {
    const deleteDataMock = jest.fn();
    (axios.delete as jest.Mock).mockImplementationOnce(deleteDataMock);

    const { result } = renderHook(() => useDeleteProduct());

    const id = "1";

    deleteDataMock.mockResolvedValueOnce({ status: 200 });

    await result.current.deleteData(id);

    expect(deleteDataMock).toHaveBeenCalledWith(
      `${BASE_URL}/bp/products?id=${id}`,
      {
        headers: {
          authorId: 1,
        },
      }
    );
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(false);
  });

  it("handles error when deleting data", async () => {
    const deleteDataMock = jest.fn();
    (axios.delete as jest.Mock).mockImplementationOnce(deleteDataMock);

    const { result } = renderHook(() => useDeleteProduct());

    const id = "1";

    deleteDataMock.mockRejectedValueOnce(new Error("Failed to delete data"));

    await result.current.deleteData(id);

    expect(deleteDataMock).toHaveBeenCalledWith(
      `${BASE_URL}/bp/products?id=${id}`,
      {
        headers: {
          authorId: 1,
        },
      }
    );
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(true);
  });
});
