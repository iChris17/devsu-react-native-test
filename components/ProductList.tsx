import useGetFinancialProducts, {
  Product,
} from "@/hooks/useGetFinancialProducts";
import React from "react";
import { FlatList, ListRenderItemInfo, View } from "react-native";
import ListItem from "./ListItem";

const ProductList = () => {
  const { data } = useGetFinancialProducts();

  const renderItem = (item: ListRenderItemInfo<Product>) => {
    return <ListItem id={item.item.id} name={item.item.name} />;
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ProductList;
