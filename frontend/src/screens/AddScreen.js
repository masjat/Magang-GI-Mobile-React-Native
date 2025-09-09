import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
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
      <TextInput placeholder="NIM" value={form.nim} onChangeText={(v)=>setVal("nim", v)}
        style={{ borderWidth: 1, borderRadius: 6, padding: 10 }} />
      <TextInput placeholder="Nama" value={form.name} onChangeText={(v)=>setVal("name", v)}
        style={{ borderWidth: 1, borderRadius: 6, padding: 10 }} />
      <TextInput placeholder="Gender (Male/Female)" value={form.gender} onChangeText={(v)=>setVal("gender", v)}
        style={{ borderWidth: 1, borderRadius: 6, padding: 10 }} />
      <TextInput placeholder="Alamat" value={form.address} onChangeText={(v)=>setVal("address", v)}
        style={{ borderWidth: 1, borderRadius: 6, padding: 10 }} />
      <TextInput placeholder="No HP" value={form.phone} onChangeText={(v)=>setVal("phone", v)}
        keyboardType="phone-pad"
        style={{ borderWidth: 1, borderRadius: 6, padding: 10 }} />
      <Button title="Tambah" onPress={handleAdd} />
    </View>
  );
}
