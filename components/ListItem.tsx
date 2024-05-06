import { Product } from "@/hooks/useGetFinancialProducts";
import { AppDistpatch } from "@/store";
import { setProduct } from "@/store/productSlice";
import { useRouter } from "expo-router";
import React, { FC, memo, useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

const ListItem: FC<Product> = (props) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDistpatch>();

  const handleOnPress = useCallback(() => {
    dispatch(setProduct(props));
    router.push(`/details`);
  }, [props]);

  return (
    <TouchableOpacity onPress={handleOnPress} testID="list-item">
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{props.name}</Text>
          <Text style={styles.label}>ID: {props.id}</Text>
        </View>
        <View>
          <Text style={styles.arrow}>{">"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D1D1",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 8,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
  },
  label: {
    fontSize: 12,
    color: "gray",
  },
  arrow: {
    fontSize: 16,
    color: "gray",
  },
});

export default memo(ListItem);
