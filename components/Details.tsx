import useGetProductById from "@/hooks/useGetProductById";
import React, { FC } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Button from "./Button";

interface Props {
  id: string;
}
const Details: FC<Props> = ({ id }) => {
  const { product } = useGetProductById({ id });

  const date_release = new Date(product?.date_release || "");
  const date_revision = new Date(product?.date_revision || "");

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>{`ID: ${id}`}</Text>
          <Text style={styles.label}>Información extra</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Nombre</Text>
          <Text style={styles.text}>{product?.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Descripción</Text>
          <Text style={styles.text}>{product?.description}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Logo</Text>
          <Image
            style={styles.image}
            source={{
              uri: product?.logo,
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
          color="black"
          onPress={() => {}}
        />
        <Button
          text="Eliminar"
          backgroundColor="red"
          color="white"
          onPress={() => {}}
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
    marginTop: 20
  },
});

export default Details;
