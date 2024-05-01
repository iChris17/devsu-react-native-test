import { Product } from "@/hooks/useGetFinancialProducts";
import { useRouter } from "expo-router";
import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  id: string;
  name: string;
}

const ListItem: FC<Props> = ({ id, name }) => {
  const router = useRouter();

  const handleOnPress = () => {
    router.push(`/details/${id}`);
  };

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.label}>ID: {id}</Text>
        </View>
        <View>
          <Text>{">"}</Text>
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
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
  },
  label: {
    fontSize: 12,
    color: "gray"
  },
});

export default ListItem;
