import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

export default function ClientsPage() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    api.get('/clients?limit=20').then((res) => setClients(res.data.data));
  }, []);

  return (
    <Layout>
      <h2 className="text-2xl font-bold text-mmi-primary mb-4">Client Management</h2>
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-blue-50">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">PAN</th>
              <th className="p-3 text-left">Risk</th>
              <th className="p-3 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client._id} className="border-t">
                <td className="p-3">{client.fullName}</td>
                <td className="p-3">{client.panNumber}</td>
                <td className="p-3 capitalize">{client.riskProfile}</td>
                <td className="p-3">{client.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
