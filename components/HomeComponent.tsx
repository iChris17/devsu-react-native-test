import useGetFinancialProducts, {
  Product,
} from "@/hooks/useGetFinancialProducts";
import React from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import ListItem from "./ListItem";

const Home = () => {
  const { data } = useGetFinancialProducts();
  
  const renderItem = (item: ListRenderItemInfo<Product>) => {
    return (
      <ListItem id={item.item.id} name={item.item.name}/>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput style={styles.input} placeholder="Search..."></TextInput>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10
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
