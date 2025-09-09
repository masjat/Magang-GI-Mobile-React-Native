import React from "react";
import { View, Text } from "react-native";

export default function DetailScreen({ route }) {
  const { data } = route.params;

  return (
    <View style={{ padding: 20, gap: 6 }}>
      <Text>NIM    : {data.nim}</Text>
      <Text>Nama   : {data.name}</Text>
      <Text>Gender : {data.gender || "-"}</Text>
      <Text>Alamat : {data.address || "-"}</Text>
      <Text>No HP  : {data.phone || "-"}</Text>
    </View>
  );
}
