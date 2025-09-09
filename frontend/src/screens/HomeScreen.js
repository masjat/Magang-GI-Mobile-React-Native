import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { getMahasiswaByNim } from "../api";

export default function HomeScreen({ navigation }) {
  const [nim, setNim] = useState("");

  const handleSearch = async () => {
    if (!nim.trim()) return Alert.alert("Validasi", "NIM tidak boleh kosong");
    try {
      const res = await getMahasiswaByNim(nim.trim());
      if (res.data) {
        navigation.navigate("Detail", { data: res.data });
      } else {
        Alert.alert("Tidak ditemukan", "Mahasiswa tidak ditemukan");
      }
    } catch {
      Alert.alert("Error", "Gagal mengambil data");
    }
  };

  return (
    <View style={{ padding: 20, gap: 10 }}>
      <TextInput
        placeholder="Masukkan NIM"
        value={nim}
        onChangeText={setNim}
        style={{ borderWidth: 1, borderRadius: 6, padding: 10 }}
      />
      <Button title="Cari" onPress={handleSearch} />
      <Button title="Tambah" onPress={() => navigation.navigate("Add")} />
      <Button title="Hapus" onPress={() => navigation.navigate("Delete")} />
    </View>
  );
}
