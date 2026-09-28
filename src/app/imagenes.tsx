import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Imagenes() {
  const imagenes = [
    {
      id: 1,
      titulo: "Aventura",
      uri: "https://picsum.photos/700/420?1",
    },
    {
      id: 2,
      titulo: "Inspiración",
      uri: "https://picsum.photos/700/420?2",
    },
    {
      id: 3,
      titulo: "Cultua",
      uri: "https://picsum.photos/700/420?3",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Galería</Text>
      <Text style={styles.subtitulo}>
        Imágenes cargadas desde internet.
      </Text>

      {imagenes.map((item) => (
        <View style={styles.card} key={item.id}>
          <Image source={{ uri: item.uri }} style={styles.imagen} />
          <Text style={styles.descripcion}>{item.titulo}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFF7FA",
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#6C4051",
  },

  subtitulo: {
    textAlign: "center",
    color: "#8A727C",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#F2D5E0",
    elevation: 3,
  },

  imagen: {
    width: "100%",
    height: 210,
  },

  descripcion: {
    padding: 14,
    color: "#684552",
    fontWeight: "600",
  },
});
