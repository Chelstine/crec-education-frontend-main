import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { useToast } from '../../../hooks/use-toast';
import { useApi } from '../../../hooks/useApi';
import { Loader2, Plus, Edit, Trash2, School, Calendar, Users, Upload } from 'lucide-react';

interface Program {
  id: string;
  title: string;
  description?: string;
  image?: string;
  competences?: string[];
  debouches?: string[];
  profil?: string;
  type: 'licence' | 'master' | 'doctorat';
  duree?: string;
  inscrits?: number;
  capacite?: number;
  fraisInscription?: number;
  statut: 'active' | 'inactive';
}

interface RentreeScolaire {
  id: string;
  anneeAcademique: string;
  dateDebutCours: string;
  periodeInscriptionDebut: string;
  periodeInscriptionFin: string;
  placesParFiliere: { [filiereId: string]: number };
}

interface AdminContenusISTMPageProps {}

const AdminContenusISTMPage: React.FC<AdminContenusISTMPageProps> = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [rentreeScolaire, setRentreeScolaire] = useState<RentreeScolaire[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedRentree, setSelectedRentree] = useState<RentreeScolaire | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'programs' | 'rentree'>('programs');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    competences: [] as string[],
    debouches: [] as string[],
    profil: '',
    type: 'licence' as 'licence' | 'master' | 'doctorat',
    duree: '',
    inscrits: 0,
    capacite: 0,
    fraisInscription: 0,
    statut: 'active' as 'active' | 'inactive'
  });

  const [rentreeFormData, setRentreeFormData] = useState({
    anneeAcademique: '',
    dateDebutCours: '',
    periodeInscriptionDebut: '',
    periodeInscriptionFin: '',
    placesParFiliere: {} as { [key: string]: number }
  });

  const [newCompetence, setNewCompetence] = useState('');
  const [newDebouche, setNewDebouche] = useState('');

  const api = useApi();
  const { toast } = useToast();

  useEffect(() => {
    loadPrograms();
    loadRentreeScolaire();
  }, []);

  const loadPrograms = async () => {
    try {
      setIsLoading(true);
      const data = await api.get('/programs');
      setPrograms(Array.isArray(data) ? data : []);
    } catch (error) {
      // Utiliser des données par défaut au lieu d'afficher une erreur
      setPrograms([]);
      console.log('API non disponible, utilisation de données par défaut');
    } finally {
      setIsLoading(false);
    }
  };

  const loadRentreeScolaire = async () => {
    try {
      const data = await api.get('/rentree-scolaire');
      setRentreeScolaire(Array.isArray(data) ? data : []);
    } catch (error) {
      // Utiliser des données par défaut
      setRentreeScolaire([]);
      console.log('API non disponible pour rentrée scolaire');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    try {
      setIsSubmitting(true);
      if (selectedProgram) {
        await api.put(`/programs/${selectedProgram.id}`, formData);
        toast({
          title: "Succès",
          description: "Programme modifié avec succès"
        });
      } else {
        await api.post('/programs', formData);
        toast({
          title: "Succès",
          description: "Programme créé avec succès"
        });
      }
      await loadPrograms();
      resetForm();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRentreeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rentreeFormData.anneeAcademique.trim()) return;

    try {
      setIsSubmitting(true);
      if (selectedRentree) {
        await api.put(`/rentree-scolaire/${selectedRentree.id}`, rentreeFormData);
        toast({
          title: "Succès",
          description: "Rentrée scolaire modifiée avec succès"
        });
      } else {
        await api.post('/rentree-scolaire', rentreeFormData);
        toast({
          title: "Succès",
          description: "Rentrée scolaire créée avec succès"
        });
      }
      await loadRentreeScolaire();
      resetRentreeForm();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (program: Program) => {
    setSelectedProgram(program);
    setFormData({
      title: program.title,
      description: program.description || '',
      image: program.image || '',
      competences: program.competences || [],
      debouches: program.debouches || [],
      profil: program.profil || '',
      type: program.type || 'licence',
      duree: program.duree || '',
      inscrits: program.inscrits || 0,
      capacite: program.capacite || 0,
      fraisInscription: program.fraisInscription || 0,
      statut: program.statut || 'active'
    });
  };

  const handleEditRentree = (rentree: RentreeScolaire) => {
    setSelectedRentree(rentree);
    setRentreeFormData({
      anneeAcademique: rentree.anneeAcademique,
      dateDebutCours: rentree.dateDebutCours,
      periodeInscriptionDebut: rentree.periodeInscriptionDebut,
      periodeInscriptionFin: rentree.periodeInscriptionFin,
      placesParFiliere: rentree.placesParFiliere || {}
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce programme ?')) return;

    try {
      await api.delete(`/programs/${id}`);
      toast({
        title: "Succès",
        description: "Programme supprimé avec succès"
      });
      await loadPrograms();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le programme",
        variant: "destructive"
      });
    }
  };

  const handleDeleteRentree = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette rentrée scolaire ?')) return;

    try {
      await api.delete(`/rentree-scolaire/${id}`);
      toast({
        title: "Succès",
        description: "Rentrée scolaire supprimée avec succès"
      });
      await loadRentreeScolaire();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la rentrée scolaire",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setSelectedProgram(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      competences: [],
      debouches: [],
      profil: '',
      type: 'licence',
      duree: '',
      inscrits: 0,
      capacite: 0,
      fraisInscription: 0,
      statut: 'active'
    });
    setNewCompetence('');
    setNewDebouche('');
  };

  const resetRentreeForm = () => {
    setSelectedRentree(null);
    setRentreeFormData({
      anneeAcademique: '',
      dateDebutCours: '',
      periodeInscriptionDebut: '',
      periodeInscriptionFin: '',
      placesParFiliere: {}
    });
  };

  const addCompetence = () => {
    if (newCompetence.trim()) {
      setFormData(prev => ({
        ...prev,
        competences: [...prev.competences, newCompetence.trim()]
      }));
      setNewCompetence('');
    }
  };

  const removeCompetence = (index: number) => {
    setFormData(prev => ({
      ...prev,
      competences: prev.competences.filter((_, i) => i !== index)
    }));
  };

  const addDebouche = () => {
    if (newDebouche.trim()) {
      setFormData(prev => ({
        ...prev,
        debouches: [...prev.debouches, newDebouche.trim()]
      }));
      setNewDebouche('');
    }
  };

  const removeDebouche = (index: number) => {
    setFormData(prev => ({
      ...prev,
      debouches: prev.debouches.filter((_, i) => i !== index)
    }));
  };

  const updatePlacesFiliere = (filiereId: string, places: number) => {
    setRentreeFormData(prev => ({
      ...prev,
      placesParFiliere: {
        ...prev.placesParFiliere,
        [filiereId]: places
      }
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <School className="w-8 h-8 text-amber-600" />
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Programmes ISTM</h1>
            <p className="text-slate-600">Gérer les programmes universitaires et la rentrée scolaire</p>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('programs')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'programs'
              ? 'bg-white text-amber-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          <School className="w-4 h-4 inline mr-2" />
          Programmes
        </button>
        <button
          onClick={() => setActiveTab('rentree')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'rentree'
              ? 'bg-white text-amber-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4 inline mr-2" />
          Rentrée scolaire
        </button>
      </div>

      {activeTab === 'programs' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Formulaire de programme */}
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedProgram ? 'Modifier le programme' : 'Nouveau programme'}
              </CardTitle>
              <CardDescription>
                {selectedProgram ? 'Modifiez les informations du programme' : 'Créez un nouveau programme universitaire'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Titre du programme</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="ex: Développement de logiciels"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="licence">Licence</option>
                      <option value="master">Master</option>
                      <option value="doctorat">Doctorat</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Durée</label>
                    <Input
                      value={formData.duree}
                      onChange={(e) => setFormData(prev => ({ ...prev, duree: e.target.value }))}
                      placeholder="ex: 3 ans"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Description détaillée du programme..."
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Image (URL)</label>
                  <Input
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="/img/programme.png"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Profil recherché</label>
                  <Textarea
                    value={formData.profil}
                    onChange={(e) => setFormData(prev => ({ ...prev, profil: e.target.value }))}
                    placeholder="Profil type de l'étudiant recherché..."
                    rows={2}
                  />
                </div>

                {/* Compétences */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Compétences</label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        value={newCompetence}
                        onChange={(e) => setNewCompetence(e.target.value)}
                        placeholder="Ajouter une compétence..."
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCompetence())}
                      />
                      <Button type="button" onClick={addCompetence} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {formData.competences.map((comp, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {comp}
                          <button
                            type="button"
                            onClick={() => removeCompetence(index)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Débouchés */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Débouchés</label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        value={newDebouche}
                        onChange={(e) => setNewDebouche(e.target.value)}
                        placeholder="Ajouter un débouché..."
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDebouche())}
                      />
                      <Button type="button" onClick={addDebouche} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {formData.debouches.map((debouche, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                        >
                          {debouche}
                          <button
                            type="button"
                            onClick={() => removeDebouche(index)}
                            className="text-green-600 hover:text-green-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Capacité d'accueil</label>
                    <Input
                      type="number"
                      value={formData.capacite}
                      onChange={(e) => setFormData(prev => ({ ...prev, capacite: parseInt(e.target.value) || 0 }))}
                      placeholder="30"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Nombre d'inscrits</label>
                    <Input
                      type="number"
                      value={formData.inscrits}
                      onChange={(e) => setFormData(prev => ({ ...prev, inscrits: parseInt(e.target.value) || 0 }))}
                      placeholder="25"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Frais d'inscription (FCFA)</label>
                    <Input
                      type="number"
                      value={formData.fraisInscription}
                      onChange={(e) => setFormData(prev => ({ ...prev, fraisInscription: parseInt(e.target.value) || 0 }))}
                      placeholder="450000"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Statut</label>
                    <select
                      value={formData.statut}
                      onChange={(e) => setFormData(prev => ({ ...prev, statut: e.target.value as any }))}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="active">Actif</option>
                      <option value="inactive">Inactif</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : selectedProgram ? (
                      <Edit className="w-4 h-4 mr-2" />
                    ) : (
                      <Plus className="w-4 h-4 mr-2" />
                    )}
                    {selectedProgram ? 'Modifier' : 'Créer'}
                  </Button>
                  {selectedProgram && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                    >
                      Annuler
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Liste des programmes */}
          <Card>
            <CardHeader>
              <CardTitle>Programmes existants</CardTitle>
              <CardDescription>
                {Array.isArray(programs) ? programs.length : 0} programme(s) configuré(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!Array.isArray(programs) || programs.length === 0 ? (
                <p className="text-center text-slate-500 py-8">
                  Aucun programme configuré
                </p>
              ) : (
                <div className="space-y-3">
                  {programs.map((program) => (
                    <div
                      key={program.id}
                      className="flex items-center justify-between p-3 border border-slate-200 rounded-lg"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-800">{program.title}</h3>
                        <p className="text-sm text-slate-600 capitalize">
                          {program.type} • {program.duree} • {program.inscrits}/{program.capacite} inscrits
                        </p>
                        <p className="text-xs text-slate-500">
                          {program.fraisInscription?.toLocaleString()} FCFA • 
                          <span className={`ml-1 ${program.statut === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                            {program.statut === 'active' ? 'Actif' : 'Inactif'}
                          </span>
                        </p>
                      </div>
                      <div className="flex gap-1 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(program)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(program.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'rentree' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Formulaire de rentrée scolaire */}
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedRentree ? 'Modifier la rentrée' : 'Nouvelle rentrée scolaire'}
              </CardTitle>
              <CardDescription>
                {selectedRentree ? 'Modifiez les données de rentrée' : 'Configurez une nouvelle rentrée scolaire'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRentreeSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Année académique</label>
                  <Input
                    value={rentreeFormData.anneeAcademique}
                    onChange={(e) => setRentreeFormData(prev => ({ ...prev, anneeAcademique: e.target.value }))}
                    placeholder="2024-2025"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Date de début des cours</label>
                  <Input
                    type="date"
                    value={rentreeFormData.dateDebutCours}
                    onChange={(e) => setRentreeFormData(prev => ({ ...prev, dateDebutCours: e.target.value }))}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Début des inscriptions</label>
                    <Input
                      type="date"
                      value={rentreeFormData.periodeInscriptionDebut}
                      onChange={(e) => setRentreeFormData(prev => ({ ...prev, periodeInscriptionDebut: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Fin des inscriptions</label>
                    <Input
                      type="date"
                      value={rentreeFormData.periodeInscriptionFin}
                      onChange={(e) => setRentreeFormData(prev => ({ ...prev, periodeInscriptionFin: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                {/* Places par filière */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Places par filière</label>
                  <div className="space-y-2">
                    {Array.isArray(programs) ? programs.filter(p => p.statut === 'active').map((program) => (
                      <div key={program.id} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">{program.title}</span>
                        <Input
                          type="number"
                          value={rentreeFormData.placesParFiliere[program.id] || 0}
                          onChange={(e) => updatePlacesFiliere(program.id, parseInt(e.target.value) || 0)}
                          className="w-20"
                          min="0"
                        />
                      </div>
                    )) : null}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : selectedRentree ? (
                      <Edit className="w-4 h-4 mr-2" />
                    ) : (
                      <Plus className="w-4 h-4 mr-2" />
                    )}
                    {selectedRentree ? 'Modifier' : 'Créer'}
                  </Button>
                  {selectedRentree && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetRentreeForm}
                    >
                      Annuler
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Liste des rentrées scolaires */}
          <Card>
            <CardHeader>
              <CardTitle>Rentrées scolaires</CardTitle>
              <CardDescription>
                {Array.isArray(rentreeScolaire) ? rentreeScolaire.length : 0} rentrée(s) configurée(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!Array.isArray(rentreeScolaire) || rentreeScolaire.length === 0 ? (
                <p className="text-center text-slate-500 py-8">
                  Aucune rentrée scolaire configurée
                </p>
              ) : (
                <div className="space-y-3">
                  {rentreeScolaire.map((rentree) => (
                    <div
                      key={rentree.id}
                      className="flex items-center justify-between p-3 border border-slate-200 rounded-lg"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-800">{rentree.anneeAcademique}</h3>
                        <p className="text-sm text-slate-600">
                          Cours: {new Date(rentree.dateDebutCours).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-slate-500">
                          Inscriptions: {new Date(rentree.periodeInscriptionDebut).toLocaleDateString()} - {new Date(rentree.periodeInscriptionFin).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-slate-500">
                          {Object.values(rentree.placesParFiliere || {}).reduce((a, b) => a + b, 0)} places au total
                        </p>
                      </div>
                      <div className="flex gap-1 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditRentree(rentree)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteRentree(rentree.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminContenusISTMPage;
