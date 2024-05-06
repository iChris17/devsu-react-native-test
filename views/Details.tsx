import React, { FC, useCallback, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Button from "../components/Button";
import BottomSheet from "../components/BottomSheet";
import useDeleteProducts from "@/hooks/useDeleteProduct";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ProductDetail from "@/components/ProductDetail";

const Details: FC = () => {
  const product = useSelector((state: RootState) => state.product);
  const { deleteData, isSuccess } = useDeleteProducts();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      router.push("/home");
    }
  }, [isSuccess]);

  const handleDelete = useCallback(() => {
    deleteData(product.id);
  }, [product]);

  const toggleBottomSheet = () => {
    setIsVisible(!isVisible);
  };

  const handleEditButton = useCallback(() => {
    router.push("/edit");
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <BottomSheet
        isVisible={isVisible}
        onClose={toggleBottomSheet}
        onDelete={handleDelete}
        name={product.name}
      />
      <ProductDetail {...product} />
      <View>
        <Button
          text="Editar"
          backgroundColor="#d1d1d1"
          color="#20226C"
          marginBottom={5}
          onPress={handleEditButton}
        />
        <Button
          text="Eliminar"
          backgroundColor="#CC0000"
          color="white"
          onPress={toggleBottomSheet}
        />
      </View>
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
  },
});

export default Details;
