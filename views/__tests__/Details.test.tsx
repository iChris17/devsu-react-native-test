import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useSelector } from "react-redux";
import Details from "../Details";
import { useRouter } from "expo-router";
import useDeleteProducts from "@/hooks/useDeleteProduct";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/useDeleteProduct", () => jest.fn());

describe("Details", () => {
  beforeEach(() => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      id: "1",
      name: "Test Product",
      description: "Test Description",
      date_release: "2024-01-01",
      date_revision: "2024-01-02",
      logo: "logo.png",
    });

    (useDeleteProducts as jest.Mock).mockReturnValue({
      deleteData: jest.fn(),
      isSuccess: false,
    });

    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  it("should render details and buttons correctly", () => {
    const { getByText } = render(<Details />);

    expect(getByText("Test Product")).toBeTruthy();
    expect(getByText("Test Description")).toBeTruthy();
    expect(getByText("Editar")).toBeTruthy();
    expect(getByText("Eliminar")).toBeTruthy();
  });

  it("should render bottom sheet when delete button is pressed", () => {
    const deleteDataMock = jest.fn();
    (useDeleteProducts as jest.Mock).mockReturnValueOnce({
      deleteData: deleteDataMock,
      isSuccess: false,
    });

    const { getByText, getByTestId } = render(<Details />);
    fireEvent.press(getByText("Eliminar"));
    fireEvent.press(getByText("Confirmar"));

    expect(getByTestId("bottom-sheet")).toBeTruthy();
    expect(deleteDataMock).toHaveBeenCalledTimes(1);
  });

  it("should navigate to edit page when edit button is pressed", () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValueOnce({
      push: pushMock,
    });

    const { getByText } = render(<Details />);
    fireEvent.press(getByText("Editar"));

    expect(pushMock).toHaveBeenCalledWith("/edit");
  });
});
