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

  const [showGenderOptions, setShowGenderOptions] = useState(false);

  const setVal = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const handleAdd = async () => {
    if (!form.nim.trim() || !form.name.trim() || !form.gender.trim()) {
      return Alert.alert("Validasi", "NIM, Nama, dan Gender wajib diisi");
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

      {/* Gender sebagai dropdown manual */}
      <View style={styles.dropdownWrapper}>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowGenderOptions(!showGenderOptions)}
        >
          <Text style={{ color: form.gender ? "#000" : "#888" }}>
            {form.gender
              ? form.gender === "L"
                ? "Laki-laki"
                : "Perempuan"
              : "Pilih Gender"}
          </Text>
          <Text style={styles.arrow}>{showGenderOptions ? "▲" : "▼"}</Text>
        </TouchableOpacity>

        {showGenderOptions && (
          <View style={styles.dropdownOptions}>
            <TouchableOpacity
              onPress={() => {
                setVal("gender", "L");
                setShowGenderOptions(false);
              }}
            >
              <Text style={styles.option}>Laki-laki</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setVal("gender", "P");
                setShowGenderOptions(false);
              }}
            >
              <Text style={styles.option}>Perempuan</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

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
  dropdownWrapper: {
    marginBottom: 10,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  arrow: {
    fontSize: 14,
    color: "#666",
  },
  dropdownOptions: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginTop: 5,
    backgroundColor: "#eeeeeeff",
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#cacacaff",
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
