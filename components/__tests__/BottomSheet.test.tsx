import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import BottomSheet from "../BottomSheet";

describe("BottomSheet", () => {
  const onCloseMock = jest.fn();
  const onDeleteMock = jest.fn();
  const name = "Test Product";

  it("renders correctly", () => {
    const { getByText } = render(
      <BottomSheet
        isVisible={true}
        onClose={onCloseMock}
        name={name}
        onDelete={onDeleteMock}
      />
    );

    const productNameText = getByText(`¿Estás seguro de eliminar el producto ${name}?`);
    expect(productNameText).toBeTruthy();

    const confirmButton = getByText("Confirmar");
    expect(confirmButton).toBeTruthy();

    const cancelButton = getByText("Cancelar");
    expect(cancelButton).toBeTruthy();
  });

  it("calls onClose function when backdrop is pressed", () => {
    const { getByTestId } = render(
      <BottomSheet
        isVisible={true}
        onClose={onCloseMock}
        name={name}
        onDelete={onDeleteMock}
      />
    );

    const backdrop = getByTestId("modal-backdrop");
    fireEvent.press(backdrop);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("calls onDelete function when Confirmar button is pressed", () => {
    const { getByText } = render(
      <BottomSheet
        isVisible={true}
        onClose={onCloseMock}
        name={name}
        onDelete={onDeleteMock}
      />
    );

    const confirmButton = getByText("Confirmar");
    fireEvent.press(confirmButton);
    expect(onDeleteMock).toHaveBeenCalled();
  });

  it("calls onClose function when Cancelar button is pressed", () => {
    const { getByText } = render(
      <BottomSheet
        isVisible={true}
        onClose={onCloseMock}
        name={name}
        onDelete={onDeleteMock}
      />
    );

    const cancelButton = getByText("Cancelar");
    fireEvent.press(cancelButton);
    expect(onCloseMock).toHaveBeenCalled();
  });
});
