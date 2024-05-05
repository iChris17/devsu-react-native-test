import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "./Button";

const AddButton = () => {
  const router = useRouter();

  const handleAdd = () => {
    router.push("/create");
  };

  return (
    <View style={styles.container}>
      <Button
        text="Agregar"
        backgroundColor="#F9E003"
        color="#20226C"
        onPress={handleAdd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    bottom: 0,
  },
});

export default AddButton;
