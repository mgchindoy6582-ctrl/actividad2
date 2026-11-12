import { useRouter } from "expo-router";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { supabase } from "../../lib/supabase";

export default function HomeScreen() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        Alert.alert("Error", error.message);
        return;
      }
      router.replace("/auth/login");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Viajes.com</Text>
        <Text style={styles.subtitulo}>Planea tus vacaciones ahora....</Text>
      </View>

      {/* Tarjeta de bienvenida */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>¡Hola viajero!</Text>
        <Text style={styles.cardText}>¿Cuál es tu próximo destino?</Text>
      </View>

      {/* Botones de navegación a tus otras vistas */}
      <View style={styles.menuGrid}>
        <TouchableOpacity style={styles.menuButton} onPress={() => router.push("/app/formulario")}>
          <Text style={styles.menuText}>Formulario</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={() => router.push("/app/imagenes")}>
          <Text style={styles.menuText}>Galería</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={() => router.push("/app/contacto")}>
          <Text style={styles.menuText}>Contacto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={() => router.push("/app/registros")}>
          <Text style={styles.menuText}>Registros</Text>
        </TouchableOpacity>

        {/* Nuevos botones agregados */}
        <TouchableOpacity style={styles.menuButton} onPress={() => router.push("/app/detalle" as any)}>
          <Text style={styles.menuText}>Detalle</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={() => router.push("/app/catalogo" as any)}>
          <Text style={styles.menuText}>Catálogo</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.menuButton, styles.menuButtonFull]} 
          onPress={() => router.push("/app/escanear" as any)}
        >
          <Text style={styles.menuText}>Escanear</Text>
        </TouchableOpacity>
      </View>

      {/* Botón de Cerrar Sesión */}
      <TouchableOpacity style={styles.botonCerrar} onPress={handleSignOut}>
        <Text style={styles.textoCerrar}>Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8FB", padding: 20 },
  header: { marginTop: 40, marginBottom: 20, alignItems: "center" },
  titulo: { fontSize: 32, fontWeight: "bold", color: "#ae1e36" },
  subtitulo: { fontSize: 14, color: "#e90f4d", marginTop: 4 },
  card: { backgroundColor: "#FFFFFF", padding: 20, borderRadius: 16, marginBottom: 20, borderWidth: 1, borderColor: "#db7b9b" },
  cardTitle: { fontSize: 20, fontWeight: "bold", color: "#ae1e36" },
  cardText: { fontSize: 14, color: "#666", marginTop: 5 },
  menuGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 20 },
  menuButton: { width: "48%", backgroundColor: "#ae1438e1", padding: 20, borderRadius: 14, alignItems: "center", marginBottom: 15 },
  menuButtonFull: { width: "100%" },
  menuText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 16 },
  botonCerrar: { backgroundColor: "#8E3B46", padding: 14, borderRadius: 14, alignItems: "center", marginTop: 10, marginBottom: 40 },
  textoCerrar: { color: "#FFFFFF", fontWeight: "bold", fontSize: 16 },
});