import React, { useState, useEffect } from 'react';
import { Search, Eye, Trash2, Calendar, Clock, Users, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { ReservationFabLab } from '@/types/admin';
import { reservationFabLabService } from '@/services/adminService';

const ReservationsAdminPage: React.FC = () => {
  const [reservations, setReservations] = useState<ReservationFabLab[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<ReservationFabLab[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<ReservationFabLab | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadReservations();
  }, []);

  useEffect(() => {
    filterReservations();
  }, [reservations, searchTerm, statusFilter]);

  const loadReservations = async () => {
    try {
      setIsLoading(true);
      const data = await reservationFabLabService.getAll();
      setReservations(data);
    } catch (error) {
      console.error('Erreur lors du chargement des réservations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterReservations = () => {
    let filtered = reservations;

    if (searchTerm) {
      filtered = filtered.filter(reservation => 
        reservation.utilisateur.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.machine.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(reservation => reservation.status === statusFilter);
    }

    setFilteredReservations(filtered);
  };

  const handleSave = async (reservationData: Partial<ReservationFabLab>) => {
    try {
      if (isEditing && selectedReservation) {
        await adminService.updateReservationFabLab(selectedReservation.id, reservationData);
      } else {
        await adminService.createReservationFabLab(reservationData);
      }
      await loadReservations();
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'confirmee' | 'annulee' | 'terminee') => {
    try {
      await adminService.updateReservationFabLab(id, { statut: newStatus });
      await loadReservations();
    } catch (error) {
      console.error('Erreur lors du changement de statut:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      try {
        await adminService.deleteReservationFabLab(id);
        await loadReservations();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  const openModal = (reservation?: ReservationFabLab) => {
    setSelectedReservation(reservation || null);
    setIsEditing(!!reservation);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReservation(null);
    setIsEditing(false);
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'en_attente': return 'bg-yellow-100 text-yellow-800';
      case 'confirmee': return 'bg-green-100 text-green-800';
      case 'annulee': return 'bg-red-100 text-red-800';
      case 'terminee': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (statut: string) => {
    switch (statut) {
      case 'en_attente': return 'En attente';
      case 'confirmee': return 'Confirmée';
      case 'annulee': return 'Annulée';
      case 'terminee': return 'Terminée';
      default: return statut;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Réservations FabLab</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Nouvelle Réservation
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher par nom, email ou équipement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="w-full md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="en_attente">En attente</option>
              <option value="confirmee">Confirmée</option>
              <option value="annulee">Annulée</option>
              <option value="terminee">Terminée</option>
            </select>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-gray-900">{reservations.length}</div>
          <div className="text-sm text-gray-600">Total réservations</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-yellow-600">
            {reservations.filter(r => r.status === 'active').length}
          </div>
          <div className="text-sm text-gray-600">En attente</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-green-600">
            {reservations.filter(r => r.status === 'completed').length}
          </div>
          <div className="text-sm text-gray-600">Confirmées</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-blue-600">
            {reservations.filter(r => r.status === 'cancelled').length}
          </div>
          <div className="text-sm text-gray-600">Terminées</div>
        </div>
      </div>

      {/* Reservations List */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Équipement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Heure
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durée
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{reservation.utilisateur}</div>
                      <div className="text-sm text-gray-500">Clé: {reservation.cleAbonnement}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{reservation.machine}</div>
                    {reservation.projet && (
                      <div className="text-sm text-gray-500">Projet: {reservation.projet}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{new Date(reservation.dateReservation).toLocaleDateString()}</div>
                    <div>{reservation.heureDebut} - {reservation.heureFin}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {reservation.duree}h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reservation.statut)}`}>
                      {getStatusText(reservation.statut)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {reservation.statut === 'en_attente' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(reservation.id, 'confirmee')}
                            className="text-green-600 hover:text-green-900"
                            title="Confirmer"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(reservation.id, 'annulee')}
                            className="text-red-600 hover:text-red-900"
                            title="Annuler"
                          >
                            <Clock className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => openModal(reservation)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openModal(reservation)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(reservation.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <ReservationModal
          reservation={selectedReservation}
          isEditing={isEditing}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

interface ReservationModalProps {
  reservation: ReservationFabLab | null;
  isEditing: boolean;
  onSave: (data: Partial<ReservationFabLab>) => void;
  onClose: () => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({ reservation, isEditing, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    nomUtilisateur: reservation?.nomUtilisateur || '',
    emailUtilisateur: reservation?.emailUtilisateur || '',
    equipement: reservation?.equipement || '',
    dateReservation: reservation?.dateReservation || new Date().toISOString().split('T')[0],
    heureDebut: reservation?.heureDebut || '',
    heureFin: reservation?.heureFin || '',
    duree: reservation?.duree || 1,
    projet: reservation?.projet || '',
    statut: reservation?.statut || 'en_attente',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            {isEditing ? 'Modifier la réservation' : 'Nouvelle réservation'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom utilisateur *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nomUtilisateur}
                  onChange={(e) => setFormData({ ...formData, nomUtilisateur: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email utilisateur *
                </label>
                <input
                  type="email"
                  required
                  value={formData.emailUtilisateur}
                  onChange={(e) => setFormData({ ...formData, emailUtilisateur: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Équipement *
              </label>
              <input
                type="text"
                required
                value={formData.equipement}
                onChange={(e) => setFormData({ ...formData, equipement: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de réservation *
                </label>
                <input
                  type="date"
                  required
                  value={formData.dateReservation}
                  onChange={(e) => setFormData({ ...formData, dateReservation: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heure début *
                </label>
                <input
                  type="time"
                  required
                  value={formData.heureDebut}
                  onChange={(e) => setFormData({ ...formData, heureDebut: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heure fin *
                </label>
                <input
                  type="time"
                  required
                  value={formData.heureFin}
                  onChange={(e) => setFormData({ ...formData, heureFin: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Durée (heures) *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max="8"
                  value={formData.duree}
                  onChange={(e) => setFormData({ ...formData, duree: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Statut *
                </label>
                <select
                  required
                  value={formData.statut}
                  onChange={(e) => setFormData({ ...formData, statut: e.target.value as 'en_attente' | 'confirmee' | 'annulee' | 'terminee' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="en_attente">En attente</option>
                  <option value="confirmee">Confirmée</option>
                  <option value="annulee">Annulée</option>
                  <option value="terminee">Terminée</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Projet (optionnel)
              </label>
              <input
                type="text"
                value={formData.projet}
                onChange={(e) => setFormData({ ...formData, projet: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nom du projet si applicable"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {isEditing ? 'Modifier' : 'Créer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationsAdminPage;
