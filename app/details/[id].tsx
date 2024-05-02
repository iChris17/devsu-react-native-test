import Details from "@/views/Details";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const DetailsScreen = () => {
  const { id } = useLocalSearchParams();
  return <Details id={id.toString()} />;
};

export default DetailsScreen;
