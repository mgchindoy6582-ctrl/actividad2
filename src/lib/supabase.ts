import { createClient } from "@supabase/supabase-js"; // esta es una funcion que crea el cliente de conexion a supabase
import "react-native-url-polyfill/auto"; //agrega al react native funciones para procesar direcciones url

const supabaseUrl = "https://jwvkrzlejtlqxuatyfxi.supabase.co";   //aqui trauemos la url de nuestra base de datos
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3dmtyemxlanRscXh1YXR5ZnhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwMTI3MDksImV4cCI6MjEwNTU4ODcwOX0.08bhGrAr9qYaTNEnRlSlaQC5HJ9b_aoeesKInkRMk5s" ;   // aqui taremos la url de supabase

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
);
