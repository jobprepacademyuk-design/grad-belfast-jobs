// src/pages/account.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

type Profile = {
  name: string | null;
  plan: string | null;
};

export default function AccountPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [nameEdit, setNameEdit] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load session + profile
  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        nav("/signin");
        return;
      }
      setEmail(session.user.email ?? "");

      // fetch profile row for this user
      const { data, error } = await supabase
        .from("profiles")
        .select("name, plan")
        .eq("id", session.user.id)
        .single();

      if (!error && data) {
        setProfile(data as Profile);
        setNameEdit((data.name ?? "") as string);
      }
      setLoading(false);
    })();
  }, [nav]);

  const saveName = async () => {
    setSaving(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { nav("/signin"); return; }

    const { error } = await supabase
      .from("profiles")
      .update({ name: nameEdit })
      .eq("id", session.user.id);

    if (!error) setProfile(p => (p ? { ...p, name: nameEdit } : { name: nameEdit, plan: "Free" }));
    setSaving(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    nav("/signin");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-sm text-gray-600">Loading account…</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-xl rounded-2xl border p-6 shadow">
          <h1 className="text-2xl font-bold mb-6">Your Account</h1>

          <div className="space-y-5">
            <div>
              <div className="text-sm text-gray-600">Email</div>
              <div className="mt-1">{email}</div>
            </div>

            <div>
              <div className="text-sm text-gray-600 mb-1">Name</div>
              <div className="flex gap-2">
                <input
                  className="w-full border rounded-md px-3 py-2"
                  value={nameEdit}
                  onChange={(e) => setNameEdit(e.target.value)}
                  placeholder="Your name"
                />
                <button
                  onClick={saveName}
                  disabled={saving}
                  className="rounded-md bg-primary text-white px-4 py-2 disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
              {profile?.name ? (
                <div className="text-xs text-gray-500 mt-1">Saved as: {profile.name}</div>
              ) : null}
            </div>

            <div>
              <div className="text-sm text-gray-600">Current Plan</div>
              <div className="mt-1 font-semibold">{profile?.plan ?? "Free"}</div>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => nav("/")}
              className="rounded-md border px-4 py-2"
            >
              Back to Dashboard
            </button>
            <button
              onClick={signOut}
              className="rounded-md border px-4 py-2"
            >
              Sign out
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
