import React, { FC, useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import BottomSheet from "../components/BottomSheet";
import useDeleteProducts from "@/hooks/useDeleteProduct";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

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

  const handleDelete = () => {
    deleteData(product.id);
  };

  const toggleBottomSheet = () => {
    setIsVisible(!isVisible);
  };

  const handleEditButton = () => {
    router.push("/edit");
  };

  const date_release = new Date(product.date_release);
  const date_revision = new Date(product.date_revision);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <BottomSheet
          isVisible={isVisible}
          onClose={toggleBottomSheet}
          onDelete={handleDelete}
          name={product?.name}
        />
        <View style={styles.header}>
          <Text style={styles.title}>{`ID: ${product.id}`}</Text>
          <Text style={styles.label}>Información extra</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Nombre</Text>
          <Text style={styles.text}>{product.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Descripción</Text>
          <Text style={styles.text}>{product.description}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Logo</Text>
          <Image
            style={styles.image}
            source={{
              uri: product.logo,
            }}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Fecha liberación</Text>
          <Text style={styles.text}>{date_release.toLocaleDateString()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Fecha revisión</Text>
          <Text style={styles.text}>{date_revision.toLocaleDateString()}</Text>
        </View>
      </View>
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
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  container: {
    flex: 1,
    flexGrow: 1,
    display: "flex",
    backgroundColor: "white",
    padding: 10,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  label: {
    color: "gray",
    fontSize: 14,
  },
  text: {
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 100,
  },
  header: {
    marginBottom: 50,
    marginTop: 20,
  },
});

export default Details;
