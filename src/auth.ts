import { supabase } from '@/integrations/supabase/client';

export async function signUpWithEmail(email: string, password: string, name?: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;

  // optional: set display name
  if (name && data.user) {
    await supabase.from('profiles').update({ name }).eq('id', data.user.id);
  }
  return data.user;
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
