import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import ProductList from "./ProductList";
import AddButton from "./AddButton";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
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
  }
});

export default Home;
