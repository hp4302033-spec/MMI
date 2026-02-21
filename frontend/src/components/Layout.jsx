import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
