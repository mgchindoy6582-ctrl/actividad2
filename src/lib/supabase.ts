import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://jwvkrzlejtlqxuatyfxi.supabase.co"; 
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3dmtyemxlanRscXh1YXR5ZnhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwMTI3MDksImV4cCI6MjEwNTU4ODcwOX0.08bhGrAr9qYaTNEnRlSlaQC5HJ9b_aoeesKInkRMk5s"; 

const webStorage = {
  getItem: async (key: string) =>
    typeof window === "undefined" ? null : window.localStorage.getItem(key),
  setItem: async (key: string, value: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, value);
    }
  },
  removeItem: async (key: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }
  },
};

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      storage: Platform.OS === "web" ? webStorage : AsyncStorage,
      persistSession: true,      // <--- Cambiado a true para que guarde la sesión
      autoRefreshToken: true,    // <--- Cambiado a true para refrescar el token
      detectSessionInUrl: false,
    },
  }
);