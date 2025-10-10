// src/auth.ts
import { supabase } from "@/integrations/supabase/client";

export async function signUpWithEmail(email: string, password: string, name?: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;

  const user = data.user;
  if (user) {
    const { error: profileError } = await supabase
      .from("profiles")
      .upsert({ id: user.id, name }, { onConflict: "id" });
    if (profileError) throw profileError;
  }

  return user;
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.user;
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function signOut() {
  await supabase.auth.signOut();
}
