import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import Button from "./Button";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  name: string | undefined;
  onDelete: () => void;
}

const BottomSheet = ({ isVisible, onClose, name, onDelete }: Props) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={onClose}
      backdropOpacity={0.5}
      style={styles.container}
    >
      <View style={styles.content}>
        <TouchableOpacity testID="modal-backdrop" onPress={onClose}>
          <Text style={{ color: "gray" }}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text
          style={styles.text}
        >{`¿Estás seguro de eliminar el producto ${name}?`}</Text>
      </View>
      <View style={styles.content}>
        <Button
          text="Confirmar"
          backgroundColor="yellow"
          color="black"
          onPress={onDelete}
        />
        <Button
          text="Cancelar"
          backgroundColor="#d1d1d1"
          color="black"
          onPress={onClose}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    justifyContent: "flex-end",
  },
  content: {
    backgroundColor: "white",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d1d1",
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});

export default BottomSheet;
