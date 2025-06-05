import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Eye,
  FileText,
  Calendar
} from 'lucide-react';
import { inscriptionFormationOuverteService } from '@/services/adminService';
import { InscriptionFormationOuverte } from '@/types/admin';

const InscriptionDetailModal: React.FC<{
  inscription: InscriptionFormationOuverte;
  onClose: () => void;
}> = ({ inscription, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Détails de l'inscription
          </h2>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Informations personnelles */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Informations personnelles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <p className="mt-1 text-sm text-gray-900">{inscription.nom}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Prénom</label>
                <p className="mt-1 text-sm text-gray-900">{inscription.prenom}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900">{inscription.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                <p className="mt-1 text-sm text-gray-900">{inscription.telephone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Formation choisie</label>
                <p className="mt-1 text-sm text-gray-900">{inscription.formation}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date d'inscription</label>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(inscription.dateInscription).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
          </div>

          {/* Reçu de paiement */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Reçu de paiement
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FileText className="h-4 w-4" />
              <span>{inscription.recuPaiement}</span>
            </div>
          </div>

          {/* Statut */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Statut
            </h3>
            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
              inscription.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : inscription.status === 'validated'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {inscription.status === 'pending' && 'En attente'}
              {inscription.status === 'validated' && 'Validée'}
              {inscription.status === 'rejected' && 'Refusée'}
            </span>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

const InscriptionsFormationsOuvertesAdminPage: React.FC = () => {
  const [inscriptions, setInscriptions] = useState<InscriptionFormationOuverte[]>([]);
  const [filteredInscriptions, setFilteredInscriptions] = useState<InscriptionFormationOuverte[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInscription, setSelectedInscription] = useState<InscriptionFormationOuverte | null>(null);

  useEffect(() => {
    loadInscriptions();
  }, []);

  useEffect(() => {
    let filtered = inscriptions;

    // Filtrer par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(inscription =>
        inscription.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inscription.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inscription.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inscription.formation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrer par statut
    if (statusFilter !== 'all') {
      filtered = filtered.filter(inscription => inscription.status === statusFilter);
    }

    setFilteredInscriptions(filtered);
  }, [inscriptions, searchTerm, statusFilter]);

  const loadInscriptions = async () => {
    try {
      const data = await inscriptionFormationOuverteService.getAll();
      setInscriptions(data);
    } catch (error) {
      console.error('Erreur lors du chargement des inscriptions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: 'validated' | 'rejected') => {
    try {
      await inscriptionFormationOuverteService.updateStatus(id, status);
      await loadInscriptions();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      validated: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    
    const labels = {
      pending: 'En attente',
      validated: 'Validée',
      rejected: 'Refusée'
    };

    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3">
          <Users className="h-6 w-6 text-green-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Inscriptions Formations Ouvertes
            </h1>
            <p className="text-gray-600">
              Gérer les inscriptions aux formations ouvertes
            </p>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom, email, formation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="validated">Validées</option>
                <option value="rejected">Refusées</option>
              </select>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-800">
              {inscriptions.filter(i => i.status === 'pending').length}
            </div>
            <div className="text-sm text-yellow-600">En attente</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-800">
              {inscriptions.filter(i => i.status === 'validated').length}
            </div>
            <div className="text-sm text-green-600">Validées</div>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-800">
              {inscriptions.filter(i => i.status === 'rejected').length}
            </div>
            <div className="text-sm text-red-600">Refusées</div>
          </div>
        </div>
      </div>

      {/* Liste des inscriptions */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {filteredInscriptions.length === 0 ? (
          <div className="p-6 text-center">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune inscription</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Aucune inscription ne correspond à vos critères.' 
                : 'Aucune inscription reçue pour le moment.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Formation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date d'inscription
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInscriptions.map((inscription) => (
                  <tr key={inscription.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {inscription.prenom} {inscription.nom}
                        </div>
                        <div className="text-sm text-gray-500">
                          {inscription.email}
                        </div>
                        <div className="text-sm text-gray-500">
                          {inscription.telephone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {inscription.formation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        {new Date(inscription.dateInscription).toLocaleDateString('fr-FR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(inscription.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setSelectedInscription(inscription)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Voir les détails"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        
                        {inscription.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(inscription.id, 'validated')}
                              className="text-green-600 hover:text-green-900 p-1"
                              title="Valider"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(inscription.id, 'rejected')}
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Refuser"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Groupement par formation */}
      {filteredInscriptions.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Répartition par formation
          </h2>
          <div className="space-y-3">
            {Object.entries(
              filteredInscriptions.reduce((acc, inscription) => {
                const formation = inscription.formation;
                if (!acc[formation]) {
                  acc[formation] = { total: 0, pending: 0, validated: 0, rejected: 0 };
                }
                acc[formation].total++;
                acc[formation][inscription.status as keyof typeof acc[string]]++;
                return acc;
              }, {} as Record<string, { total: number; pending: number; validated: number; rejected: number }>)
            ).map(([formation, stats]) => (
              <div key={formation} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{formation}</h3>
                  <span className="text-sm text-gray-500">Total: {stats.total}</span>
                </div>
                <div className="flex space-x-4 text-sm">
                  <span className="text-yellow-600">En attente: {stats.pending}</span>
                  <span className="text-green-600">Validées: {stats.validated}</span>
                  <span className="text-red-600">Refusées: {stats.rejected}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal de détails */}
      {selectedInscription && (
        <InscriptionDetailModal
          inscription={selectedInscription}
          onClose={() => setSelectedInscription(null)}
        />
      )}
    </div>
  );
};

export default InscriptionsFormationsOuvertesAdminPage;
