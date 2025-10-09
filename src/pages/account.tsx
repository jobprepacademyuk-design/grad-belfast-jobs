import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { signOut } from '@/auth';
import { useNavigate } from 'react-router-dom';

type Profile = { id: string; name: string | null; plan: string };

export default function AccountPage() {
  const [email, setEmail] = useState<string>('');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { nav('/auth'); return; }
      setEmail(session.user.email || '');

      const { data, error } = await supabase
        .from('profiles')
        .select('id,name,plan')
        .eq('id', session.user.id)
        .single();
      if (error) { console.error(error); }
      setProfile(data || null);
      setLoading(false);
    })();
  }, [nav]);

  async function saveName() {
    if (!profile) return;
    const { error } = await supabase.from('profiles').update({ name: profile.name }).eq('id', profile.id);
    if (error) alert('Could not save name'); else alert('Saved!');
  }

  if (loading) return <div className="p-8 text-center">Loading…</div>;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-2xl shadow p-6 border">
        <h1 className="text-2xl font-bold mb-4">Account</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600">Email</label>
            <div className="mt-1">{email}</div>
          </div>

          <div>
            <label className="block text-sm text-gray-600">Name</label>
            <input
              className="mt-1 w-full border rounded-md px-3 py-2"
              value={profile?.name ?? ''}
              onChange={e => setProfile(p => p ? { ...p, name: e.target.value } : p)}
            />
            <button className="mt-2 rounded-md bg-primary text-white px-4 py-2" onClick={saveName}>
              Save
            </button>
          </div>

          <div>
            <label className="block text-sm text-gray-600">Current Plan</label>
            <div className="mt-1 font-semibold">{profile?.plan ?? 'Free'}</div>
          </div>
        </div>

        <div className="mt-6">
          <button
            className="rounded-md border px-4 py-2"
            onClick={async () => { await signOut(); nav('/auth'); }}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
