import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import ProductForm from "../components/ProductForm";

const EditView = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ProductForm isEditing />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    display: "flex",
    backgroundColor: "white",
    padding: 10,
    flexDirection: "column",
  },
});

export default EditView;
