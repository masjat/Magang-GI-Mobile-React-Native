import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { getAllMahasiswa, deleteMahasiswa } from "../api";

export default function DeleteScreen() {
  const [list, setList] = useState([]);

  const load = async () => {
    const res = await getAllMahasiswa();
    setList(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const confirmDelete = (nim) => {
    Alert.alert(
      "Konfirmasi",
      `Mahasiswa dengan NIM ${nim} akan dihapus`,
      [
        { text: "Tidak" },
        {
          text: "Ya",
          onPress: async () => {
            await deleteMahasiswa(nim);
            await load();
          },
        },
      ]
    );
  };

  const Item = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.text}>{item.name} ({item.nim})</Text>
      <TouchableOpacity
        style={[styles.button, styles.hapus]}
        onPress={() => confirmDelete(item.nim)}
      >
        <Text style={styles.buttonText}>Hapus</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={list}
        keyExtractor={(it) => it.nim}
        renderItem={({ item }) => <Item item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  text: {
    fontSize: 16,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignItems: "center",
  },
  hapus: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
