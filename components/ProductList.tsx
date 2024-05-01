import useGetFinancialProducts, {
  Product,
} from "@/hooks/useGetFinancialProducts";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import ListItem from "./ListItem";

const ProductList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data } = useGetFinancialProducts();
  const [filteredData, setfilteredData] = useState<Product[]>([]);

  useEffect(() => {
    setfilteredData(data);
  }, [data]);

  const handleOnChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleFilter = useCallback(() => {
    if (searchQuery !== "") {
      const filter = data.filter((p) => {
        return p.name.includes(searchQuery);
      });
      setfilteredData(filter);
    } else {
      setfilteredData(data);
    }
  }, [data, searchQuery]);

  useEffect(() => {
    handleFilter();
  }, [searchQuery, handleFilter]);

  const renderItem = (item: ListRenderItemInfo<Product>) => {
    return <ListItem id={item.item.id} name={item.item.name} />;
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Buscar..."
        value={searchQuery}
        onChangeText={handleOnChange}
      ></TextInput>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default ProductList;
