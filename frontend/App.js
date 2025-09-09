import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";
import DetailScreen from "./src/screens/DetailScreen";
import AddScreen from "./src/screens/AddScreen";
import DeleteScreen from "./src/screens/DeleteScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home"   component={HomeScreen}  options={{ title: "Cari Mahasiswa" }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: "Detail" }} />
        <Stack.Screen name="Add"    component={AddScreen}    options={{ title: "Tambah Mahasiswa" }} />
        <Stack.Screen name="Delete" component={DeleteScreen} options={{ title: "Hapus Mahasiswa" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
