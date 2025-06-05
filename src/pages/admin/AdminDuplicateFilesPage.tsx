import React, { useState, useEffect } from 'react';
import { Trash2, Search, AlertTriangle, HardDrive, FileText, Image, Video, Archive, RefreshCw } from 'lucide-react';

interface FileInfo {
  id: string;
  name: string;
  path: string;
  size: number;
  hash: string;
  type: 'image' | 'video' | 'document' | 'archive' | 'other';
  lastModified: string;
  createdAt: string;
}

interface DuplicateGroup {
  hash: string;
  totalSize: number;
  files: FileInfo[];
  selectedForDeletion: string[];
}

const AdminDuplicateFilesPage: React.FC = () => {
  const [duplicateGroups, setDuplicateGroups] = useState<DuplicateGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState<string>('all');
  const [stats, setStats] = useState({
    totalDuplicates: 0,
    totalWastedSpace: 0,
    scannedFiles: 0
  });

  useEffect(() => {
    calculateStats();
  }, [duplicateGroups]);

  const scanForDuplicates = async () => {
    try {
      setScanning(true);
      
      // Simuler le scan des fichiers
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Générer des données de test pour les fichiers en double
      const mockDuplicates: DuplicateGroup[] = [
        {
          hash: 'abc123',
          totalSize: 5242880, // 5MB
          files: [
            {
              id: '1',
              name: 'presentation.pdf',
              path: '/uploads/documents/presentation.pdf',
              size: 2621440,
              hash: 'abc123',
              type: 'document',
              lastModified: '2024-01-15T10:30:00Z',
              createdAt: '2024-01-10T09:00:00Z'
            },
            {
              id: '2',
              name: 'presentation_copy.pdf',
              path: '/uploads/documents/backup/presentation_copy.pdf',
              size: 2621440,
              hash: 'abc123',
              type: 'document',
              lastModified: '2024-01-15T10:30:00Z',
              createdAt: '2024-01-12T14:20:00Z'
            }
          ],
          selectedForDeletion: []
        },
        {
          hash: 'def456',
          totalSize: 15728640, // 15MB
          files: [
            {
              id: '3',
              name: 'logo.png',
              path: '/uploads/images/logo.png',
              size: 5242880,
              hash: 'def456',
              type: 'image',
              lastModified: '2024-01-20T15:45:00Z',
              createdAt: '2024-01-18T11:30:00Z'
            },
            {
              id: '4',
              name: 'logo_backup.png',
              path: '/uploads/images/backup/logo_backup.png',
              size: 5242880,
              hash: 'def456',
              type: 'image',
              lastModified: '2024-01-20T15:45:00Z',
              createdAt: '2024-01-19T09:15:00Z'
            },
            {
              id: '5',
              name: 'logo_old.png',
              path: '/uploads/temp/logo_old.png',
              size: 5242880,
              hash: 'def456',
              type: 'image',
              lastModified: '2024-01-20T15:45:00Z',
              createdAt: '2024-01-17T16:00:00Z'
            }
          ],
          selectedForDeletion: []
        },
        {
          hash: 'ghi789',
          totalSize: 104857600, // 100MB
          files: [
            {
              id: '6',
              name: 'formation_video.mp4',
              path: '/uploads/videos/formation_video.mp4',
              size: 52428800,
              hash: 'ghi789',
              type: 'video',
              lastModified: '2024-01-25T12:00:00Z',
              createdAt: '2024-01-22T10:00:00Z'
            },
            {
              id: '7',
              name: 'formation_video_duplicate.mp4',
              path: '/uploads/videos/temp/formation_video_duplicate.mp4',
              size: 52428800,
              hash: 'ghi789',
              type: 'video',
              lastModified: '2024-01-25T12:00:00Z',
              createdAt: '2024-01-23T14:30:00Z'
            }
          ],
          selectedForDeletion: []
        }
      ];
      
      setDuplicateGroups(mockDuplicates);
    } catch (error) {
      console.error('Erreur lors du scan:', error);
      alert('Erreur lors du scan des fichiers');
    } finally {
      setScanning(false);
    }
  };

  const calculateStats = () => {
    const totalDuplicates = duplicateGroups.reduce((sum, group) => sum + group.files.length - 1, 0);
    const totalWastedSpace = duplicateGroups.reduce((sum, group) => {
      const fileSize = group.files[0]?.size || 0;
      return sum + (fileSize * (group.files.length - 1));
    }, 0);
    const scannedFiles = duplicateGroups.reduce((sum, group) => sum + group.files.length, 0);

    setStats({
      totalDuplicates,
      totalWastedSpace,
      scannedFiles
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="h-5 w-5 text-green-500" />;
      case 'video': return <Video className="h-5 w-5 text-red-500" />;
      case 'document': return <FileText className="h-5 w-5 text-blue-500" />;
      case 'archive': return <Archive className="h-5 w-5 text-yellow-500" />;
      default: return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const toggleFileSelection = (groupHash: string, fileId: string) => {
    setDuplicateGroups(prev => prev.map(group => {
      if (group.hash === groupHash) {
        const isSelected = group.selectedForDeletion.includes(fileId);
        return {
          ...group,
          selectedForDeletion: isSelected 
            ? group.selectedForDeletion.filter(id => id !== fileId)
            : [...group.selectedForDeletion, fileId]
        };
      }
      return group;
    }));
  };

  const selectAllDuplicatesExceptOldest = (groupHash: string) => {
    setDuplicateGroups(prev => prev.map(group => {
      if (group.hash === groupHash) {
        // Trier par date de création et garder le plus ancien
        const sortedFiles = [...group.files].sort((a, b) => 
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        const filesToDelete = sortedFiles.slice(1).map(f => f.id);
        
        return {
          ...group,
          selectedForDeletion: filesToDelete
        };
      }
      return group;
    }));
  };

  const selectAllDuplicatesExceptNewest = (groupHash: string) => {
    setDuplicateGroups(prev => prev.map(group => {
      if (group.hash === groupHash) {
        // Trier par date de modification et garder le plus récent
        const sortedFiles = [...group.files].sort((a, b) => 
          new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
        );
        const filesToDelete = sortedFiles.slice(1).map(f => f.id);
        
        return {
          ...group,
          selectedForDeletion: filesToDelete
        };
      }
      return group;
    }));
  };

  const deleteSelectedFiles = async () => {
    const selectedFiles = duplicateGroups.flatMap(group => 
      group.selectedForDeletion.map(fileId => 
        group.files.find(f => f.id === fileId)
      ).filter(Boolean)
    );

    if (selectedFiles.length === 0) {
      alert('Aucun fichier sélectionné pour la suppression');
      return;
    }

    const confirmMessage = `Êtes-vous sûr de vouloir supprimer ${selectedFiles.length} fichier(s) ?\n\nCette action est irréversible.`;
    if (!confirm(confirmMessage)) return;

    try {
      setDeleting(true);
      
      // Simuler la suppression
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mettre à jour la liste en supprimant les fichiers sélectionnés
      setDuplicateGroups(prev => 
        prev.map(group => ({
          ...group,
          files: group.files.filter(file => !group.selectedForDeletion.includes(file.id)),
          selectedForDeletion: []
        })).filter(group => group.files.length > 1) // Supprimer les groupes avec moins de 2 fichiers
      );

      alert(`${selectedFiles.length} fichier(s) supprimé(s) avec succès`);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression des fichiers');
    } finally {
      setDeleting(false);
    }
  };

  const filteredGroups = duplicateGroups.filter(group => {
    // Filtre par terme de recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const hasMatch = group.files.some(file => 
        file.name.toLowerCase().includes(term) ||
        file.path.toLowerCase().includes(term)
      );
      if (!hasMatch) return false;
    }

    // Filtre par type de fichier
    if (fileTypeFilter !== 'all') {
      const hasType = group.files.some(file => file.type === fileTypeFilter);
      if (!hasType) return false;
    }

    return true;
  });

  const totalSelectedFiles = duplicateGroups.reduce((sum, group) => sum + group.selectedForDeletion.length, 0);

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des Fichiers en Double</h1>
            <p className="text-gray-600 mt-1">
              Détectez et supprimez automatiquement les fichiers dupliqués
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={scanForDuplicates}
              disabled={scanning}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${scanning ? 'animate-spin' : ''}`} />
              {scanning ? 'Scan en cours...' : 'Scanner'}
            </button>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <div className="text-2xl font-bold text-red-600">{stats.totalDuplicates}</div>
              <div className="text-sm text-gray-600">Fichiers en double</div>
            </div>
            <FileText className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <div className="text-2xl font-bold text-orange-600">
                {formatFileSize(stats.totalWastedSpace)}
              </div>
              <div className="text-sm text-gray-600">Espace gaspillé</div>
            </div>
            <HardDrive className="h-8 w-8 text-orange-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <div className="text-2xl font-bold text-blue-600">{stats.scannedFiles}</div>
              <div className="text-sm text-gray-600">Fichiers analysés</div>
            </div>
            <Search className="h-8 w-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom de fichier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <select
              value={fileTypeFilter}
              onChange={(e) => setFileTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous les types</option>
              <option value="image">Images</option>
              <option value="video">Vidéos</option>
              <option value="document">Documents</option>
              <option value="archive">Archives</option>
              <option value="other">Autres</option>
            </select>
          </div>
        </div>
      </div>

      {/* Actions globales */}
      {duplicateGroups.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {totalSelectedFiles} fichier(s) sélectionné(s) pour suppression
            </div>
            <div className="flex space-x-3">
              <button
                onClick={deleteSelectedFiles}
                disabled={deleting || totalSelectedFiles === 0}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {deleting ? 'Suppression...' : 'Supprimer la sélection'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Liste des groupes de doublons */}
      <div className="space-y-4">
        {filteredGroups.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-500">
              {duplicateGroups.length === 0 
                ? 'Aucun scan effectué. Cliquez sur "Scanner" pour détecter les doublons.'
                : 'Aucun doublon trouvé avec les filtres actuels.'
              }
            </div>
          </div>
        ) : (
          filteredGroups.map((group) => (
            <div key={group.hash} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-red-600">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      <span className="font-semibold">Groupe de doublons</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {group.files.length} fichiers • {formatFileSize(group.files[0]?.size || 0)} chacun
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => selectAllDuplicatesExceptOldest(group.hash)}
                      className="text-xs px-3 py-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                    >
                      Garder le plus ancien
                    </button>
                    <button
                      onClick={() => selectAllDuplicatesExceptNewest(group.hash)}
                      className="text-xs px-3 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200"
                    >
                      Garder le plus récent
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {group.files.map((file) => (
                  <div key={file.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={group.selectedForDeletion.includes(file.id)}
                        onChange={() => toggleFileSelection(group.hash, file.id)}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      {getFileIcon(file.type)}
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          {file.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {file.path}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right text-xs text-gray-500">
                      <div>Modifié: {new Date(file.lastModified).toLocaleDateString('fr-FR')}</div>
                      <div>Créé: {new Date(file.createdAt).toLocaleDateString('fr-FR')}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDuplicateFilesPage;
