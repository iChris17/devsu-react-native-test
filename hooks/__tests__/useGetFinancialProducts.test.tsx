import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import useGetFinancialProducts from "../useGetFinancialProducts";

jest.mock("axios");

describe("useGetFinancialProducts", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches data successfully", async () => {
    const responseData = [
      {
        date_release: "2024-05-01",
        date_revision: "2024-05-01",
        description: "Test product",
        id: "1",
        logo: "test.png",
        name: "Test Product",
      },
    ];

    (axios.request as jest.Mock).mockResolvedValueOnce({ data: responseData });

    const { result, waitForNextUpdate } = renderHook(() => useGetFinancialProducts());

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.data).toEqual(responseData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(false);
  });

  it("handles error when fetching data", async () => {
    (axios.request as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch data"));

    const { result, waitForNextUpdate } = renderHook(() => useGetFinancialProducts());

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.data).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(true);
  });

  it("refetches data successfully", async () => {
    const responseData = [
      {
        date_release: "2024-05-01",
        date_revision: "2024-05-01",
        description: "Test product",
        id: "1",
        logo: "test.png",
        name: "Test Product",
      },
    ];

    (axios.request as jest.Mock).mockResolvedValueOnce({ data: responseData });

    const { result, waitForNextUpdate } = renderHook(() => useGetFinancialProducts());

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.data).toEqual(responseData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(false);

    const newData = [
      {
        date_release: "2024-05-02",
        date_revision: "2024-05-02",
        description: "Test product updated",
        id: "2",
        logo: "test_updated.png",
        name: "Updated Product",
      },
    ];

    (axios.request as jest.Mock).mockResolvedValueOnce({ data: newData });

    result.current.refetch();

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.data).toEqual(newData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(false);
  });
});
