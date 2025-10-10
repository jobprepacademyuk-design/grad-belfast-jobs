import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Profile = { name: string | null; plan: string | null };

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [prof, setProf] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { nav("/signin"); return; }
      setEmail(session.user.email || "");

      const { data, error } = await supabase
        .from("profiles")
        .select("name, plan")
        .eq("id", session.user.id)
        .single();

      if (!error) setProf(data as Profile);
      setLoading(false);
    })();
  }, [nav]);

  if (loading) return <div className="p-8 text-center">Loading…</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-xl rounded-2xl shadow p-6 border">
          <h1 className="text-2xl font-bold mb-4">Account</h1>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-600">Name</div>
              <div className="mt-1">{prof?.name ?? "—"}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Email</div>
              <div className="mt-1">{email}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Current Plan</div>
              <div className="mt-1 font-semibold">{prof?.plan ?? "Free"}</div>
            </div>
          </div>

          <button
            className="mt-6 rounded-md border px-4 py-2"
            onClick={async () => { await supabase.auth.signOut(); nav("/signin"); }}
          >
            Sign out
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
