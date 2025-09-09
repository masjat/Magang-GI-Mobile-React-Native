import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
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
    <View style={styles.container}>
      <Text style={styles.title}>Masukkan NIM Mahasiswa</Text>

      <TextInput
        placeholder="Masukkan NIM"
        value={nim}
        onChangeText={setNim}
        style={styles.input}
      />

      {/* Tombol sejajar */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.tambah]}
          onPress={() => navigation.navigate("Add")}
        >
          <Text style={styles.buttonText}>Tambah</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.hapus]}
          onPress={() => navigation.navigate("Delete")}
        >
          <Text style={styles.buttonText}>Hapus</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.cari]}
          onPress={handleSearch}
        >
          <Text style={styles.buttonText}>Cari</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",       // tombol berjejer horizontal
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  tambah: {
    backgroundColor: "green",
  },
  hapus: {
    backgroundColor: "red",
  },
  cari: {
    backgroundColor: "blue",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
