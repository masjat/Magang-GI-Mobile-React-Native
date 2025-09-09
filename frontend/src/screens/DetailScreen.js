import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DetailScreen({ route }) {
  const { data } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <View style={styles.card}>
        <Text style={styles.item}>NIM    : {data.nim}</Text>
        <Text style={styles.item}>Nama   : {data.name}</Text>
        <Text style={styles.item}>Gender : {data.gender || "-"}</Text>
        <Text style={styles.item}>Alamat : {data.address || "-"}</Text>
        <Text style={styles.item}>No HP  : {data.phone || "-"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  item: {
    fontSize: 16,
    marginBottom: 8,
  },
});
