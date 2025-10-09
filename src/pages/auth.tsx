import { useState } from 'react';
import { signInWithEmail, signUpWithEmail } from '@/auth';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [mode, setMode] = useState<'signin'|'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'signup') {
        await signUpWithEmail(email, password, name || undefined);
      } else {
        await signInWithEmail(email, password);
      }
      nav('/account'); // go to account after auth
    } catch (err: any) {
      alert(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl shadow p-6 border">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">GradBelfast</h1>
          <p className="text-sm text-gray-600">Access your account to manage job applications</p>
        </div>

        <div className="flex rounded-lg overflow-hidden border mb-4">
          <button
            className={`flex-1 py-2 ${mode === 'signin' ? 'bg-blue-50 font-semibold' : ''}`}
            onClick={() => setMode('signin')}
          >
            Sign In
          </button>
          <button
            className={`flex-1 py-2 ${mode === 'signup' ? 'bg-blue-50 font-semibold' : ''}`}
            onClick={() => setMode('signup')}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input className="w-full border rounded-md px-3 py-2" value={name} onChange={e=>setName(e.target.value)} />
            </div>
          )}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input className="w-full border rounded-md px-3 py-2" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input className="w-full border rounded-md px-3 py-2" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          </div>
          <button className="w-full rounded-md bg-primary text-white py-2 font-semibold" disabled={loading}>
            {loading ? 'Please wait…' : (mode === 'signup' ? 'Create Account' : 'Sign In')}
          </button>
        </form>
      </div>
    </div>
  );
}
