import React from 'react';
import { AdminService } from '@/services/api';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { EditablePage } from '@/types';

const AdminPagesPage: React.FC = () => {
  const { logout } = useAdminAuth();
  const [pages, setPages] = React.useState<EditablePage[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    AdminService.getAllPages()
      .then(setPages)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Pages éditables</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Déconnexion</button>
      </div>
      {loading && <div>Chargement...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="p-2">Slug</th>
            <th className="p-2">Titre</th>
            <th className="p-2">Dernière modification</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pages.map(page => (
            <tr key={page.id} className="border-t">
              <td className="p-2">{page.slug}</td>
              <td className="p-2">{page.title}</td>
              <td className="p-2">{new Date(page.lastModified).toLocaleString()}</td>
              <td className="p-2">
                <a href={`/admin/pages/${page.slug}`} className="text-blue-600 underline">Éditer</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPagesPage;
