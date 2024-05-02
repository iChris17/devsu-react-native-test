import { Product } from "@/hooks/useGetFinancialProducts";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import * as yup from "yup";
import Button from "./Button";
import { useRouter } from "expo-router";
import usePostProducts from "@/hooks/usePostProducts";

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
  const { postData, isSuccess } = usePostProducts();

  const initialValues: Product = {
    id: "",
    name: "",
    description: "",
    logo: "",
    date_release: "",
    date_revision: "",
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/home");
    }
  }, [isSuccess]);

  const handleSubmit = (values: Product) => {
    postData({ ...values, date_revision: values.date_release });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
        values,
        errors,
        touched,
      }) => (
        <ScrollView>
          <Text style={styles.title}>FORMULARIO DE REGISTRO</Text>
          <View style={styles.field}>
            <Text style={styles.label}>ID</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("id")}
              onBlur={handleBlur("id")}
              placeholder="ID"
              value={values.id}
            />
            {errors.id && touched.id && (
              <Text style={styles.error}>{errors.id}</Text>
            )}
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              placeholder="Nombre"
              value={values.name}
            />
            {errors.name && touched.name && (
              <Text style={styles.error}>{errors.name}</Text>
            )}
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Descripción</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              placeholder="Descripción"
              value={values.description}
            />
            {errors.description && touched.description && (
              <Text style={styles.error}>{errors.description}</Text>
            )}
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Logo</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("logo")}
              onBlur={handleBlur("logo")}
              placeholder="Logo"
              value={values.logo}
            />
            {errors.logo && touched.logo && (
              <Text style={styles.error}>{errors.logo}</Text>
            )}
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Fecha Liberación</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("date_release")}
              onBlur={handleBlur("date_release")}
              placeholder="Fecha Liberación"
              value={values.date_release}
            />
            {errors.date_release && touched.date_release && (
              <Text style={styles.error}>{errors.date_release}</Text>
            )}
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Fecha Revisión</Text>
            <TextInput
              style={styles.input}
              placeholder="Fecha Revisión"
              value={values.date_release}
            />
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
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: "#D1D1D1",
  },
  field: {
    marginBottom: 15,
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
  buttons: {
    marginTop: 20,
  },
  error: {
    color: "red",
  },
});

export default ProductForm;
