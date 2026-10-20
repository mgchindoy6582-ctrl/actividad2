import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#6B4234" },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Coffee App" }} />
      <Stack.Screen name="formulario" options={{ title: "Registro" }} />
      <Stack.Screen name="resultado" options={{ title: "Resultado" }} />
      <Stack.Screen name="registros" options={{ title: "Coffee Lovers" }} />
      <Stack.Screen name="imagenes" options={{ title: "Imágenes" }} />
      <Stack.Screen name="contacto" options={{ title: "Contacto" }} />
    </Stack>
  );
}
