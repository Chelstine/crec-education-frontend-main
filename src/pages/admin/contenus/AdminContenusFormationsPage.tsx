import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { useToast } from '../../../hooks/use-toast';
import { useApi } from '../../../hooks/useApi';
import { Loader2, Plus, Edit, Trash2, BookOpen } from 'lucide-react';

type Formation = {
  id: string;
  title: string;
  description?: string;
  duration?: string;
  level?: string;
  prerequisites?: string;
  price?: number;
  startDate?: string;
  endDate?: string;
};

const AdminContenusFormationsPage: React.FC = () => {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    level: '',
    prerequisites: '',
    price: '',
    startDate: '',
    endDate: ''
  });

  const api = useApi();
  const { toast } = useToast();

  useEffect(() => {
    loadFormations();
  }, []);

  const loadFormations = async () => {
    try {
      setIsLoading(true);
      const data = await api.get('/formations');
      setFormations(data);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les formations",
        variant: "destructive"
      });
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
      duration: formation.duration || '',
      level: formation.level || '',
      prerequisites: formation.prerequisites || '',
      price: formation.price?.toString() || '',
      startDate: formation.startDate || '',
      endDate: formation.endDate || ''
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
      duration: '',
      level: '',
      prerequisites: '',
      price: '',
      startDate: '',
      endDate: ''
    });
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
          <BookOpen className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Formations Ouvertes</h1>
            <p className="text-slate-600">Gérer les formations professionnelles</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulaire */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedFormation ? 'Modifier la formation' : 'Nouvelle formation'}
            </CardTitle>
            <CardDescription>
              {selectedFormation ? 'Modifiez les informations de la formation' : 'Créez une nouvelle formation professionnelle'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Titre de la formation</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="ex: Développement Web Moderne"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Durée</label>
                  <Input
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="ex: 3 mois"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Niveau</label>
                  <Input
                    value={formData.level}
                    onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value }))}
                    placeholder="ex: Débutant"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Description de la formation..."
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Prérequis</label>
                <Textarea
                  value={formData.prerequisites}
                  onChange={(e) => setFormData(prev => ({ ...prev, prerequisites: e.target.value }))}
                  placeholder="Prérequis nécessaires..."
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Prix (FCFA)</label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Date de début</label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Date de fin</label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  />
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
              {formations.length} formation(s) configurée(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {formations.length === 0 ? (
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
                      <p className="text-sm text-slate-600">
                        {formation.duration} • {formation.level}
                        {formation.price && ` • ${formation.price} FCFA`}
                      </p>
                      {formation.description && (
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {formation.description}
                        </p>
                      )}
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
