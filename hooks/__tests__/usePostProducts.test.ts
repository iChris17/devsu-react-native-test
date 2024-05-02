import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import usePostProducts from "../usePostProducts";
import { BASE_URL } from "@/constants";

jest.mock("axios");

describe("usePostProducts", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("posts data successfully", async () => {
    const postDataMock = jest.fn();
    (axios.post as jest.Mock).mockImplementationOnce(postDataMock);

    const { result } = renderHook(() => usePostProducts());

    const productData = {
      date_release: "2024-05-01",
      date_revision: "2024-05-01",
      description: "Test product",
      id: "1",
      logo: "test.png",
      name: "Test Product",
    };

    postDataMock.mockResolvedValueOnce({ status: 200 });

    await result.current.postData(productData);

    expect(postDataMock).toHaveBeenCalledWith(`${BASE_URL}/bp/products`, productData, {
      headers: {
        authorId: 1,
      },
    });
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(false);
  });

  it("handles error when posting data", async () => {
    const postDataMock = jest.fn();
    (axios.post as jest.Mock).mockImplementationOnce(postDataMock);

    const { result } = renderHook(() => usePostProducts());

    const productData = {
      date_release: "2024-05-01",
      date_revision: "2024-05-01",
      description: "Test product",
      id: "1",
      logo: "test.png",
      name: "Test Product",
    };

    postDataMock.mockRejectedValueOnce(new Error("Failed to post data"));

    await result.current.postData(productData);

    expect(postDataMock).toHaveBeenCalledWith(`${BASE_URL}/bp/products`, productData, {
      headers: {
        authorId: 1,
      },
    });
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(true);
  });
});
