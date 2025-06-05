import React, { useState, useEffect } from 'react';
import { Download, Filter, Calendar, Users, FileText, AlertCircle } from 'lucide-react';
import { UniversityProgram, UniversityApplication } from '@/types';
import { FormationService } from '@/services/api';

const AdminExportPage: React.FC = () => {
  const [programs, setPrograms] = useState<UniversityProgram[]>([]);
  const [applications, setApplications] = useState<UniversityApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<UniversityApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applications, selectedProgram, selectedStatus, dateFrom, dateTo]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [programsData, applicationsData] = await Promise.all([
        FormationService.getUniversityPrograms(),
        FormationService.getUniversityApplications()
      ]);
      setPrograms(programsData);
      setApplications(applicationsData);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...applications];

    // Filtre par programme
    if (selectedProgram !== 'all') {
      filtered = filtered.filter(app => app.programId === selectedProgram);
    }

    // Filtre par statut
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(app => app.status === selectedStatus);
    }

    // Filtre par date
    if (dateFrom) {
      filtered = filtered.filter(app => new Date(app.applicationDate) >= new Date(dateFrom));
    }
    if (dateTo) {
      filtered = filtered.filter(app => new Date(app.applicationDate) <= new Date(dateTo));
    }

    setFilteredApplications(filtered);
  };

  const exportToCSV = async () => {
    try {
      setExporting(true);
      
      // Préparer les données pour l'export
      const exportData = filteredApplications.map(app => {
        const program = programs.find(p => p.id === app.programId);
        const nameParts = app.applicantName.split(' ');
        return {
          'Nom': nameParts.slice(-1)[0] || '',
          'Prénom': nameParts.slice(0, -1).join(' ') || '',
          'Email': app.applicantEmail,
          'Téléphone': app.applicantPhone || '',
          'Filière': program?.name || '',
          'Niveau d\'études': app.previousDegree || '',
          'Statut': app.status === 'submitted' ? 'Soumise' : 
                   app.status === 'accepted' ? 'Acceptée' : 
                   app.status === 'rejected' ? 'Rejetée' :
                   app.status === 'under_review' ? 'En cours d\'examen' :
                   app.status === 'enrolled' ? 'Inscrit' : app.status,
          'Date de soumission': new Date(app.applicationDate).toLocaleDateString('fr-FR'),
          'Institution précédente': app.previousInstitution || '',
          'Année diplôme': app.graduationYear || ''
        };
      });

      // Créer le CSV
      const headers = Object.keys(exportData[0] || {});
      const csvContent = [
        headers.join(','),
        ...exportData.map(row => 
          headers.map(header => `"${(row as any)[header] || ''}"`).join(',')
        )
      ].join('\n');

      // Télécharger le fichier
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      
      const programName = selectedProgram === 'all' ? 'toutes-filieres' : 
                         programs.find(p => p.id === selectedProgram)?.name.replace(/\s+/g, '-').toLowerCase() || 'filiere';
      const date = new Date().toISOString().split('T')[0];
      link.download = `inscriptions-${programName}-${date}.csv`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
    } finally {
      setExporting(false);
    }
  };

  const exportToExcel = async () => {
    try {
      setExporting(true);
      
      // Pour une vraie implémentation, vous pourriez utiliser une bibliothèque comme xlsx
      // Ici, nous simulons avec un format CSV amélioré
      const exportData = filteredApplications.map(app => {
        const program = programs.find(p => p.id === app.programId);
        const nameParts = app.applicantName.split(' ');
        const birthDate = app.dateOfBirth ? new Date(app.dateOfBirth) : null;
        const age = birthDate ? Math.floor((Date.now() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : '';
        
        return {
          'Nom': nameParts.slice(-1)[0] || '',
          'Prénom': nameParts.slice(0, -1).join(' ') || '',
          'Email': app.applicantEmail,
          'Téléphone': app.applicantPhone || '',
          'Filière': program?.name || '',
          'Niveau d\'études': app.previousDegree || '',
          'Statut': app.status === 'submitted' ? 'Soumise' : 
                   app.status === 'accepted' ? 'Acceptée' : 
                   app.status === 'rejected' ? 'Rejetée' :
                   app.status === 'under_review' ? 'En cours d\'examen' :
                   app.status === 'enrolled' ? 'Inscrit' : app.status,
          'Date de soumission': new Date(app.applicationDate).toLocaleDateString('fr-FR'),
          'Âge': age,
          'Adresse': app.address || '',
          'Institution précédente': app.previousInstitution || '',
          'Année diplôme': app.graduationYear || ''
        };
      });

      const headers = Object.keys(exportData[0] || {});
      const csvContent = [
        headers.join('\t'), // Utiliser des tabulations pour Excel
        ...exportData.map(row => 
          headers.map(header => `"${(row as any)[header] || ''}"`).join('\t')
        )
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/tab-separated-values;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      
      const programName = selectedProgram === 'all' ? 'toutes-filieres' : 
                         programs.find(p => p.id === selectedProgram)?.name.replace(/\s+/g, '-').toLowerCase() || 'filiere';
      const date = new Date().toISOString().split('T')[0];
      link.download = `inscriptions-${programName}-${date}.xls`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Erreur lors de l\'export Excel:', error);
    } finally {
      setExporting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'accepted': return 'Accepté';
      case 'rejected': return 'Rejeté';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Export des Inscriptions</h1>
            <p className="text-gray-600 mt-1">
              Exportez les listes d'inscrits par filière pour l'université
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-1" />
              {filteredApplications.length} inscription(s)
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <Filter className="h-5 w-5 text-gray-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Filtres</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Filtre par programme */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filière
            </label>
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Toutes les filières</option>
              {programs.map(program => (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              ))}
            </select>
          </div>

          {/* Filtre par statut */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Statut
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="accepted">Accepté</option>
              <option value="rejected">Rejeté</option>
            </select>
          </div>

          {/* Date de début */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date de début
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date de fin */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date de fin
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Actions d'export */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Exporter les données</h2>
            <p className="text-gray-600 text-sm">
              Téléchargez la liste des inscriptions selon vos filtres
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={exportToCSV}
              disabled={exporting || filteredApplications.length === 0}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              {exporting ? 'Export...' : 'Export CSV'}
            </button>
            <button
              onClick={exportToExcel}
              disabled={exporting || filteredApplications.length === 0}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FileText className="h-4 w-4 mr-2" />
              {exporting ? 'Export...' : 'Export Excel'}
            </button>
          </div>
        </div>

        {filteredApplications.length === 0 && (
          <div className="flex items-center justify-center py-8 text-gray-500">
            <AlertCircle className="h-5 w-5 mr-2" />
            Aucune inscription ne correspond aux filtres sélectionnés
          </div>
        )}
      </div>

      {/* Aperçu des données */}
      {filteredApplications.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Aperçu des données</h2>
            <p className="text-gray-600 text-sm">
              Prévisualisation des {Math.min(10, filteredApplications.length)} premières inscriptions
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Filière
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.slice(0, 10).map((application) => {
                  const program = programs.find(p => p.id === application.programId);
                  return (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {application.applicantName}
                          </div>
                          <div className="text-sm text-gray-500">{application.applicantEmail}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {program?.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                          {getStatusText(application.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(application.applicationDate).toLocaleDateString('fr-FR')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {filteredApplications.length > 10 && (
            <div className="px-6 py-3 bg-gray-50 text-center text-sm text-gray-500">
              Et {filteredApplications.length - 10} inscription(s) supplémentaire(s)...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminExportPage;
