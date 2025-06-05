import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Heart, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle,
  DollarSign,
  Calendar,
  TrendingUp,
  FileText,
  Download
} from 'lucide-react';
import { donService } from '@/services/adminService';
import { Don } from '@/types/admin';

const DonsAdminPage = () => {
  const [dons, setDons] = useState<Don[]>([]);
  const [filteredDons, setFilteredDons] = useState<Don[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedDon, setSelectedDon] = useState<Don | null>(null);
  const [showDonDialog, setShowDonDialog] = useState(false);

  // Statistiques
  const [stats, setStats] = useState({
    total: 0,
    totalMontant: 0,
    pendants: 0,
    valides: 0,
    rejetes: 0,
    montantValide: 0
  });

  useEffect(() => {
    loadDons();
  }, []);

  useEffect(() => {
    filterDons();
  }, [dons, searchTerm, statusFilter]);

  const loadDons = async () => {
    try {
      setLoading(true);
      const data = await donService.getAll();
      setDons(data);
      
      // Calculer les statistiques
      const statsData = {
        total: data.length,
        totalMontant: data.reduce((sum, don) => sum + don.montant, 0),
        pendants: data.filter(d => d.status === 'pending').length,
        valides: data.filter(d => d.status === 'validated').length,
        rejetes: data.filter(d => d.status === 'rejected').length,
        montantValide: data
          .filter(d => d.status === 'validated')
          .reduce((sum, don) => sum + don.montant, 0)
      };
      setStats(statsData);
    } catch (error) {
      console.error('Erreur lors du chargement des dons:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterDons = () => {
    let filtered = dons;

    // Filtrer par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(don =>
        don.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        don.montant.toString().includes(searchTerm)
      );
    }

    // Filtrer par statut
    if (statusFilter !== 'all') {
      filtered = filtered.filter(don => don.status === statusFilter);
    }

    // Trier par date (plus récent en premier)
    filtered.sort((a, b) => new Date(b.dateDon).getTime() - new Date(a.dateDon).getTime());

    setFilteredDons(filtered);
  };

  const handleViewDon = (don: Don) => {
    setSelectedDon(don);
    setShowDonDialog(true);
  };

  const handleStatusUpdate = async (donId: string, status: 'validated' | 'rejected') => {
    const confirmMessage = status === 'validated' 
      ? 'Êtes-vous sûr de vouloir valider ce don ?' 
      : 'Êtes-vous sûr de vouloir rejeter ce don ?';
    
    if (window.confirm(confirmMessage)) {
      try {
        await donService.updateStatus(donId, status);
        await loadDons();
        setShowDonDialog(false);
      } catch (error) {
        console.error('Erreur lors de la mise à jour du statut:', error);
      }
    }
  };

  const getStatusBadge = (status: Don['status']) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      validated: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };

    const labels = {
      pending: 'En attente',
      validated: 'Validé',
      rejected: 'Rejeté'
    };

    return (
      <Badge className={styles[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDownloadReceipt = (don: Don) => {
    // Simulation du téléchargement du reçu de paiement
    console.log(`Téléchargement du reçu: ${don.recuPaiement}`);
    // Dans une vraie application, cela ouvrirait/téléchargerait le fichier
    alert('Fonctionnalité de téléchargement à implémenter');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-crec-gold"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Dons</h1>
          <p className="text-gray-600">Gérez les dons reçus et validez les paiements</p>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Dons</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Montant Total</p>
                <p className="text-lg font-bold text-gray-900">{formatCurrency(stats.totalMontant)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">En Attente</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendants}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Validés</p>
                <p className="text-2xl font-bold text-gray-900">{stats.valides}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <XCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejetés</p>
                <p className="text-2xl font-bold text-gray-900">{stats.rejetes}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Montant Validé</p>
                <p className="text-lg font-bold text-gray-900">{formatCurrency(stats.montantValide)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par nom ou montant..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="validated">Validés</SelectItem>
                  <SelectItem value="rejected">Rejetés</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des dons */}
      <Card>
        <CardHeader>
          <CardTitle>Dons Reçus ({filteredDons.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredDons.length === 0 ? (
            <div className="text-center py-8">
              <Heart className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">Aucun don</h3>
              <p className="mt-1 text-sm text-gray-500">
                {dons.length === 0 ? 'Aucun don reçu pour le moment.' : 'Aucun don ne correspond aux critères de recherche.'}
              </p>
            </div>
          ) : (
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
                      Date
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
                  {filteredDons.map((don) => (
                    <tr key={don.id} className={don.status === 'pending' ? 'bg-yellow-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{don.nom}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-green-600">
                          {formatCurrency(don.montant)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(don.dateDon)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(don.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDon(don)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Voir
                          </Button>
                          
                          {don.status === 'pending' && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleStatusUpdate(don.id, 'validated')}
                                className="text-green-600 hover:text-green-800"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Valider
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleStatusUpdate(don.id, 'rejected')}
                                className="text-red-600 hover:text-red-800"
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Rejeter
                              </Button>
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
        </CardContent>
      </Card>

      {/* Dialog pour voir le don */}
      <Dialog open={showDonDialog} onOpenChange={setShowDonDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails du Don</DialogTitle>
          </DialogHeader>
          {selectedDon && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Nom du donateur</label>
                  <p className="font-semibold text-lg">{selectedDon.nom}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Montant</label>
                  <p className="font-bold text-2xl text-green-600">
                    {formatCurrency(selectedDon.montant)}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Date du don</label>
                  <p className="font-semibold">{formatDate(selectedDon.dateDon)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Statut</label>
                  <div className="mt-1">{getStatusBadge(selectedDon.status)}</div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Reçu de paiement</label>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium">{selectedDon.recuPaiement}</p>
                      <p className="text-sm text-gray-500">Fichier de justificatif</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadReceipt(selectedDon)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Télécharger
                  </Button>
                </div>
              </div>

              {selectedDon.status === 'pending' && (
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    onClick={() => handleStatusUpdate(selectedDon.id, 'validated')}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Valider le Don
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleStatusUpdate(selectedDon.id, 'rejected')}
                    className="flex-1"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Rejeter le Don
                  </Button>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDonDialog(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DonsAdminPage;
