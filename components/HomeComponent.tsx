import React from "react";
import { SafeAreaView, TextInput, View, StyleSheet } from "react-native";
import ProductList from "./ProductList";
import AddButton from "./AddButton";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput style={styles.input} placeholder="Search..."></TextInput>
        <ProductList />
      </View>
      <AddButton />
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
    justifyContent: "space-between",
    flexDirection: "column",
    borderColor: "red",
    borderWidth: 1,
  },
  input: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: "#D1D1D1",
  },
});

export default Home;
