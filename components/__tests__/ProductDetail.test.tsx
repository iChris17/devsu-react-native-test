import React from "react";
import { render } from "@testing-library/react-native";
import ProductDetail from "../ProductDetail";

describe("ProductDetail", () => {
  const product = {
    id: "123",
    name: "Test Product",
    description: "Test Description",
    logo: "https://example.com/logo.png",
    date_release: "2024-05-05",
    date_revision: "2024-05-06",
  };

  it("should render product details correctly", () => {
    const { getByText, getByTestId } = render(<ProductDetail {...product} />);

    expect(getByText(`ID: ${product.id}`)).toBeTruthy();
    expect(getByText("Nombre")).toBeTruthy();
    expect(getByText(product.name)).toBeTruthy();
    expect(getByText("Descripción")).toBeTruthy();
    expect(getByText(product.description)).toBeTruthy();
    expect(getByTestId("product-logo")).toBeTruthy();
    expect(getByText("Fecha liberación")).toBeTruthy();
    expect(getByText("Fecha revisión")).toBeTruthy();
  });
});
