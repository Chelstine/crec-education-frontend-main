import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  DollarSign, 
  Calendar, 
  Plus, 
  Trash2, 
  Edit,
  Save,
  Info
} from 'lucide-react';

interface PrixDate {
  id: string;
  formation: string;
  prix: number;
  devise: string;
  dateDebut: string;
  dateFin: string;
  description: string;
}

const AdminPrixDatesPage: React.FC = () => {
  const [prixDates, setPrixDates] = useState<PrixDate[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [newPrixDate, setNewPrixDate] = useState<Partial<PrixDate>>({
    formation: '',
    prix: 0,
    devise: 'FCFA',
    dateDebut: '',
    dateFin: '',
    description: ''
  });
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Charger les données depuis l'API
  useEffect(() => {
    const loadPrixDates = async () => {
      try {
        // TODO: Remplacer par l'appel API réel
        // const response = await fetch('/api/admin/prix-dates');
        // const data = await response.json();
        // setPrixDates(data);
        
        // Pour l'instant, garder la liste vide
        setPrixDates([]);
      } catch (error) {
        console.error('Erreur lors du chargement des prix et dates:', error);
        setMessage({ 
          type: 'error', 
          text: 'Impossible de charger les prix et dates' 
        });
      }
    };

    loadPrixDates();
  }, []);

  const handleSave = async (prixDate: PrixDate) => {
    try {
      // Ici, vous intégreriez l'appel API pour sauvegarder
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulation
      
      setMessage({ type: 'success', text: 'Prix et dates mis à jour avec succès!' });
      setEditingId(null);
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors de la mise à jour.' });
    }
  };

  const handleAdd = async () => {
    if (!newPrixDate.formation || !newPrixDate.prix || !newPrixDate.dateDebut || !newPrixDate.dateFin) {
      setMessage({ type: 'error', text: 'Veuillez remplir tous les champs obligatoires.' });
      return;
    }

    try {
      const id = Date.now().toString();
      const nouveauPrixDate: PrixDate = {
        ...newPrixDate as PrixDate,
        id
      };

      setPrixDates(prev => [...prev, nouveauPrixDate]);
      setNewPrixDate({
        formation: '',
        prix: 0,
        devise: 'FCFA',
        dateDebut: '',
        dateFin: '',
        description: ''
      });
      setIsAdding(false);
      setMessage({ type: 'success', text: 'Prix et dates ajoutés avec succès!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors de l\'ajout.' });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ces prix et dates ?')) {
      try {
        setPrixDates(prev => prev.filter(pd => pd.id !== id));
        setMessage({ type: 'success', text: 'Prix et dates supprimés avec succès!' });
      } catch (error) {
        setMessage({ type: 'error', text: 'Erreur lors de la suppression.' });
      }
    }
  };

  const handleInputChange = (id: string, field: keyof PrixDate, value: any) => {
    setPrixDates(prev => prev.map(pd => 
      pd.id === id ? { ...pd, [field]: value } : pd
    ));
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <DollarSign className="h-8 w-8 mr-3 text-green-600" />
          Gestion des Prix et Dates
        </h1>
        <p className="text-gray-600 mt-2">
          Configurez les prix et les périodes pour les différentes formations
        </p>
      </div>

      {message && (
        <Alert className={`mb-6 ${message.type === 'error' ? 'border-red-500' : 'border-green-500'}`}>
          <Info className="h-4 w-4" />
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <div className="mb-6">
        <Button 
          onClick={() => setIsAdding(true)}
          className="bg-green-600 hover:bg-green-700"
          disabled={isAdding}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter des prix et dates
        </Button>
      </div>

      {isAdding && (
        <Card className="mb-6 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-700">Nouveaux prix et dates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newFormation">Formation *</Label>
                <Input
                  id="newFormation"
                  value={newPrixDate.formation}
                  onChange={(e) => setNewPrixDate(prev => ({ ...prev, formation: e.target.value }))}
                  placeholder="Nom de la formation"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPrix">Prix *</Label>
                <div className="flex space-x-2">
                  <Input
                    id="newPrix"
                    type="number"
                    value={newPrixDate.prix}
                    onChange={(e) => setNewPrixDate(prev => ({ ...prev, prix: parseInt(e.target.value) }))}
                    placeholder="0"
                  />
                  <select
                    value={newPrixDate.devise}
                    onChange={(e) => setNewPrixDate(prev => ({ ...prev, devise: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="FCFA">FCFA</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newDateDebut">Date de début *</Label>
                <Input
                  id="newDateDebut"
                  type="date"
                  value={newPrixDate.dateDebut}
                  onChange={(e) => setNewPrixDate(prev => ({ ...prev, dateDebut: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newDateFin">Date de fin *</Label>
                <Input
                  id="newDateFin"
                  type="date"
                  value={newPrixDate.dateFin}
                  onChange={(e) => setNewPrixDate(prev => ({ ...prev, dateFin: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newDescription">Description</Label>
              <Textarea
                id="newDescription"
                value={newPrixDate.description}
                onChange={(e) => setNewPrixDate(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Description optionnelle"
                rows={2}
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAdding(false);
                  setNewPrixDate({
                    formation: '',
                    prix: 0,
                    devise: 'FCFA',
                    dateDebut: '',
                    dateFin: '',
                    description: ''
                  });
                }}
              >
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {prixDates.map((prixDate) => (
          <Card key={prixDate.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                    {editingId === prixDate.id ? (
                      <Input
                        value={prixDate.formation}
                        onChange={(e) => handleInputChange(prixDate.id, 'formation', e.target.value)}
                        className="text-lg font-semibold"
                      />
                    ) : (
                      prixDate.formation
                    )}
                  </CardTitle>
                  <CardDescription>
                    {editingId === prixDate.id ? (
                      <Textarea
                        value={prixDate.description}
                        onChange={(e) => handleInputChange(prixDate.id, 'description', e.target.value)}
                        rows={2}
                      />
                    ) : (
                      prixDate.description
                    )}
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  {editingId === prixDate.id ? (
                    <>
                      <Button 
                        size="sm"
                        onClick={() => handleSave(prixDate)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingId(null)}
                      >
                        Annuler
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingId(prixDate.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(prixDate.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Prix</Label>
                  {editingId === prixDate.id ? (
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        value={prixDate.prix}
                        onChange={(e) => handleInputChange(prixDate.id, 'prix', parseInt(e.target.value))}
                      />
                      <select
                        value={prixDate.devise}
                        onChange={(e) => handleInputChange(prixDate.id, 'devise', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="FCFA">FCFA</option>
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                      </select>
                    </div>
                  ) : (
                    <p className="text-2xl font-bold text-green-600">
                      {prixDate.prix.toLocaleString()} {prixDate.devise}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Date de début</Label>
                  {editingId === prixDate.id ? (
                    <Input
                      type="date"
                      value={prixDate.dateDebut}
                      onChange={(e) => handleInputChange(prixDate.id, 'dateDebut', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-700">
                      {new Date(prixDate.dateDebut).toLocaleDateString('fr-FR')}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Date de fin</Label>
                  {editingId === prixDate.id ? (
                    <Input
                      type="date"
                      value={prixDate.dateFin}
                      onChange={(e) => handleInputChange(prixDate.id, 'dateFin', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-700">
                      {new Date(prixDate.dateFin).toLocaleDateString('fr-FR')}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminPrixDatesPage;
