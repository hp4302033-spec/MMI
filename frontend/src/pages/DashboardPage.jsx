import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Layout from '../components/Layout';
import { useDashboard } from '../hooks/useDashboard';

const colors = ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd'];

export default function DashboardPage() {
  const stats = useDashboard();
  if (!stats) return <Layout><p>Loading dashboard...</p></Layout>;

  return (
    <Layout>
      <h2 className="text-3xl font-bold text-mmi-primary mb-6">Advisor Dashboard</h2>
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card title="Total Clients" value={stats.totalClients} />
        <Card title="Total AUM" value={`₹${stats.totalAum.toLocaleString()}`} />
        <Card title="Monthly SIP" value={`₹${stats.monthlySipCollection.toLocaleString()}`} />
        <Card title="Pending SIP" value={`₹${stats.pendingSipAmount.toLocaleString()}`} />
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <section className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Scheme Allocation</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={stats.schemeAllocation} dataKey="value" nameKey="name" outerRadius={90}>
                {stats.schemeAllocation.map((_, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </section>
        <section className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Monthly Collection</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={stats.monthlyCollection}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#1e40af" />
            </BarChart>
          </ResponsiveContainer>
        </section>
      </div>
    </Layout>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white rounded shadow p-4 border-l-4 border-mmi-secondary">
      <p className="text-sm text-slate-600">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}
