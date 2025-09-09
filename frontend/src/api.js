import axios from "axios";

// Ganti sesuai target: emulator / device
const API_URL = "http://192.168.0.119:5000";

export const getMahasiswaByNim = (nim) => axios.get(`${API_URL}/mahasiswa/${nim}`);
export const getAllMahasiswa   = () => axios.get(`${API_URL}/mahasiswa`);
export const addMahasiswa      = (data) => axios.post(`${API_URL}/mahasiswa`, data);
export const deleteMahasiswa   = (nim) => axios.delete(`${API_URL}/mahasiswa/${nim}`);
