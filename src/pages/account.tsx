// src/pages/Account.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

export default function AccountPage() {
  const [email, setEmail] = useState<string>("");
  const [name] = useState<string>("");   // placeholder for now
  const [plan] = useState<string>("Free"); // placeholder for now
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { nav("/signin"); return; }
      setEmail(session.user.email || "");
      setLoading(false);
    })();
  }, [nav]);

  if (loading) return <div className="p-8 text-center">Loading…</div>;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-2xl shadow p-6 border">
        <h1 className="text-2xl font-bold mb-4">Account</h1>
        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-600">Name</div>
            <div className="mt-1">{name || "—"}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Email</div>
            <div className="mt-1">{email}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Current Plan</div>
            <div className="mt-1 font-semibold">{plan}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
