import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, Alert } from "react-native";
import { getAllMahasiswa, deleteMahasiswa } from "../api";

export default function DeleteScreen() {
  const [list, setList] = useState([]);

  const load = async () => {
    const res = await getAllMahasiswa();
    setList(res.data);
  };

  useEffect(() => { load(); }, []);

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
    <View style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderColor: "#eee"
    }}>
      <Text>{item.name} ({item.nim})</Text>
      <Button title="Hapus" onPress={() => confirmDelete(item.nim)} />
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
