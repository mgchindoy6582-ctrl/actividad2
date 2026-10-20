import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useAuth } from "../context/Authcontext";

function RootNavigator() {
  const { session, cargando } = useAuth();

  if (cargando) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#c71139" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Si no hay sesión, muestra el grupo de autenticación */}
      {!session ? (
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      ) : (
        /* Si hay sesión, muestra el grupo principal */
        <Stack.Screen name="app" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
