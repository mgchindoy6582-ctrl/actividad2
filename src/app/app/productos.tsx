import { StyleSheet, Text, View } from "react-native";

export default function ProductosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Productos / Vuelos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#FFF8FB" 
  },
  titulo: { 
    fontSize: 24, 
    fontWeight: "bold", 
    color: "#ae1e36" 
  },
});