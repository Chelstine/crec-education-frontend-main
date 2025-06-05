import React, { useState, useEffect } from 'react';
import { Heart, TrendingUp, Calendar, DollarSign, Users, Eye, Filter, Search } from 'lucide-react';
import { Donation } from '@/types';
import { DonationService } from '@/services/api';

interface DonationStats {
  totalAmount: number;
  totalDonations: number;
  monthlyTotal: number;
  averageDonation: number;
}

const AdminDonationsPage: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<Donation[]>([]);
  const [stats, setStats] = useState<DonationStats>({
    totalAmount: 0,
    totalDonations: 0,
    monthlyTotal: 0,
    averageDonation: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [amountFilter, setAmountFilter] = useState<string>('all');

  useEffect(() => {
    loadDonations();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [donations, searchTerm, dateFilter, amountFilter]);

  const loadDonations = async () => {
    try {
      setLoading(true);
      const data = await DonationService.getDonations();
      setDonations(data);
      calculateStats(data);
    } catch (error) {
      console.error('Erreur lors du chargement des dons:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (donationsData: Donation[]) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const totalAmount = donationsData.reduce((sum, donation) => sum + donation.amount, 0);
    const totalDonations = donationsData.length;
    
    const monthlyDonations = donationsData.filter(donation => {
      const donationDate = new Date(donation.createdAt);
      return donationDate.getMonth() === currentMonth && donationDate.getFullYear() === currentYear;
    });
    const monthlyTotal = monthlyDonations.reduce((sum, donation) => sum + donation.amount, 0);
    
    const averageDonation = totalDonations > 0 ? totalAmount / totalDonations : 0;

    setStats({
      totalAmount,
      totalDonations,
      monthlyTotal,
      averageDonation
    });
  };

  const applyFilters = () => {
    let filtered = [...donations];

    // Filtre par terme de recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(donation => 
        donation.firstName.toLowerCase().includes(term) ||
        donation.lastName.toLowerCase().includes(term) ||
        donation.email.toLowerCase().includes(term) ||
        donation.company?.toLowerCase().includes(term)
      );
    }

    // Filtre par date
    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          filterDate.setMonth(now.getMonth() - 3);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      filtered = filtered.filter(donation => new Date(donation.createdAt) >= filterDate);
    }

    // Filtre par montant
    if (amountFilter !== 'all') {
      switch (amountFilter) {
        case 'small':
          filtered = filtered.filter(donation => donation.amount <= 50);
          break;
        case 'medium':
          filtered = filtered.filter(donation => donation.amount > 50 && donation.amount <= 200);
          break;
        case 'large':
          filtered = filtered.filter(donation => donation.amount > 200);
          break;
      }
    }

    // Trier par date décroissante
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    setFilteredDonations(filtered);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const getDonationTypeText = (type: string) => {
    switch (type) {
      case 'one-time': return 'Ponctuel';
      case 'monthly': return 'Mensuel';
      case 'annual': return 'Annuel';
      default: return type;
    }
  };

  const getMonthlyData = () => {
    const monthlyData: { [key: string]: number } = {};
    const last12Months = [];
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthlyData[key] = 0;
      last12Months.push({
        key,
        label: date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
      });
    }

    donations.forEach(donation => {
      const date = new Date(donation.createdAt);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (monthlyData.hasOwnProperty(key)) {
        monthlyData[key] += donation.amount;
      }
    });

    return last12Months.map(month => ({
      ...month,
      amount: monthlyData[month.key]
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const monthlyData = getMonthlyData();
  const maxMonthlyAmount = Math.max(...monthlyData.map(d => d.amount));

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Visualisation des Dons</h1>
            <p className="text-gray-600 mt-1">
              Suivez les dons reçus et leur évolution
            </p>
          </div>
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-red-500 mr-2" />
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(stats.totalAmount)}
              </div>
              <div className="text-sm text-gray-600">Total collecté</div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <div className="text-2xl font-bold text-gray-900">{stats.totalDonations}</div>
              <div className="text-sm text-gray-600">Total des dons</div>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(stats.monthlyTotal)}
              </div>
              <div className="text-sm text-gray-600">Ce mois-ci</div>
            </div>
            <Calendar className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(stats.averageDonation)}
              </div>
              <div className="text-sm text-gray-600">Don moyen</div>
            </div>
            <DollarSign className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <div className="text-2xl font-bold text-gray-900">
                {donations.filter(d => d.donationType === 'monthly').length}
              </div>
              <div className="text-sm text-gray-600">Dons récurrents</div>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Graphique mensuel */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Évolution mensuelle des dons</h2>
        <div className="h-64 flex items-end space-x-2">
          {monthlyData.map((month, index) => (
            <div key={month.key} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-blue-500 rounded-t-sm transition-all hover:bg-blue-600"
                style={{
                  height: maxMonthlyAmount > 0 ? `${(month.amount / maxMonthlyAmount) * 200}px` : '4px',
                  minHeight: '4px'
                }}
                title={`${month.label}: ${formatCurrency(month.amount)}`}
              ></div>
              <div className="text-xs text-gray-600 mt-2 transform -rotate-45 origin-center whitespace-nowrap">
                {month.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <Filter className="h-5 w-5 text-gray-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Filtres</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, email ou entreprise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filtre par date */}
          <div>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Toutes les dates</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="quarter">Ce trimestre</option>
              <option value="year">Cette année</option>
            </select>
          </div>

          {/* Filtre par montant */}
          <div>
            <select
              value={amountFilter}
              onChange={(e) => setAmountFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous les montants</option>
              <option value="small">≤ 50€</option>
              <option value="medium">51€ - 200€</option>
              <option value="large">&gt; 200€</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des dons */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Historique des dons ({filteredDonations.length})
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDonations.map((donation) => (
                <tr key={donation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {donation.firstName} {donation.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {donation.email}
                        {donation.company && (
                          <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {donation.company}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">
                      {formatCurrency(donation.amount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      {getDonationTypeText(donation.donationType)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(donation.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedDonation(donation);
                        setShowDetailsModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                      title="Voir les détails"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal des détails */}
      {showDetailsModal && selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full m-4 max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Détails du don
              </h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom complet</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedDonation.firstName} {selectedDonation.lastName}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedDonation.email}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedDonation.phone || 'Non renseigné'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Entreprise</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedDonation.company || 'Particulier'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Montant</label>
                  <p className="mt-1 text-lg font-semibold text-green-600">
                    {formatCurrency(selectedDonation.amount)}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type de don</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {getDonationTypeText(selectedDonation.donationType)}
                  </p>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedDonation.message || 'Aucun message'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date du don</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(selectedDonation.createdAt).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Anonyme</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedDonation.isAnonymous ? 'Oui' : 'Non'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDonationsPage;
