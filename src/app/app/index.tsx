import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

function BotonHorizontal({
  icono,
  titulo,
  colorFondo,
  onPress,
}: {
  icono: string;
  titulo: string;
  colorFondo: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.botonColumna,
        { backgroundColor: colorFondo },
        pressed && styles.botonPresionado,
      ]}
      onPress={onPress}
    >
      <View style={styles.iconoContenedor}>
        <Text style={styles.iconoTexto}>{icono}</Text>
      </View>
      <Text style={styles.botonTitulo} numberOfLines={2}>
        {titulo}
      </Text>
    </Pressable>
  );
}

export default function Inicio() {
  const router = useRouter();

  // Función para cerrar sesión (Paso 12.2)
  const cerrarSesion = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* PORTADA PRINCIPAL */}
      <View style={styles.hero}>
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrybtgTF561wAwJsipPxqrpg2iZxxNkaLsievhxa_hhdp5oZgaVHQ3dQU&s=10",
          }}
          style={styles.imagenHero}
        />
        <View style={styles.overlay}>
          <Text style={styles.etiqueta}>
            AGENCIA DE VIAJES
          </Text>
          <Text style={styles.titulo}>Viajes.com</Text>
          <Text style={styles.subtitulo}>
            Planea tus vacaciones ahora....
          </Text>
        </View>
      </View>

      {/* BIENVENIDA */}
      <View style={styles.saludoBox}>
        <View>
          <Text style={styles.saludoTitulo}>
            ¡Hola viajero!
          </Text>
          <Text style={styles.saludoTexto}>
            ¿Cuál es tu proximo destino?
          </Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>✈️</Text>
          <Text style={styles.avatarTexto}>🚌</Text>
        </View>
      </View>

      {/* RESUMEN */}
      <View style={styles.resumen}>
        <View style={styles.resumenItem}>
          <Text style={styles.resumenNumero}>+40</Text>
          <Text style={styles.resumenTexto}>Destinos</Text>
        </View>

        <View style={styles.separador} />

        <View style={styles.resumenItem}>
          <Text style={styles.resumenNumero}>24/7</Text>
          <Text style={styles.resumenTexto}>Soporte</Text>
        </View>

        <View style={styles.separador} />

        <View style={styles.resumenItem}>
          <Text style={styles.resumenNumero}>100%</Text>
          <Text style={styles.resumenTexto}>Seguro</Text>
        </View>
      </View>

      {/* SERVICIOS */}
      <Text style={styles.seccionTitulo}>
        Servicios de Viaje
      </Text>

      {/* LOS 4 BOTONES EN UNA FILA */}
      <View style={styles.filaBotones}>
        <BotonHorizontal
          icono="📝"
          titulo="Formulario"
          colorFondo="#cf0906"
          onPress={() => router.push("../app/formulario")}
        />

        <BotonHorizontal
          icono="🏝️"
          titulo="Galería"
          colorFondo="#df390b"
          onPress={() => router.push("../app/imagenes")}
        />

        <BotonHorizontal
          icono="📍"
          titulo="Contacto"
          colorFondo="#a0270c"
          onPress={() => router.push("../app/contacto")}
        />

        <BotonHorizontal
          icono="📋"
          titulo="Registros"
          colorFondo="#B71C1C"
          onPress={() => router.push("../app/registros" as any)}
        />
      </View>

      {/* BOTÓN DE CERRAR SESIÓN (Paso 12.3) */}
      <Pressable
        style={styles.botonCerrar}
        onPress={cerrarSesion}
      >
        <Text style={styles.textoCerrar}>Cerrar sesión</Text>
      </Pressable>

      {/* PIE DE PÁGINA */}
      <Text style={styles.footer}>
        Viajes.com · Desarrollo Móvil
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F0F7FA",
    padding: 16,
  },

  hero: {
    height: 250,
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 4,
  },

  imagenHero: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 18,
    backgroundColor: "rgba(206, 13, 13, 0.78)",
  },

  etiqueta: {
    color: "#cd2f1a",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1.6,
    marginBottom: 4,
  },

  titulo: {
    color: "#f7f3f3",
    fontSize: 27,
    fontWeight: "bold",
    marginBottom: 4,
  },

  subtitulo: {
    color: "#E1F2FB",
    fontSize: 13,
    lineHeight: 18,
  },

  saludoBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    elevation: 2,
  },

  saludoTitulo: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#c7211b",
  },

  saludoTexto: {
    marginTop: 2,
    color: "#e71e1e",
    fontSize: 13,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E1F1FB",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarTexto: {
    fontSize: 20,
  },

  resumen: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 18,
    elevation: 2,
  },

  resumenItem: {
    flex: 1,
    alignItems: "center",
  },

  resumenNumero: {
    color: "#b52a0e",
    fontSize: 17,
    fontWeight: "bold",
  },

  resumenTexto: {
    color: "#b52313",
    fontSize: 12,
    marginTop: 2,
  },

  separador: {
    width: 1,
    height: 26,
    backgroundColor: "#DCEBF2",
  },

  seccionTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8d2333",
    marginBottom: 12,
  },

  // CUATRO BOTONES EN UNA FILA
  filaBotones: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 6,
  },

  botonColumna: {
    flex: 1,
    height: 100,
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 2,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },

  botonPresionado: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },

  iconoContenedor: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "rgba(233, 17, 17, 0.91)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },

  iconoTexto: {
    fontSize: 19,
  },

  botonTitulo: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },

  // ESTILOS PARA EL BOTÓN CERRAR SESIÓN (Paso 12.4)
  botonCerrar: {
    backgroundColor: "#8E3B46",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
  },
  textoCerrar: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  footer: {
    textAlign: "center",
    color: "#e31e0f",
    fontSize: 12,
    marginTop: 20,
    marginBottom: 8,
  },
});