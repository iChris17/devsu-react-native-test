import { Product } from "@/hooks/useGetFinancialProducts";
import { Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import * as yup from "yup";
import Button from "./Button";
import { useRouter } from "expo-router";
import usePostProducts from "@/hooks/usePostProducts";
import { useDispatch, useSelector } from "react-redux";
import { AppDistpatch, RootState } from "@/store";
import usePutProducts from "@/hooks/usePutProducts";
import { resetProduct } from "@/store/productSlice";
import { addYears, format, isValid } from "date-fns";
import useGetIdVerification from "@/hooks/useGetIdVerification";
interface Props {
  isEditing?: boolean;
}

const today = new Date();
today.setHours(0, 0, 0, 0);

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
    .min(10, "nombre debe ser mayor a 10 caracteres")
    .max(200, "nombre no debe ser mayor a 100 caracteres"),
  logo: yup.string().required("Este campo es requerido!"),
  date_release: yup
    .string()
    .matches(
      /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/,
      "El formato de fecha es yyyy-mm-dd"
    )
    .test(
      "min",
      "La fecha debe ser mayor o igual a la fecha actual",
      (value) => {
        const date = new Date(value ?? "");
        date.setHours(0, 0, 0, 0);
        return date >= today;
      }
    )
    .required("Este campo es requerido!"),
});

const ProductForm: FC<Props> = ({ isEditing = false }) => {
  const router = useRouter();
  const product = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch<AppDistpatch>();
  const { postData, isSuccess } = usePostProducts();
  const { putData, isSuccess: isSuccessEditing } = usePutProducts();
  const { verificateId } = useGetIdVerification();
  const [showIdVerificationError, setshowIdVerificationError] = useState(false);

  const initialValues: Product = isEditing
    ? {
        ...product,
        date_release: product.date_release.slice(0, 10),
        date_revision: product.date_revision.slice(0, 10),
      }
    : {
        id: "",
        name: "",
        description: "",
        logo: "",
        date_release: "",
        date_revision: "",
      };

  useEffect(() => {
    if (isSuccess || isSuccessEditing) {
      router.push("/home");
      dispatch(resetProduct());
    }
  }, [isSuccess, isSuccessEditing]);

  const handleSubmit = async (values: Product) => {
    if (!isEditing) {
      const idExists = await verificateId(values.id);
      setshowIdVerificationError(idExists);
      if (!idExists) {
        postData(values);
      }
    } else {
      putData(values);
    }
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
        setFieldValue,
      }) => (
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.title}>
              {isEditing ? "FORMULARIO DE EDICIÓN" : "FORMULARIO DE REGISTRO"}
            </Text>
            <View style={styles.field}>
              <Text style={styles.label}>ID</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("id")}
                onBlur={handleBlur("id")}
                placeholder="ID"
                value={values.id}
                editable={!isEditing}
              />
              {errors.id && touched.id && (
                <Text style={styles.error}>{errors.id}</Text>
              )}
              {showIdVerificationError && (
                <Text style={styles.error}>ID ya existe</Text>
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
                onChangeText={(value) => {
                  setFieldValue("date_release", value);
                  if (isValid(new Date(value))) {
                    const addYear = format(addYears(value, 1), "yyyy-MM-dd");
                    setFieldValue("date_revision", addYear);
                  }
                }}
                onBlur={handleBlur("date_release")}
                placeholder="yyyy-mm-dd"
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
                value={values.date_revision}
                editable={false}
              />
            </View>
          </ScrollView>
          <View style={styles.buttons}>
            <Button
              text="Enviar"
              backgroundColor="#F9E003"
              color="#20226C"
              onPress={handleSubmit}
              marginBottom={5}
            />
            <Button
              text="Reiniciar"
              backgroundColor="#d1d1d1"
              color="#20226C"
              onPress={resetForm}
            />
          </View>
        </View>
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
  container: {
    justifyContent: "space-between",
    flexDirection: "column",
    display: "flex",
    flex: 1,
  },
});

export default ProductForm;
