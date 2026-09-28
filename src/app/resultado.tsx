
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Resultado() {
  const router = useRouter();

  const {
    nombre,
    correo,
    telefono,
    ciudad,
    destino,
    tipo_viaje,
  } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.icono}>✈️</Text>

      <Text style={styles.titulo}>
        ¡Solicitud registrada!
      </Text>

      <Text style={styles.subtitulo}>
        Estos son los datos de tu próxima aventura.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>
          🌸 Información del viajero
        </Text>

        <Text style={styles.label}>Nombre completo</Text>
        <Text style={styles.valor}>{nombre}</Text>

        <Text style={styles.label}>Correo electrónico</Text>
        <Text style={styles.valor}>{correo}</Text>

        <Text style={styles.label}>Teléfono</Text>
        <Text style={styles.valor}>{telefono}</Text>

        <Text style={styles.label}>Ciudad de origen</Text>
        <Text style={styles.valor}>{ciudad}</Text>

        <Text style={styles.label}>Destino deseado</Text>
        <Text style={styles.valor}>{destino}</Text>

        <Text style={styles.label}>Tipo de viaje</Text>
        <Text style={styles.tipoViaje}>
          {tipo_viaje}
        </Text>
      </View>

      <Text style={styles.mensaje}>
        ¡Gracias por elegir VIAJES.COM!
        Pronto nos comunicaremos contigo.
      </Text>

      <Pressable
        style={styles.boton}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.botonTexto}>
          Volver al inicio
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7FA",
    justifyContent: "center",
    padding: 20,
  },

  icono: {
    fontSize: 42,
    textAlign: "center",
    marginBottom: 8,
  },

  titulo: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#6C4051",
    textAlign: "center",
  },

  subtitulo: {
    color: "#8A727C",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F2D5E0",
    marginBottom: 16,
    elevation: 3,
  },

  cardTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6C4051",
    marginBottom: 12,
  },

  label: {
    color: "#A06C80",
    fontSize: 13,
    marginTop: 7,
  },

  valor: {
    color: "#563C46",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },

  tipoViaje: {
    color: "#C04F7B",
    fontSize: 17,
    fontWeight: "bold",
    backgroundColor: "#FCE7F0",
    padding: 10,
    borderRadius: 10,
    marginTop: 4,
  },

  mensaje: {
    color: "#8A727C",
    textAlign: "center",
    fontSize: 13,
    marginBottom: 16,
  },

  boton: {
    backgroundColor: "#C96A8B",
    padding: 14,
    borderRadius: 13,
    alignItems: "center",
  },

  botonTexto: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});