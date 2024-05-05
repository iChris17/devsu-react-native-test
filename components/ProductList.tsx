import useGetFinancialProducts, {
  Product,
} from "@/hooks/useGetFinancialProducts";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import ListItem from "./ListItem";

const ProductList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading } = useGetFinancialProducts();
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
        return p.name.toLowerCase().includes(searchQuery.toLowerCase());
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
    const { id, name, description, date_release, date_revision, logo } =
      item.item;
    return (
      <ListItem
        id={id}
        name={name}
        date_release={date_release}
        date_revision={date_revision}
        logo={logo}
        description={description}
      />
    );
  };

  if (isLoading) {
    return <ActivityIndicator size={"large"} />;
  }

  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar..."
          value={searchQuery}
          onChangeText={handleOnChange}
        ></TextInput>
      </View>
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
  inputContainer: {
    paddingVertical: 30,
    marginBottom: 20,
  },
});

export default ProductList;
