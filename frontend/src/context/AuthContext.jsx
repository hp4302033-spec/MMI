import { createContext, useContext, useMemo, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('mmi_access_token', data.accessToken);
    setUser(data.user);
  };

  const logout = async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('mmi_access_token');
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout, setUser }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
