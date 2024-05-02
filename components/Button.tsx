import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  text: string;
  backgroundColor: string;
  color: string;
  onPress: () => void;
}

const Button: FC<Props> = ({ text, onPress, backgroundColor, color }) => {
  return (
    <TouchableOpacity
      style={{ backgroundColor, ...styles.container }}
      onPress={onPress}
      testID="button"
    >
      <Text style={{ color, ...styles.text }}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Button;
