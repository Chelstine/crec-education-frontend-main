import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useApi } from '@/hooks/useApi';
import { Loader2, Plus, Edit, Trash2, BookOpen } from 'lucide-react';

// Type livre pour la bibliothèque
interface Livre {
  id: string;
  titre: string;
  auteur: string;
  description?: string;
  lien?: string;
}

const AdminBibliotequePage: React.FC = () => {
  const [livres, setLivres] = useState<Livre[]>([]);
  const [selectedLivre, setSelectedLivre] = useState<Livre | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    titre: '',
    auteur: '',
    description: '',
    lien: ''
  });
  const api = useApi();
  const { toast } = useToast();

  useEffect(() => { 
    loadLivres(); 
  }, []);

  const loadLivres = async () => {
    setIsLoading(true);
    try {
      // TODO: Appel API réel
      // const response = await api.get('/api/bibliotheque');
      // setLivres(response.data || []);
      
      // Pour l'instant, liste vide
      setLivres([]);
    } catch (error) {
      console.error('Erreur lors du chargement de la bibliothèque:', error);
      toast({ 
        title: 'Erreur', 
        description: 'Impossible de charger la bibliothèque', 
        variant: 'destructive' 
      });
      setLivres([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titre.trim() || !formData.auteur.trim()) return;
    
    setIsSubmitting(true);
    try {
      if (selectedLivre) {
        // TODO: Appel API réel
        // await api.put(`/api/bibliotheque/${selectedLivre.id}`, formData);
        
        // Mise à jour locale en attendant
        setLivres(prev => 
          prev.map(livre => 
            livre.id === selectedLivre.id 
              ? { ...livre, ...formData }
              : livre
          )
        );
        
        toast({ 
          title: 'Succès', 
          description: 'Livre modifié avec succès' 
        });
      } else {
        // TODO: Appel API réel
        // const response = await api.post('/api/bibliotheque', formData);
        // const newLivre = response.data;
        
        // Création locale en attendant
        const newLivre: Livre = {
          id: `livre-${Date.now()}`,
          titre: formData.titre,
          auteur: formData.auteur,
          description: formData.description,
          lien: formData.lien
        };
        
        setLivres(prev => [...prev, newLivre]);
        
        toast({ 
          title: 'Succès', 
          description: 'Livre ajouté avec succès' 
        });
      }
      
      resetForm();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du livre:', error);
      toast({ 
        title: 'Erreur', 
        description: 'Une erreur est survenue', 
        variant: 'destructive' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (livre: Livre) => {
    setSelectedLivre(livre);
    setFormData({
      titre: livre.titre,
      auteur: livre.auteur,
      description: livre.description || '',
      lien: livre.lien || ''
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) return;
    
    try {
      // TODO: Appel API réel
      // await api.delete(`/api/bibliotheque/${id}`);
      
      // Suppression locale en attendant
      setLivres(prev => prev.filter(livre => livre.id !== id));
      
      toast({ 
        title: 'Succès', 
        description: 'Livre supprimé avec succès' 
      });
    } catch (error) {
      console.error('Erreur lors de la suppression du livre:', error);
      toast({ 
        title: 'Erreur', 
        description: 'Impossible de supprimer le livre', 
        variant: 'destructive' 
      });
    }
  };

  const resetForm = () => {
    setSelectedLivre(null);
    setFormData({ titre: '', auteur: '', description: '', lien: '' });
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
      <div className="flex items-center gap-3">
        <BookOpen className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Bibliothèque en ligne</h1>
          <p className="text-slate-600">Gérer les livres et ressources numériques</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulaire */}
        <Card>
          <CardHeader>
            <CardTitle>{selectedLivre ? 'Modifier le livre' : 'Nouveau livre'}</CardTitle>
            <CardDescription>{selectedLivre ? 'Modifiez les informations du livre' : 'Ajoutez un nouveau livre à la bibliothèque'}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Titre</label>
                <Input 
                  value={formData.titre} 
                  onChange={e => setFormData(f => ({ ...f, titre: e.target.value }))} 
                  required 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Auteur</label>
                <Input 
                  value={formData.auteur} 
                  onChange={e => setFormData(f => ({ ...f, auteur: e.target.value }))} 
                  required 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea 
                  value={formData.description} 
                  onChange={e => setFormData(f => ({ ...f, description: e.target.value }))} 
                  rows={3} 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Lien (URL)</label>
                <Input 
                  value={formData.lien} 
                  onChange={e => setFormData(f => ({ ...f, lien: e.target.value }))} 
                  type="url" 
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : selectedLivre ? (
                    <Edit className="w-4 h-4 mr-2" />
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  {selectedLivre ? 'Modifier' : 'Ajouter'}
                </Button>
                {selectedLivre && (
                  <Button type="button" variant="outline" onClick={resetForm}>Annuler</Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
        {/* Liste des livres */}
        <Card>
          <CardHeader>
            <CardTitle>Livres existants</CardTitle>
            <CardDescription>{livres.length} livre(s) enregistré(s)</CardDescription>
          </CardHeader>
          <CardContent>
            {livres.length === 0 ? (
              <p className="text-center text-slate-500 py-8">Aucun livre enregistré</p>
            ) : (
              <div className="space-y-3">
                {livres.map(livre => (
                  <div key={livre.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-800">{livre.titre}</h3>
                      <p className="text-sm text-slate-600">{livre.auteur}</p>
                      {livre.description && <p className="text-xs text-slate-500 mt-1 line-clamp-2">{livre.description}</p>}
                      {livre.lien && <a href={livre.lien} className="text-xs text-blue-600 underline" target="_blank" rel="noopener noreferrer">Accéder au document</a>}
                    </div>
                    <div className="flex gap-1 ml-4">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(livre)}><Edit className="w-4 h-4" /></Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(livre.id)} className="text-red-600 hover:text-red-700"><Trash2 className="w-4 h-4" /></Button>
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

export default AdminBibliotequePage;
