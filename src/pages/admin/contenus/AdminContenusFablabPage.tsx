import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useFablabMachines, useApi } from '@/hooks/useApi';
import { Loader2, Plus, Edit, Trash2, Wrench, Settings, FolderOpen, Users, CreditCard } from 'lucide-react';
import ErrorBoundary from '@/components/common/ErrorBoundary';

interface Equipment {
  id: string;
  nom: string;
  code: string;
  type: string;
  description: string;
  imageUrl?: string;
  caracteristiquesPrincipales: string[];
}

interface Project {
  id: string;
  nom: string;
  description: string;
  imageUrl?: string;
  categorie: string;
}

interface Service {
  id: string;
  nom: string;
  categorie: string;
  description: string;
  prix: number | 'Sur devis';
  duree: string;
}

interface Subscription {
  id: string;
  nom: string;
  type: string;
  prix: number | 'Devis';
  unite: string;
  avantages: string[];
}

type SectionType = 'equipements' | 'projets' | 'services' | 'tarifs';

const AdminContenusFablabPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>('equipements');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [equipements, setEquipements] = useState<Equipment[]>([]);
  const [projets, setProjets] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [tarifs, setTarifs] = useState<Subscription[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [equipmentForm, setEquipmentForm] = useState({
    nom: '',
    code: '',
    type: '',
    description: '',
    imageUrl: '',
    caracteristiquesPrincipales: [''],
  });
  const [projectForm, setProjectForm] = useState({
    nom: '',
    description: '',
    imageUrl: '',
    categorie: '',
  });
  const [serviceForm, setServiceForm] = useState({
    nom: '',
    categorie: '',
    description: '',
    prix: 0 as number | 'Sur devis',
    duree: '',
  });
  const [subscriptionForm, setSubscriptionForm] = useState({
    nom: '',
    type: '',
    prix: 0 as number | 'Devis',
    unite: '',
    avantages: [''],
  });

  const api = useApi();
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, [activeSection]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      switch (activeSection) {
        case 'equipements':
          try {
            const equipData = await api.get('/fablab/equipements');
            setEquipements(equipData.data);
          } catch {
            setEquipements([]); // Ne pas injecter de données mockées
          }
          break;
        case 'projets':
          try {
            const projData = await api.get('/fablab/projets');
            setProjets(projData.data);
          } catch {
            setProjets([]); // Ne pas injecter de données mockées
          }
          break;
        case 'services':
          try {
            const servData = await api.get('/fablab/services');
            setServices(servData.data);
          } catch {
            setServices([]); // Ne pas injecter de données mockées
          }
          break;
        case 'tarifs':
          try {
            const tarifData = await api.get('/fablab/tarifs');
            setTarifs(tarifData.data);
          } catch {
            setTarifs([]); // Ne pas injecter de données mockées
          }
          break;
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast({ title: 'Erreur', description: 'Chargement hors-ligne activé.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const sections = [
    { id: 'equipements', label: 'Équipements', iconComponent: Settings, color: 'text-blue-600' },
    { id: 'projets', label: 'Projets', iconComponent: FolderOpen, color: 'text-green-600' },
    { id: 'services', label: 'Services', iconComponent: Users, color: 'text-purple-600' },
    { id: 'tarifs', label: 'Tarifs', iconComponent: CreditCard, color: 'text-orange-600' },
  ];

  const getCurrentData = () => {
    switch (activeSection) {
      case 'equipements':
        return equipements;
      case 'projets':
        return projets;
      case 'services':
        return services;
      case 'tarifs':
        return tarifs;
      default:
        return [];
    }
  };

  const resetForms = () => {
    setSelectedItem(null);
    setEquipmentForm({ nom: '', code: '', type: '', description: '', imageUrl: '', caracteristiquesPrincipales: [''] });
    setProjectForm({ nom: '', description: '', imageUrl: '', categorie: '' });
    setServiceForm({ nom: '', categorie: '', description: '', prix: 0, duree: '' });
    setSubscriptionForm({ nom: '', type: '', prix: 0, unite: '', avantages: [''] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    let data: any = {};
    try {
      let endpoint = `/fablab/${activeSection}`;

      switch (activeSection) {
        case 'equipements':
          data = {
            ...equipmentForm,
            caracteristiquesPrincipales: equipmentForm.caracteristiquesPrincipales.filter((c) => c.trim()),
          };
          break;
        case 'projets':
          data = projectForm;
          break;
        case 'services':
          data = {
            ...serviceForm,
            prix: serviceForm.prix === 'Sur devis' ? 'Sur devis' : typeof serviceForm.prix === 'number' ? serviceForm.prix : parseInt(serviceForm.prix as string) || 0,
          };
          break;
        case 'tarifs':
          data = {
            ...subscriptionForm,
            prix: subscriptionForm.prix === 'Devis' ? 'Devis' : typeof subscriptionForm.prix === 'number' ? subscriptionForm.prix : parseInt(subscriptionForm.prix as string) || 0,
            avantages: subscriptionForm.avantages.filter((a) => a.trim()),
          };
          break;
      }

      if (selectedItem) {
        await api.put(`${endpoint}/${selectedItem.id}`, data);
        toast({ title: 'Succès', description: 'Élément modifié avec succès' });
      } else {
        const response = await api.post(endpoint, data);
        toast({ title: 'Succès', description: 'Élément créé avec succès' });
        data.id = response.data.id || `temp-${Date.now()}`;
        switch (activeSection) {
          case 'equipements':
            setEquipements([...equipements, data]);
            break;
          case 'projets':
            setProjets([...projets, data]);
            break;
          case 'services':
            setServices([...services, data]);
            break;
          case 'tarifs':
            setTarifs([...tarifs, data]);
            break;
        }
      }

      resetForms();
      await loadData();
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      toast({ title: 'Succès', description: 'Modifications enregistrées localement', variant: 'default' });
      const tempId = `temp-${Date.now()}`;
      switch (activeSection) {
        case 'equipements':
          setEquipements(selectedItem ? equipements.map((item) => (item.id === selectedItem.id ? data : item)) : [...equipements, data]);
          break;
        case 'projets':
          setProjets(selectedItem ? projets.map((item) => (item.id === selectedItem.id ? data : item)) : [...projets, data]);
          break;
        case 'services':
          setServices(selectedItem ? services.map((item) => (item.id === selectedItem.id ? data : item)) : [...services, data]);
          break;
        case 'tarifs':
          setTarifs(selectedItem ? tarifs.map((item) => (item.id === selectedItem.id ? data : item)) : [...tarifs, data]);
          break;
      }
      resetForms();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) return;

    try {
      await api.delete(`/fablab/${activeSection}/${id}`);
      toast({ title: 'Succès', description: 'Élément supprimé avec succès' });
      await loadData();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({ title: 'Info', description: 'Suppression simulée en mode hors-ligne' });
      switch (activeSection) {
        case 'equipements':
          setEquipements(equipements.filter((item) => item.id !== id));
          break;
        case 'projets':
          setProjets(projets.filter((item) => item.id !== id));
          break;
        case 'services':
          setServices(services.filter((item) => item.id !== id));
          break;
        case 'tarifs':
          setTarifs(tarifs.filter((item) => item.id !== id));
          break;
      }
    }
  };

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    switch (activeSection) {
      case 'equipements':
        setEquipmentForm({
          nom: item.nom || '',
          code: item.code || '',
          type: item.type || '',
          description: item.description || '',
          imageUrl: item.imageUrl || '',
          caracteristiquesPrincipales: item.caracteristiquesPrincipales?.length ? item.caracteristiquesPrincipales : [''],
        });
        break;
      case 'projets':
        setProjectForm({
          nom: item.nom || '',
          description: item.description || '',
          imageUrl: item.imageUrl || '',
          categorie: item.categorie || '',
        });
        break;
      case 'services':
        setServiceForm({
          nom: item.nom || '',
          categorie: item.categorie || '',
          description: item.description || '',
          prix: item.prix || 0,
          duree: item.duree || '',
        });
        break;
      case 'tarifs':
        setSubscriptionForm({
          nom: item.nom || '',
          type: item.type || '',
          prix: item.prix || 0,
          unite: item.unite || '',
          avantages: item.avantages?.length ? item.avantages : [''],
        });
        break;
    }
  };

  const addArrayField = (setter: React.Dispatch<React.SetStateAction<any>>, field: string) => {
    setter((prev: any) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const removeArrayField = (setter: React.Dispatch<React.SetStateAction<any>>, field: string, index: number) => {
    setter((prev: any) => ({
      ...prev,
      [field]: prev[field].filter((_: any, i: number) => i !== index),
    }));
  };

  const updateArrayField = (setter: React.Dispatch<React.SetStateAction<any>>, field: string, index: number, value: string) => {
    setter((prev: any) => ({
      ...prev,
      [field]: prev[field].map((item: string, i: number) => (i === index ? value : item)),
    }));
  };

  const renderForm = () => {
    switch (activeSection) {
      case 'equipements':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Nom</label>
                <Input
                  value={equipmentForm.nom}
                  onChange={(e) => setEquipmentForm((prev) => ({ ...prev, nom: e.target.value }))}
                  placeholder="ex: Imprimante 3D Prusa"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Code</label>
                <Input
                  value={equipmentForm.code}
                  onChange={(e) => setEquipmentForm((prev) => ({ ...prev, code: e.target.value }))}
                  placeholder="ex: FAB-IMP01"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Type</label>
              <Input
                value={equipmentForm.type}
                onChange={(e) => setEquipmentForm((prev) => ({ ...prev, type: e.target.value }))}
                placeholder="ex: Impression 3D"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea
                value={equipmentForm.description}
                onChange={(e) => setEquipmentForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Description de l'équipement..."
                rows={3}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">URL de l'image</label>
              <Input
                value={equipmentForm.imageUrl}
                onChange={(e) => setEquipmentForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
                placeholder="https://exemple.com/image.jpg"
                type="url"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Caractéristiques principales</label>
              {equipmentForm.caracteristiquesPrincipales.map((carac, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={carac}
                    onChange={(e) => updateArrayField(setEquipmentForm, 'caracteristiquesPrincipales', index, e.target.value)}
                    placeholder="ex: Volume d'impression: 250x210x200mm"
                  />
                  {equipmentForm.caracteristiquesPrincipales.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayField(setEquipmentForm, 'caracteristiquesPrincipales', index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArrayField(setEquipmentForm, 'caracteristiquesPrincipales')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une caractéristique
              </Button>
            </div>
            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : selectedItem ? <Edit className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                {selectedItem ? 'Modifier' : 'Créer'}
              </Button>
              {selectedItem && (
                <Button type="button" variant="outline" onClick={resetForms}>Annuler</Button>
              )}
            </div>
          </form>
        );

      case 'projets':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Nom du projet</label>
              <Input
                value={projectForm.nom}
                onChange={(e) => setProjectForm((prev) => ({ ...prev, nom: e.target.value }))}
                placeholder="ex: Prototype IoT Agricole"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Catégorie</label>
              <Input
                value={projectForm.categorie}
                onChange={(e) => setProjectForm((prev) => ({ ...prev, categorie: e.target.value }))}
                placeholder="ex: Impression 3D, Découpe Laser"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea
                value={projectForm.description}
                onChange={(e) => setProjectForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Description du projet..."
                rows={4}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">URL de l'image</label>
              <Input
                value={projectForm.imageUrl}
                onChange={(e) => setProjectForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
                placeholder="https://exemple.com/image.jpg"
                type="url"
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : selectedItem ? <Edit className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                {selectedItem ? 'Modifier' : 'Créer'}
              </Button>
              {selectedItem && (
                <Button type="button" variant="outline" onClick={resetForms}>Annuler</Button>
              )}
            </div>
          </form>
        );

      case 'services':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Nom du service</label>
                <Input
                  value={serviceForm.nom}
                  onChange={(e) => setServiceForm((prev) => ({ ...prev, nom: e.target.value }))}
                  placeholder="ex: Formation Impression 3D"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Catégorie</label>
                <Select
                  value={serviceForm.categorie}
                  onValueChange={(value) => setServiceForm((prev) => ({ ...prev, categorie: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Formation">Formation</SelectItem>
                    <SelectItem value="Service">Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea
                value={serviceForm.description}
                onChange={(e) => setServiceForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Description du service..."
                rows={3}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Prix</label>
                <Select
                  value={typeof serviceForm.prix === 'string' ? serviceForm.prix : serviceForm.prix.toString()}
                  onValueChange={(value) => setServiceForm((prev) => ({ ...prev, prix: value === 'Sur devis' ? 'Sur devis' : parseInt(value) || 0 }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un prix" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sur devis">Sur devis</SelectItem>
                    <SelectItem value="0">Gratuit</SelectItem>
                    <SelectItem value="5000">5,000 FCFA</SelectItem>
                    <SelectItem value="10000">10,000 FCFA</SelectItem>
                    <SelectItem value="15000">15,000 FCFA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Durée</label>
                <Input
                  value={serviceForm.duree}
                  onChange={(e) => setServiceForm((prev) => ({ ...prev, duree: e.target.value }))}
                  placeholder="ex: 4 heures"
                  required
                />
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : selectedItem ? <Edit className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                {selectedItem ? 'Modifier' : 'Créer'}
              </Button>
              {selectedItem && (
                <Button type="button" variant="outline" onClick={resetForms}>Annuler</Button>
              )}
            </div>
          </form>
        );

      case 'tarifs':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Nom de l'abonnement</label>
                <Input
                  value={subscriptionForm.nom}
                  onChange={(e) => setSubscriptionForm((prev) => ({ ...prev, nom: e.target.value }))}
                  placeholder="ex: Abonnement Étudiant"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Type</label>
                <Select
                  value={subscriptionForm.type}
                  onValueChange={(value) => setSubscriptionForm((prev) => ({ ...prev, type: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="membership">Membership</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Prix</label>
                <Select
                  value={typeof subscriptionForm.prix === 'string' ? subscriptionForm.prix : subscriptionForm.prix.toString()}
                  onValueChange={(value) => setSubscriptionForm((prev) => ({ ...prev, prix: value === 'Devis' ? 'Devis' : parseInt(value) || 0 }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un prix" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Devis">Devis</SelectItem>
                    <SelectItem value="0">Gratuit</SelectItem>
                    <SelectItem value="5000">5,000 FCFA</SelectItem>
                    <SelectItem value="10000">10,000 FCFA</SelectItem>
                    <SelectItem value="20000">20,000 FCFA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Unité</label>
                <Input
                  value={subscriptionForm.unite}
                  onChange={(e) => setSubscriptionForm((prev) => ({ ...prev, unite: e.target.value }))}
                  placeholder="ex: mois"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Avantages inclus</label>
              {subscriptionForm.avantages.map((avantage, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={avantage}
                    onChange={(e) => updateArrayField(setSubscriptionForm, 'avantages', index, e.target.value)}
                    placeholder="ex: Accès libre aux machines"
                  />
                  {subscriptionForm.avantages.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayField(setSubscriptionForm, 'avantages', index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArrayField(setSubscriptionForm, 'avantages')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un avantage
              </Button>
            </div>
            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : selectedItem ? <Edit className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                {selectedItem ? 'Modifier' : 'Créer'}
              </Button>
              {selectedItem && (
                <Button type="button" variant="outline" onClick={resetForms}>Annuler</Button>
              )}
            </div>
          </form>
        );

      default:
        return null;
    }
  };

  const renderItemCard = (item: any) => {
    switch (activeSection) {
      case 'equipements':
        return (
          <div key={item.id} className="border border-slate-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800">{item.nom}</h3>
                <p className="text-sm text-slate-600 mb-2">{item.code} • {item.type}</p>
                <p className="text-sm text-slate-700 mb-3">{item.description}</p>
                {item.caracteristiquesPrincipales?.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-medium text-slate-600 mb-1">Caractéristiques:</p>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {item.caracteristiquesPrincipales.map((carac: string, idx: number) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-1 h-1 bg-slate-400 rounded-full mr-2"></span>
                          {carac}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {item.imageUrl && (
                  <p className="text-xs text-blue-600">Image: {item.imageUrl}</p>
                )}
              </div>
              <div className="flex gap-1 ml-4">
                <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        );

      case 'projets':
        return (
          <div key={item.id} className="border border-slate-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800">{item.nom}</h3>
                <p className="text-sm text-slate-600 mb-2">Catégorie: {item.categorie}</p>
                <p className="text-sm text-slate-700 mb-3">{item.description}</p>
                {item.imageUrl && (
                  <p className="text-xs text-blue-600">Image: {item.imageUrl}</p>
                )}
              </div>
              <div className="flex gap-1 ml-4">
                <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        );

      case 'services':
        return (
          <div key={item.id} className="border border-slate-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800">{item.nom}</h3>
                <p className="text-sm text-slate-600 mb-2">
                  {item.categorie} • {typeof item.prix === 'number' ? `${item.prix.toLocaleString()} FCFA` : item.prix} • {item.duree}
                </p>
                <p className="text-sm text-slate-700">{item.description}</p>
              </div>
              <div className="flex gap-1 ml-4">
                <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        );

      case 'tarifs':
        return (
          <div key={item.id} className="border border-slate-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800">{item.nom}</h3>
                <p className="text-sm text-slate-600 mb-2">
                  {item.type} • {typeof item.prix === 'number' ? `${item.prix.toLocaleString()} FCFA` : item.prix}/{item.unite}
                </p>
                {item.avantages?.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-slate-600 mb-1">Avantages inclus:</p>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {item.avantages.map((avantage: string, idx: number) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-1 h-1 bg-slate-400 rounded-full mr-2"></span>
                          {avantage}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="flex gap-1 ml-4">
                <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wrench className="w-8 h-8 text-emerald-600" />
            <div>
              <h1 className="text-2xl font-bold text-jesuit-dark">Contenus FabLab</h1>
              <p className="text-jesuit-darkgray">Gérer les équipements, projets, services et tarifs du FabLab</p>
            </div>
          </div>
        </div>

        <div className="border-b border-slate-200">
          <nav className="flex space-x-8">
            {sections.map((section) => {
              const IconComponent = section.iconComponent;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id as SectionType);
                    resetForms();
                  }}
                  className={`flex items-center gap-2 py-2 px-1 border-b-2 text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? `border-current ${section.color}`
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedItem ? `Modifier ${sections.find((s) => s.id === activeSection)?.label.slice(0, -1)}` : `Nouveau ${sections.find((s) => s.id === activeSection)?.label.slice(0, -1)}`}
              </CardTitle>
              <CardDescription>
                {selectedItem ? 'Modifiez les informations' : 'Créez un nouvel élément'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderForm()}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{sections.find((s) => s.id === activeSection)?.label} existants</CardTitle>
              <CardDescription>
                {getCurrentData().length} élément(s) configuré(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {getCurrentData().length === 0 ? (
                <p className="text-center text-jesuit-darkgray py-8">
                  Aucun élément configuré
                </p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {getCurrentData().map(renderItemCard)}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default AdminContenusFablabPage;