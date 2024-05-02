import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ProductForm from "../ProductForm";
import { useRouter } from "expo-router";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/usePostProducts", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    postData: jest.fn(),
    isSuccess: false,
  })),
}));

describe("ProductForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(<ProductForm />);

    const titleLabel = getByText("FORMULARIO DE REGISTRO");
    expect(titleLabel).toBeTruthy();

    const idInput = getByPlaceholderText("ID");
    expect(idInput).toBeTruthy();

    const nameInput = getByPlaceholderText("Nombre");
    expect(nameInput).toBeTruthy();

    const descriptionInput = getByPlaceholderText("Descripción");
    expect(descriptionInput).toBeTruthy();

    const logoInput = getByPlaceholderText("Logo");
    expect(logoInput).toBeTruthy();

    const dateReleaseInput = getByPlaceholderText("Fecha Liberación");
    expect(dateReleaseInput).toBeTruthy();

    const sendButton = getByText("Enviar");
    expect(sendButton).toBeTruthy();

    const resetButton = getByText("Reiniciar");
    expect(resetButton).toBeTruthy();
  });

  it("calls resetForm function when Reiniciar button is pressed", () => {
    const { getByText, getByPlaceholderText } = render(<ProductForm />);

    const resetButton = getByText("Reiniciar");
    fireEvent.press(resetButton);

    const idInput = getByPlaceholderText("ID");
    expect(idInput.props.value).toEqual("");

    const nameInput = getByPlaceholderText("Nombre");
    expect(nameInput.props.value).toEqual("");

    const descriptionInput = getByPlaceholderText("Descripción");
    expect(descriptionInput.props.value).toEqual("");

    const logoInput = getByPlaceholderText("Logo");
    expect(logoInput.props.value).toEqual("");

    const dateReleaseInput = getByPlaceholderText("Fecha Liberación");
    expect(dateReleaseInput.props.value).toEqual("");
  });
});
