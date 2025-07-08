import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { useToast } from '../../../hooks/use-toast';
import { useApi } from '../../../hooks/useApi';
import { Loader2, Plus, Edit, Trash2, BookOpen, Calendar, Users, Upload, GraduationCap } from 'lucide-react';

interface Formation {
  id: string;
  title: string;
  description?: string;
  image?: string;
  objectifs?: string[];
  prerequis?: string[];
  duree?: string;
  niveau: 'debutant' | 'intermediaire' | 'avance';
  capacite?: number;
  inscrits?: number;
  prix?: number;
  dateDebut?: string;
  dateFin?: string;
  formateur?: string;
  statut: 'active' | 'inactive' | 'complete';
  categorie?: string;
}

interface AdminContenusFormationsPageProps {}

const AdminContenusFormationsPage: React.FC<AdminContenusFormationsPageProps> = () => {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    objectifs: [] as string[],
    prerequis: [] as string[],
    duree: '',
    niveau: 'debutant' as 'debutant' | 'intermediaire' | 'avance',
    capacite: 0,
    inscrits: 0,
    prix: 0,
    dateDebut: '',
    dateFin: '',
    formateur: '',
    statut: 'active' as 'active' | 'inactive' | 'complete',
    categorie: ''
  });

  const [newObjectif, setNewObjectif] = useState('');
  const [newPrerequis, setNewPrerequis] = useState('');

  const api = useApi();
  const { toast } = useToast();

  useEffect(() => {
    loadFormations();
  }, []);

  const loadFormations = async () => {
    try {
      setIsLoading(true);
      const data = await api.get('/formations');
      setFormations(Array.isArray(data) ? data : []);
    } catch (error) {
      // Utiliser des données par défaut au lieu d'afficher une erreur
      setFormations([]);
      console.log('API non disponible, utilisation de données par défaut');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    try {
      setIsSubmitting(true);
      if (selectedFormation) {
        await api.put(`/formations/${selectedFormation.id}`, formData);
        toast({
          title: "Succès",
          description: "Formation modifiée avec succès"
        });
      } else {
        await api.post('/formations', formData);
        toast({
          title: "Succès",
          description: "Formation créée avec succès"
        });
      }
      await loadFormations();
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

  const handleEdit = (formation: Formation) => {
    setSelectedFormation(formation);
    setFormData({
      title: formation.title,
      description: formation.description || '',
      image: formation.image || '',
      objectifs: formation.objectifs || [],
      prerequis: formation.prerequis || [],
      duree: formation.duree || '',
      niveau: formation.niveau || 'debutant',
      capacite: formation.capacite || 0,
      inscrits: formation.inscrits || 0,
      prix: formation.prix || 0,
      dateDebut: formation.dateDebut || '',
      dateFin: formation.dateFin || '',
      formateur: formation.formateur || '',
      statut: formation.statut || 'active',
      categorie: formation.categorie || ''
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) return;

    try {
      await api.delete(`/formations/${id}`);
      toast({
        title: "Succès",
        description: "Formation supprimée avec succès"
      });
      await loadFormations();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la formation",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setSelectedFormation(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      objectifs: [],
      prerequis: [],
      duree: '',
      niveau: 'debutant',
      capacite: 0,
      inscrits: 0,
      prix: 0,
      dateDebut: '',
      dateFin: '',
      formateur: '',
      statut: 'active',
      categorie: ''
    });
    setNewObjectif('');
    setNewPrerequis('');
  };

  const addObjectif = () => {
    if (newObjectif.trim()) {
      setFormData(prev => ({
        ...prev,
        objectifs: [...prev.objectifs, newObjectif.trim()]
      }));
      setNewObjectif('');
    }
  };

  const removeObjectif = (index: number) => {
    setFormData(prev => ({
      ...prev,
      objectifs: prev.objectifs.filter((_, i) => i !== index)
    }));
  };

  const addPrerequis = () => {
    if (newPrerequis.trim()) {
      setFormData(prev => ({
        ...prev,
        prerequis: [...prev.prerequis, newPrerequis.trim()]
      }));
      setNewPrerequis('');
    }
  };

  const removePrerequis = (index: number) => {
    setFormData(prev => ({
      ...prev,
      prerequis: prev.prerequis.filter((_, i) => i !== index)
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
          <GraduationCap className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Gestion des Formations</h1>
            <p className="text-slate-600">Gérer les formations et cours proposés par le CREC</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulaire de formation */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedFormation ? 'Modifier la formation' : 'Nouvelle formation'}
            </CardTitle>
            <CardDescription>
              {selectedFormation ? 'Modifiez les informations de la formation' : 'Créez une nouvelle formation'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Titre de la formation</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="ex: Formation en Développement Web"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Niveau</label>
                  <select
                    value={formData.niveau}
                    onChange={(e) => setFormData(prev => ({ ...prev, niveau: e.target.value as any }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="debutant">Débutant</option>
                    <option value="intermediaire">Intermédiaire</option>
                    <option value="avance">Avancé</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Durée</label>
                  <Input
                    value={formData.duree}
                    onChange={(e) => setFormData(prev => ({ ...prev, duree: e.target.value }))}
                    placeholder="ex: 3 mois"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Description détaillée de la formation..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Catégorie</label>
                  <Input
                    value={formData.categorie}
                    onChange={(e) => setFormData(prev => ({ ...prev, categorie: e.target.value }))}
                    placeholder="ex: Informatique"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Formateur</label>
                  <Input
                    value={formData.formateur}
                    onChange={(e) => setFormData(prev => ({ ...prev, formateur: e.target.value }))}
                    placeholder="Nom du formateur"
                  />
                </div>
              </div>

              {/* Objectifs */}
              <div>
                <label className="text-sm font-medium mb-2 block">Objectifs pédagogiques</label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={newObjectif}
                      onChange={(e) => setNewObjectif(e.target.value)}
                      placeholder="Ajouter un objectif..."
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addObjectif())}
                    />
                    <Button type="button" onClick={addObjectif} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {formData.objectifs.map((obj, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {obj}
                        <button
                          type="button"
                          onClick={() => removeObjectif(index)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Prérequis */}
              <div>
                <label className="text-sm font-medium mb-2 block">Prérequis</label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={newPrerequis}
                      onChange={(e) => setNewPrerequis(e.target.value)}
                      placeholder="Ajouter un prérequis..."
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPrerequis())}
                    />
                    <Button type="button" onClick={addPrerequis} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {formData.prerequis.map((prereq, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
                      >
                        {prereq}
                        <button
                          type="button"
                          onClick={() => removePrerequis(index)}
                          className="text-orange-600 hover:text-orange-800"
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
                  <label className="text-sm font-medium mb-2 block">Capacité</label>
                  <Input
                    type="number"
                    value={formData.capacite}
                    onChange={(e) => setFormData(prev => ({ ...prev, capacite: parseInt(e.target.value) || 0 }))}
                    placeholder="30"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Prix (FCFA)</label>
                  <Input
                    type="number"
                    value={formData.prix}
                    onChange={(e) => setFormData(prev => ({ ...prev, prix: parseInt(e.target.value) || 0 }))}
                    placeholder="150000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Date de début</label>
                  <Input
                    type="date"
                    value={formData.dateDebut}
                    onChange={(e) => setFormData(prev => ({ ...prev, dateDebut: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Date de fin</label>
                  <Input
                    type="date"
                    value={formData.dateFin}
                    onChange={(e) => setFormData(prev => ({ ...prev, dateFin: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Statut</label>
                <select
                  value={formData.statut}
                  onChange={(e) => setFormData(prev => ({ ...prev, statut: e.target.value as any }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="complete">Terminée</option>
                </select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : selectedFormation ? (
                    <Edit className="w-4 h-4 mr-2" />
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  {selectedFormation ? 'Modifier' : 'Créer'}
                </Button>
                {selectedFormation && (
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

        {/* Liste des formations */}
        <Card>
          <CardHeader>
            <CardTitle>Formations existantes</CardTitle>
            <CardDescription>
              {Array.isArray(formations) ? formations.length : 0} formation(s) configurée(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!Array.isArray(formations) || formations.length === 0 ? (
              <p className="text-center text-slate-500 py-8">
                Aucune formation configurée
              </p>
            ) : (
              <div className="space-y-3">
                {formations.map((formation) => (
                  <div
                    key={formation.id}
                    className="flex items-center justify-between p-3 border border-slate-200 rounded-lg"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-800">{formation.title}</h3>
                      <p className="text-sm text-slate-600 capitalize">
                        {formation.niveau} • {formation.duree} • {formation.inscrits}/{formation.capacite} inscrits
                      </p>
                      <p className="text-xs text-slate-500">
                        {formation.prix?.toLocaleString()} FCFA • 
                        <span className={`ml-1 ${formation.statut === 'active' ? 'text-green-600' : formation.statut === 'complete' ? 'text-blue-600' : 'text-red-600'}`}>
                          {formation.statut === 'active' ? 'Active' : formation.statut === 'complete' ? 'Terminée' : 'Inactive'}
                        </span>
                      </p>
                    </div>
                    <div className="flex gap-1 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(formation)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(formation.id)}
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
    </div>
  );
};

export default AdminContenusFormationsPage;
