import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://jwvkrzlejtlqxuatyfxi.supabase.co"; 
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3dmtyemxlanRscXh1YXR5ZnhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwMTI3MDksImV4cCI6MjEwNTU4ODcwOX0.08bhGrAr9qYaTNEnRlSlaQC5HJ9b_aoeesKInkRMk5s"; 

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      storage: AsyncStorage,
      persistSession: true,      // <--- Cambiado a true para que guarde la sesión
      autoRefreshToken: true,    // <--- Cambiado a true para refrescar el token
      detectSessionInUrl: false,
    },
  }
);