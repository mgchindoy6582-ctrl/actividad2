
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

//import { supabase } from "../lib/supabase";//
import { supabase } from "../../lib/supabase";

export default function FormularioViaje() {
  const router = useRouter();

  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [destino, setDestino] = useState("");
  const [tipoViaje, setTipoViaje] = useState("");

  const [guardando, setGuardando] = useState(false);

  // Validar correo electrónico
  const validarCorreo = (email: string) => {
    const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresion.test(email);
  };

  // Guardar datos en Supabase
  const guardar = async () => {
    if (
      !nombre.trim() ||
      !correo.trim() ||
      !telefono.trim() ||
      !ciudad.trim() ||
      !destino.trim() ||
      !tipoViaje
    ) {
      Alert.alert("Atención", "Todos los campos son obligatorios");
      return;
    }

    if (!validarCorreo(correo)) {
      Alert.alert("Error", "Ingrese un correo electrónico válido");
      return;
    }

    if (!/^\d+$/.test(telefono.trim())) {
      Alert.alert("Error", "El teléfono debe contener solamente números");
      return;
    }

    if (telefono.trim().length < 7) {
      Alert.alert(
        "Error",
        "Ingrese un número de teléfono válido (mínimo 7 dígitos)"
      );
      return;
    }

    try {
      setGuardando(true);
// aqui esta la parte del insert
      const { data, error } = await supabase
        .from("clientes_agencia")
        .insert([
          {
            nombre: nombre.trim(),
            correo: correo.trim(),
            telefono: telefono.trim(),
            ciudad: ciudad.trim(),
            destino_favorito: destino.trim(),
            tipo_viaje: tipoViaje, // este fu el cambio
          },
        ])
        .select();

      if (error) {
        console.error("ERROR SUPABASE:", error);
        Alert.alert("Error al guardar", error.message);
        return;
      }

      const registro = data?.[0];

      if (!registro) {
        Alert.alert(
          "Error",
          "No fue posible recuperar la información guardada"
        );
        return;
      }

      // Enviar los datos a resultado.tsx
      router.push({
        pathname: "/resultado",
        params: {
          id: String(registro.id),
          nombre: registro.nombre,
          correo: registro.correo,
          telefono: registro.telefono,
          ciudad: registro.ciudad,
          destino: registro.destino_favorito,
          tipo_viaje: registro.tipo_viaje,
        },
      });

      // Limpiar formulario
      setNombre("");
      setCorreo("");
      setTelefono("");
      setCiudad("");
      setDestino("");
      setTipoViaje("");
    } catch (error) {
      console.error("ERROR INESPERADO:", error);
      Alert.alert(
        "Error",
        "No fue posible registrar tu solicitud de viaje"
      );
    } finally {
      setGuardando(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {/* ENCABEZADO */}
      <View style={styles.encabezado}>
        <View style={styles.iconoContainer}>
          <Text style={styles.iconoViaje}>✈️</Text>
        </View>

        <Text style={styles.titulo}>VIAJES.COM</Text>

        <Text style={styles.subtitulo}>
          Planifica tus próximas vacaciones con los mejores
          planes y tarifas.
        </Text>
      </View>

      {/* FORMULARIO */}
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Cotiza tu experiencia</Text>

        <Text style={styles.cardDescripcion}>
          Déjanos tus datos de contacto y el lugar al que
          sueñas viajar.
        </Text>

        {/* NOMBRE */}
        <Text style={styles.label}>Nombre completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Maria Chindoy"
          placeholderTextColor="#e82171"
          
          value={nombre}
          onChangeText={setNombre}
          autoCapitalize="words"
        />

        {/* CORREO */}
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: maria@correo.com"
          placeholderTextColor="#e82171"
      
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* TELÉFONO */}
        <Text style={styles.label}>Teléfono / WhatsApp</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 3001234567"
          placeholderTextColor="#e82171"
          
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
          maxLength={15}
        />

        {/* CIUDAD DE ORIGEN */}
        <Text style={styles.label}>Ciudad de origen</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Pasto, Bogotá, Cali..."
          placeholderTextColor="#e82171"
          value={ciudad}
          onChangeText={setCiudad}
          autoCapitalize="words"
        />

        {/* DESTINO */}
        <Text style={styles.label}>Destino deseado</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: San Andrés, Cancún, Roma..."
          placeholderTextColor="#e82171"
        
          value={destino}
          onChangeText={setDestino}
          autoCapitalize="words"
        />

        {/* TIPO DE VIAJE */}
        <Text style={styles.label}>Tipo de viaje</Text>

        <View style={styles.opciones}>
          {[
            "Aventura",
            "Playa",
            "Cultural",
            "Ecoturismo",
            "Otro",
          ].map((tipo) => (
            <Pressable
              key={tipo}
              style={[
                styles.opcion,
                tipoViaje === tipo && styles.opcionSeleccionada,
              ]}
              onPress={() => setTipoViaje(tipo)}
            >
              <Text
                style={[
                  styles.opcionTexto,
                  tipoViaje === tipo &&
                    styles.opcionTextoSeleccionada,
                ]}
              >
                {tipoViaje === tipo ? "✓ " : ""}
                {tipo}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* BOTÓN REGISTRAR */}
        <Pressable
          style={({ pressed }) => [
            styles.boton,
            pressed && styles.botonPresionado,
            guardando && styles.botonDesactivado,
          ]}
          onPress={guardar}
          disabled={guardando}
        >
          {guardando ? (
            <View style={styles.cargandoContainer}>
              <ActivityIndicator color="#FFFFFF" />
              <Text style={styles.botonTexto}>
                Registrando viaje...
              </Text>
            </View>
          ) : (
            <Text style={styles.botonTexto}>
              Solicitar cotización
            </Text>
          )}
        </Pressable>
      </View>

      {/* INFORMACIÓN */}
      <View style={styles.infoBox}>
        <View style={styles.infoIcono}>
          <Text style={styles.infoEmoji}>🌍</Text>
        </View>

        <View style={styles.infoContenido}>
          <Text style={styles.infoTitulo}>
            Asesoría personalizada
          </Text>
          <Text style={styles.infoTexto}>
            Un asesor de viajes se comunicará contigo vía
            WhatsApp o correo para presentarte paquetes a
            tu medida.
          </Text>
        </View>
      </View>

      {/* PIE */}
      <Text style={styles.footer}>
        VIAJES.COM · Tu aventura comienza aquí
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F0F5FA",
    padding: 20,
  },

  encabezado: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 25,
  },

  iconoContainer: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: "#DCE9F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  iconoViaje: {
    fontSize: 38,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#c41f2f",
    textAlign: "center",
  },

  subtitulo: {
    fontSize: 14,
    color: "#db2d6d",
    textAlign: "center",
    marginTop: 7,
    lineHeight: 21,
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#fc85a3",
    elevation: 4,
    shadowColor: "#820404",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },

  cardTitulo: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#cc1208",
    marginBottom: 4,
  },

  cardDescripcion: {
    color: "#dc1010",
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 20,
  },

  label: {
    color: "#9c2111",
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 7,
  },

  input: {
    backgroundColor: "#f9e4e9",
    borderWidth: 1,
    borderColor: "#ebcbd2",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 17,
    color: "#f43753",
    fontSize: 15,
  },

  opciones: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
    marginBottom: 18,
  },

  opcion: {
    backgroundColor: "#F8FAFD",
    borderWidth: 1,
    borderColor: "#e37d87",
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 14,
  },

  opcionSeleccionada: {
    backgroundColor: "#DCE9F6",
    borderColor: "#a00a0a",
  },

  opcionTexto: {
    color: "#c10b0b",
    fontSize: 14,
    fontWeight: "600",
  },

  opcionTextoSeleccionada: {
    color: "#121212",
  },

  boton: {
    backgroundColor: "#f73f3f",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 6,
    elevation: 2,
  },

  botonPresionado: {
    opacity: 0.85,
    backgroundColor: "#a10303",
  },

  botonDesactivado: {
    opacity: 0.65,
  },

  botonTexto: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },

  cargandoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  infoBox: {
    backgroundColor: "#e9abb9",
    padding: 17,
    borderRadius: 20,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  infoIcono: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },

  infoEmoji: {
    fontSize: 23,
  },

  infoContenido: {
    flex: 1,
  },

  infoTitulo: {
    color: "#c60404",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 3,
  },

  infoTexto: {
    color: "#ee0a0a",
    fontSize: 13,
    lineHeight: 18,
  },

  footer: {
    textAlign: "center",
    color: "#e97d7d",
    fontSize: 12,
    marginTop: 24,
    marginBottom: 10,
  },
});