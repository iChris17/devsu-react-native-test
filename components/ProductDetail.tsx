import React, { FC } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Product } from "@/hooks/useGetFinancialProducts";

const ProductDetail: FC<Product> = (props) => {
  const date_release = new Date(props.date_release);
  const date_revision = new Date(props.date_revision);

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>{`ID: ${props.id}`}</Text>
        <Text style={styles.label}>Información extra</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.text}>{props.name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Descripción</Text>
        <Text style={styles.text}>{props.description}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Logo</Text>
        <Image
          style={styles.image}
          source={{
            uri: props.logo,
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
  );
};

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
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

export default ProductDetail;
