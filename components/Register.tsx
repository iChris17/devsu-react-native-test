import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import ProductForm from "./ProductForm";

const Register = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ProductForm />
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

export default Register;
