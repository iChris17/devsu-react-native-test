import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Button from "../Button";

describe("Button", () => {
  const onPressMock = jest.fn();
  const backgroundColor = "blue";
  const color = "white";
  const text = "Press me";

  it("renders correctly", () => {
    const { getByText, getByTestId } = render(
      <Button
        text={text}
        onPress={onPressMock}
        backgroundColor={backgroundColor}
        color={color}
      />
    );

    const button = getByTestId("button");
    expect(button).toBeTruthy();

    const buttonText = getByText(text);
    expect(buttonText).toBeTruthy();
    expect(buttonText.props.style.color).toEqual(color);
  });

  it("calls onPress function when pressed", () => {
    const { getByTestId } = render(
      <Button
        text={text}
        onPress={onPressMock}
        backgroundColor={backgroundColor}
        color={color}
      />
    );

    const button = getByTestId("button");
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });
});
