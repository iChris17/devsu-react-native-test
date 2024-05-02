import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import ListItem from "../ListItem";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("ListItem", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const id = "1";
  const name = "Test Item";

  it("renders correctly", () => {
    const { getByText, getByTestId } = render(
      <ListItem id={id} name={name} />
    );

    const listItem = getByTestId("list-item");
    expect(listItem).toBeTruthy();

    const titleText = getByText(name);
    expect(titleText).toBeTruthy();

    const idText = getByText(`ID: ${id}`);
    expect(idText).toBeTruthy();
  });

  it("navigates to details screen when pressed", () => {
    const { getByTestId } = render(<ListItem id={id} name={name} />);

    const listItem = getByTestId("list-item");
    fireEvent.press(listItem);

    expect(pushMock).toHaveBeenCalledWith(`/details/${id}`);
  });
});
