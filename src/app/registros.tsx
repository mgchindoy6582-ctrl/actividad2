
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

type Cliente = {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
  ciudad: string;
  destino_favorito: string;
  tipo_viaje: string;
};

export default function Registros() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarRegistros = useCallback(async () => {
    setCargando(true);
    setError("");

    const { data, error } = await supabase
      .from("clientes_agencia")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      setError(error.message);
      setClientes([]);
    } else {
      setClientes((data || []) as Cliente[]);
    }

    setCargando(false);
  }, []);

  useEffect(() => {
    cargarRegistros();
  }, [cargarRegistros]);

  return (
    <ScrollView
      style={styles.fondo}
      contentContainerStyle={styles.container}
    >
      {/* ENCABEZADO */}
      <View style={styles.encabezado}>
        <Text style={styles.icono}>📋</Text>
        <Text style={styles.titulo}>Registros</Text>
        <Text style={styles.subtitulo}>
          Viajeros registrados
        </Text>
        <Text style={styles.descripcion}>
          Consulta la información de las personas que
          han registrado sus viajes en VIAJES.COM.
        </Text>
      </View>

      {/* TOTAL DE REGISTROS */}
      <View style={styles.resumen}>
        <Text style={styles.resumenNumero}>
          {clientes.length}
        </Text>
        <Text style={styles.resumenTexto}>
          Viajeros registrados
        </Text>
      </View>

      {/* BOTÓN ACTUALIZAR */}
      <Pressable
        style={styles.botonActualizar}
        onPress={cargarRegistros}
      >
        <Text style={styles.botonActualizarTexto}>
          🔄 Actualizar registros
        </Text>
      </Pressable>

      {/* CARGANDO */}
      {cargando ? (
        <View style={styles.cargando}>
          <ActivityIndicator size="large" color="#C62828" />
          <Text style={styles.mensaje}>
            Cargando registros...
          </Text>
        </View>
      ) : error ? (
        /* ERROR */
        <View style={styles.vacio}>
          <Text style={styles.vacioIcono}>⚠️</Text>
          <Text style={styles.vacioTitulo}>
            Error al cargar los registros
          </Text>
          <Text style={styles.mensaje}>{error}</Text>
        </View>
      ) : clientes.length === 0 ? (
        /* SIN REGISTROS */
        <View style={styles.vacio}>
          <Text style={styles.vacioIcono}>🧳</Text>
          <Text style={styles.vacioTitulo}>
            No hay viajeros registrados
          </Text>
          <Text style={styles.mensaje}>
            Cuando registres un viajero, sus datos
            aparecerán aquí.
          </Text>
        </View>
      ) : (
        /* LISTA DE CLIENTES */
        clientes.map((cliente) => (
          <View style={styles.card} key={cliente.id}>
            <View style={styles.cardEncabezado}>
              <View style={styles.avatar}>
                <Text style={styles.avatarTexto}>👤</Text>
              </View>

              <View style={styles.datosNombre}>
                <Text style={styles.nombre}>
                  {cliente.nombre}
                </Text>
                <Text style={styles.ciudad}>
                  {cliente.ciudad}
                </Text>
              </View>

              <View style={styles.id}>
                <Text style={styles.idTexto}>
                  #{cliente.id}
                </Text>
              </View>
            </View>

            <View style={styles.separador} />

            <Text style={styles.label}>Correo electrónico</Text>
            <Text style={styles.valor}>{cliente.correo}</Text>

            <Text style={styles.label}>Teléfono</Text>
            <Text style={styles.valor}>{cliente.telefono}</Text>

            <Text style={styles.label}>Ciudad de origen</Text>
            <Text style={styles.valor}>{cliente.ciudad}</Text>

            <Text style={styles.label}>Destino deseado</Text>
            <Text style={styles.destino}>
              {cliente.destino_favorito}
            </Text>

            <Text style={styles.label}>Tipo de viaje</Text>
            <View style={styles.tipoContenedor}>
              <Text style={styles.tipoTexto}>
                {cliente.tipo_viaje || "No especificado"}
              </Text>
            </View>
          </View>
        ))
      )}

      <Text style={styles.footer}>
        VIAJES.COM · Desarrollo Móvil
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  container: {
    padding: 20,
    paddingBottom: 35,
  },

  encabezado: {
    alignItems: "center",
    marginTop: 25,
    marginBottom: 20,
  },

  icono: {
    fontSize: 42,
    marginBottom: 5,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#B71C1C",
  },

  subtitulo: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#D32F2F",
    marginTop: 8,
  },

  descripcion: {
    fontSize: 14,
    color: "#795555",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 21,
  },

  resumen: {
    backgroundColor: "#FDECEC",
    borderRadius: 18,
    padding: 17,
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#F5B5B5",
  },

  resumenNumero: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#C62828",
  },

  resumenTexto: {
    fontSize: 14,
    color: "#8B0000",
    fontWeight: "600",
  },

  botonActualizar: {
    backgroundColor: "#C62828",
    padding: 13,
    borderRadius: 13,
    alignItems: "center",
    marginBottom: 20,
  },

  botonActualizarTexto: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },

  cargando: {
    alignItems: "center",
    padding: 30,
  },

  mensaje: {
    color: "#795555",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 21,
  },

  vacio: {
    backgroundColor: "#FFFFFF",
    padding: 25,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F5B5B5",
  },

  vacioIcono: {
    fontSize: 35,
  },

  vacioTitulo: {
    color: "#B71C1C",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F5B5B5",
    marginBottom: 17,
    elevation: 3,
    shadowColor: "#8B0000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
  },

  cardEncabezado: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FDECEC",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarTexto: {
    fontSize: 24,
    color: "#C62828",
  },

  datosNombre: {
    flex: 1,
    marginLeft: 12,
  },

  nombre: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#8B0000",
  },

  ciudad: {
    fontSize: 13,
    color: "#795555",
    marginTop: 4,
  },

  id: {
    backgroundColor: "#FDECEC",
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },

  idTexto: {
    color: "#C62828",
    fontWeight: "bold",
    fontSize: 12,
  },

  separador: {
    height: 1,
    backgroundColor: "#F5B5B5",
    marginVertical: 14,
  },

  label: {
    color: "#B71C1C",
    fontSize: 13,
    marginTop: 9,
  },

  valor: {
    color: "#333333",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 3,
  },

  destino: {
    color: "#8B0000",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 4,
  },

  tipoContenedor: {
    backgroundColor: "#FDECEC",
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginTop: 5,
  },

  tipoTexto: {
    color: "#C62828",
    fontWeight: "bold",
    fontSize: 14,
  },

  footer: {
    textAlign: "center",
    color: "#B71C1C",
    fontSize: 12,
    marginTop: 15,
  },
});