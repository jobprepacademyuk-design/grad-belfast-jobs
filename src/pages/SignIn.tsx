import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export default function SignIn() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        const user = data.user;
        // If email confirmations are ON, user may be null until they confirm
        if (user) {
          // Ensure the profile row exists for the authenticated user
          const { error: profileError } = await supabase
            .from("profiles")
            .upsert({ id: user.id, name }, { onConflict: "id" });
          if (profileError) throw profileError;
          nav("/account");
        } else {
          alert("Check your inbox to confirm your email, then sign in.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        nav("/account");
      }
    } catch (err: any) {
      alert(err.message || "Auth error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl shadow p-6 border">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">GradBelfast</h1>
            <p className="text-sm text-gray-600">Access your account to manage job applications</p>
          </div>

          <div className="flex rounded-lg overflow-hidden border mb-4">
            <button
              className={`flex-1 py-2 ${mode === "signin" ? "bg-blue-50 font-semibold" : ""}`}
              onClick={() => setMode("signin")}
              type="button"
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-2 ${mode === "signup" ? "bg-blue-50 font-semibold" : ""}`}
              onClick={() => setMode("signup")}
              type="button"
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input
                  className="w-full border rounded-md px-3 py-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                />
              </div>
            )}
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                className="w-full border rounded-md px-3 py-2"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                className="w-full border rounded-md px-3 py-2"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
              />
            </div>
            <button
              className="w-full rounded-md bg-primary text-white py-2 font-semibold"
              disabled={loading}
            >
              {loading ? "Please wait…" : mode === "signup" ? "Create Account" : "Sign In"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
