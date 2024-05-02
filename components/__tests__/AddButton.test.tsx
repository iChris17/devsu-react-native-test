import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AddButton from "../AddButton";
import { useRouter } from "expo-router";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("AddButton", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("calls router.push function when pressed", () => {
    const { getByText } = render(<AddButton />);

    const addButton = getByText("Agregar");
    fireEvent.press(addButton);

    expect(pushMock).toHaveBeenCalledWith("/create");
  });
});
