import { Product } from "@/hooks/useGetFinancialProducts";
import { Formik } from "formik";
import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import * as yup from "yup";
import Button from "./Button";
import { useRouter } from "expo-router";

const schema = yup.object<Product>().shape({
  id: yup
    .string()
    .required("ID no válido")
    .min(3, "ID debe ser mayor a 3 dígitos")
    .max(10, "ID no debe ser mayor a 10 dígitos"),
  name: yup
    .string()
    .required("Este campo es requerido!")
    .min(5, "nombre debe ser mayor a 5 caracteres")
    .max(100, "nombre no debe ser mayor a 100 caracteres"),
  description: yup
    .string()
    .required("Este campo es requerido!")
    .min(10, "nombre debe ser mayor a 5 caracteres")
    .max(200, "nombre no debe ser mayor a 100 caracteres"),
  logo: yup.string().required("Este campo es requerido!"),
  date_release: yup.string().required("Este campo es requerido!"),
});

const ProductForm = () => {
  const router = useRouter();

  const initialValues: Product = {
    id: "",
    name: "",
    description: "",
    logo: "",
    date_release: "",
    date_revision: "",
  };

  const handleSubmit = () => {
    router.push("/home");
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      {({ handleChange, handleBlur, handleSubmit, resetForm, values }) => (
        <ScrollView>
          <Text style={styles.title}>FORMULARIO DE REGISTRO</Text>
          <View style={styles.field}>
            <Text style={styles.label}>ID</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("id")}
              onBlur={handleBlur("id")}
              value={values.id}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Descripción</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Logo</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("logo")}
              onBlur={handleBlur("logo")}
              value={values.logo}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Fecha Liberación</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("date_release")}
              onBlur={handleBlur("date_release")}
              value={values.date_release}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Fecha Revisión</Text>
            <TextInput style={styles.input} value={values.date_release} />
          </View>
          <View style={styles.buttons}>
            <Button
              text="Enviar"
              backgroundColor="yellow"
              color="black"
              onPress={handleSubmit}
            />
            <Button
              text="Reiniciar"
              backgroundColor="#d1d1d1"
              color="black"
              onPress={resetForm}
            />
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: "#D1D1D1",
  },
  field: {
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    marginVertical: 20,
  },
  buttons:{
    marginTop: 20
  }
});

export default ProductForm;
