import { useEffect, useState } from 'react';
import api from '../services/api';

export const useDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/dashboard').then((res) => setStats(res.data));
  }, []);

  return stats;
};
