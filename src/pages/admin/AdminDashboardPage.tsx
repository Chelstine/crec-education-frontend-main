import React from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { AdminService } from '@/services/api';

const AdminDashboardPage: React.FC = () => {
  const { admin, logout } = useAdminAuth();
  const [stats, setStats] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    AdminService.getDashboardStats()
      .then(setStats)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard Admin</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Déconnexion</button>
      </div>
      {loading && <div>Chargement...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} className="bg-white rounded shadow p-4 text-center">
              <div className="text-2xl font-bold">{String(value)}</div>
              <div className="text-gray-600 text-sm">{key}</div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-10">
        <a href="/admin/users" className="text-blue-600 underline mr-6">Gérer les utilisateurs</a>
        <a href="/admin/pages" className="text-blue-600 underline">Gérer les pages éditables</a>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
