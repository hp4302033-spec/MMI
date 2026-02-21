import { Link } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/clients', label: 'Clients' },
  { to: '/investments', label: 'Investments' }
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-mmi-primary text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-6">Market Minds Investment</h1>
      <nav className="space-y-2">
        {links.map((item) => (
          <Link key={item.to} to={item.to} className="block rounded-md px-3 py-2 hover:bg-blue-600 transition">
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
