import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from "react-native";
import { addMahasiswa } from "../api";

export default function AddScreen({ navigation }) {
  const [form, setForm] = useState({
    nim: "",
    name: "",
    gender: "",
    address: "",
    phone: "",
  });

  const setVal = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const handleAdd = async () => {
    if (!form.nim.trim() || !form.name.trim()) {
      return Alert.alert("Validasi", "NIM dan Nama wajib diisi");
    }
    try {
      await addMahasiswa({
        nim: form.nim.trim(),
        name: form.name.trim(),
        gender: form.gender.trim(),
        address: form.address.trim(),
        phone: form.phone.trim(),
      });
      Alert.alert("Sukses", "Mahasiswa ditambahkan");
      navigation.goBack();
    } catch (e) {
      const msg = e.response?.data?.error || "Gagal menambah";
      Alert.alert("Error", msg);
    }
  };

  return (
    <View style={{ padding: 20, gap: 10 }}>
      <TextInput
        placeholder="NIM"
        value={form.nim}
        onChangeText={(v) => setVal("nim", v)}
        style={styles.input}
      />
      <TextInput
        placeholder="Nama"
        value={form.name}
        onChangeText={(v) => setVal("name", v)}
        style={styles.input}
      />
      <TextInput
        placeholder="Gender (Male/Female)"
        value={form.gender}
        onChangeText={(v) => setVal("gender", v)}
        style={styles.input}
      />
      <TextInput
        placeholder="Alamat"
        value={form.address}
        onChangeText={(v) => setVal("address", v)}
        style={styles.input}
      />
      <TextInput
        placeholder="No HP"
        value={form.phone}
        onChangeText={(v) => setVal("phone", v)}
        keyboardType="phone-pad"
        style={styles.input}
      />

      {/* Tombol Tambah */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={[styles.button, styles.tambah]} onPress={handleAdd}>
          <Text style={styles.buttonText}>Tambah</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  buttonWrapper: {
    alignItems: "center", 
    marginTop: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: "center",
  },
  tambah: {
    backgroundColor: "green",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
