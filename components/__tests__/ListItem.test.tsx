import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useDispatch } from "react-redux";
import ListItem from "../ListItem";
import { setProduct } from "@/store/productSlice";
import { useRouter } from "expo-router";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("ListItem", () => {
  const pushMock = jest.fn();
  const mockDispatch = jest.fn();
  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should dispatch setProduct action and navigate to details on press", () => {
    const product = {
      date_release: "2024-05-01",
      date_revision: "2024-05-01",
      description: "Test product",
      id: "1",
      logo: "test.png",
      name: "Test Product",
    };

    const { getByTestId } = render(<ListItem {...product} />);

    fireEvent.press(getByTestId("list-item"));

    expect(mockDispatch).toHaveBeenCalledWith(setProduct(product));
    expect(pushMock).toHaveBeenCalledWith("/details");
  });
});
