import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const onSubmit = async (e) => {
    e.preventDefault();
    await login(form.email, form.password);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white">
      <form onSubmit={onSubmit} className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-4">
        <h2 className="text-2xl font-semibold text-mmi-primary">MMI Secure Login</h2>
        <input className="w-full border p-2 rounded" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full border p-2 rounded" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="w-full bg-mmi-primary text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
