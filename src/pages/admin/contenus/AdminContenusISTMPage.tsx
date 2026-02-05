import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Plus, X, Edit, Trash2, Search, Loader2, Upload } from 'lucide-react';
import { universityService } from '@/services/universityService';
import { CreateUniversityProgramRequest } from '@/types/university';

interface UniversityProgram {
  id?: number;
  title: string; // Changé de 'name' à 'title'
  slug?: string;
  description: string;
  image?: string;
  level: 'LICENCE' | 'MASTER' | 'DOCTORAT';
  duration: string; // Changé pour correspondre à l'API
  capacity: number;
  annual_fee: number; // Changé de 'tuition_fee' à 'annual_fee'
  prerequisites?: string[]; // Changé de 'requirements' à 'prerequisites'
  admission_requirements?: string[];
  career_opportunities?: string[];
  program_details?: string[];
  curriculum?: string[];
  is_active: boolean;
  is_featured: boolean;
  registration_deadline?: string;
  start_date?: string;
  created_at?: string;
  updated_at?: string;
  // Champs pour l'upload
  imageFile?: File;
  previewUrl?: string;
}

const AdminContenusISTMPage: React.FC = () => {
  const [programs, setPrograms] = useState<UniversityProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<UniversityProgram | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Variables pour les champs dynamiques
  const [newRequirement, setNewRequirement] = useState('');
  const [newAdmissionRequirement, setNewAdmissionRequirement] = useState('');
  const [newCareerOpportunity, setNewCareerOpportunity] = useState('');
  const [newProgramDetail, setNewProgramDetail] = useState('');
  const [newCurriculumItem, setNewCurriculumItem] = useState('');

  const [formData, setFormData] = useState<UniversityProgram>({
    title: '',
    description: '',
    image: '',
    level: 'LICENCE',
    duration: '3_YEARS',
    capacity: 30,
    annual_fee: 800000,
    prerequisites: [],
    admission_requirements: [],
    career_opportunities: [],
    program_details: [],
    curriculum: [],
    is_active: true,
    is_featured: false,
    registration_deadline: '',
    start_date: ''
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      level: 'LICENCE',
      duration: '3_YEARS',
      capacity: 30,
      annual_fee: 800000,
      prerequisites: [],
      admission_requirements: [],
      career_opportunities: [],
      program_details: [],
      curriculum: [],
      is_active: true,
      is_featured: false,
      registration_deadline: '',
      start_date: ''
    });
    setNewRequirement('');
    setNewAdmissionRequirement('');
    setNewCareerOpportunity('');
    setNewProgramDetail('');
    setNewCurriculumItem('');
  };

  // Fonctions helper pour les arrays
  const addRequirement = () => {
    if (newRequirement.trim()) {
      setFormData(prev => ({
        ...prev,
        prerequisites: [...(prev.prerequisites || []), newRequirement.trim()]
      }));
      setNewRequirement('');
    }
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      prerequisites: prev.prerequisites?.filter((_, i) => i !== index) || []
    }));
  };

  const addAdmissionRequirement = () => {
    if (newAdmissionRequirement.trim()) {
      setFormData(prev => ({
        ...prev,
        admission_requirements: [...(prev.admission_requirements || []), newAdmissionRequirement.trim()]
      }));
      setNewAdmissionRequirement('');
    }
  };

  const removeAdmissionRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      admission_requirements: prev.admission_requirements?.filter((_, i) => i !== index) || []
    }));
  };

  const addCareerOpportunity = () => {
    if (newCareerOpportunity.trim()) {
      setFormData(prev => ({
        ...prev,
        career_opportunities: [...(prev.career_opportunities || []), newCareerOpportunity.trim()]
      }));
      setNewCareerOpportunity('');
    }
  };

  const removeCareerOpportunity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      career_opportunities: prev.career_opportunities?.filter((_, i) => i !== index) || []
    }));
  };

  const addProgramDetail = () => {
    if (newProgramDetail.trim()) {
      setFormData(prev => ({
        ...prev,
        program_details: [...(prev.program_details || []), newProgramDetail.trim()]
      }));
      setNewProgramDetail('');
    }
  };

  const removeProgramDetail = (index: number) => {
    setFormData(prev => ({
      ...prev,
      program_details: prev.program_details?.filter((_, i) => i !== index) || []
    }));
  };

  const addCurriculumItem = () => {
    if (newCurriculumItem.trim()) {
      setFormData(prev => ({
        ...prev,
        curriculum: [...(prev.curriculum || []), newCurriculumItem.trim()]
      }));
      setNewCurriculumItem('');
    }
  };

  const removeCurriculumItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      curriculum: prev.curriculum?.filter((_, i) => i !== index) || []
    }));
  };

  // Gestion de l'upload d'image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        imageFile: file,
        previewUrl: previewUrl
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Le nom du programme est obligatoire');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Générer automatiquement le slug à partir du titre
      const generateSlug = (title: string): string => {
        return title
          .toLowerCase()
          .trim()
          .replace(/[àáâäæãåā]/g, 'a')
          .replace(/[çćčĉ]/g, 'c')
          .replace(/[dđď]/g, 'd')
          .replace(/[èéêëēėę]/g, 'e')
          .replace(/[îïíīįì]/g, 'i')
          .replace(/[ñń]/g, 'n')
          .replace(/[ôöòóœøōõ]/g, 'o')
          .replace(/[ûüùúū]/g, 'u')
          .replace(/[ÿý]/g, 'y')
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
      };
      
      // Utiliser directement le service universityService
      const submitData: CreateUniversityProgramRequest = {
        title: formData.title,
        slug: formData.slug || generateSlug(formData.title),
        description: formData.description,
        level: formData.level,
        duration: formData.duration,
        capacity: formData.capacity,
        annual_fee: formData.annual_fee,
        prerequisites: formData.prerequisites || [],
        admission_requirements: formData.admission_requirements || [],
        career_opportunities: formData.career_opportunities || [],
        program_details: formData.program_details || [],
        curriculum: formData.curriculum || [],
        is_active: formData.is_active,
        is_featured: formData.is_featured,
        registration_deadline: formData.registration_deadline,
        start_date: formData.start_date,
        image: formData.imageFile
      };

      if (editingProgram?.id) {
        // Mise à jour
        const updatedProgram = await universityService.updateProgram(editingProgram.id, submitData);
        setPrograms(prev => prev.map(p => 
          p.id === editingProgram.id ? updatedProgram : p
        ));
        alert('Programme modifié avec succès');
      } else {
        // Création
        const newProgram = await universityService.createProgram(submitData);
        setPrograms(prev => [...prev, newProgram]);
        alert('Programme créé avec succès');
      }

      setIsDialogOpen(false);
      resetForm();
      setEditingProgram(null);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (program: UniversityProgram) => {
    setEditingProgram(program);
    setFormData(program);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce programme ?')) return;

    try {
      const response = await fetch(`/api/admin/content/university-programs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      setPrograms(prev => prev.filter(p => p.id !== id));
      alert('Programme supprimé avec succès');
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la suppression');
    }
  };

  const fetchPrograms = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/content/university-programs', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors du chargement');
      }

      const result = await response.json();
      setPrograms(result.data || []);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors du chargement des programmes');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const filteredPrograms = programs.filter(program =>
    (program.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (program.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'LICENCE': return 'Licence';
      case 'MASTER': return 'Master';
      case 'DOCTORAT': return 'Doctorat';
      default: return level;
    }
  };

  const getDurationLabel = (duration: string) => {
    switch (duration) {
      case '3_MONTHS': return '3 mois';
      case '6_MONTHS': return '6 mois';
      case '1_YEAR': return '1 an';
      case '2_YEARS': return '2 ans';
      case '3_YEARS': return '3 ans';
      case '4_YEARS': return '4 ans';
      case '5_YEARS': return '5 ans';
      default: return duration;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Programmes Universitaires</h1>
        <Button
          onClick={() => {
            resetForm();
            setEditingProgram(null);
            setIsDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nouveau Programme
        </Button>
      </div>

      {/* Barre de recherche */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher un programme..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Liste des programmes */}
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredPrograms.map((program) => (
            <Card key={program.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {program.title}
                      {program.is_featured && <Badge variant="default">Mis en avant</Badge>}
                      {!program.is_active && <Badge variant="secondary">Inactif</Badge>}
                    </CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline">{getLevelLabel(program.level)}</Badge>
                      <Badge variant="outline">{getDurationLabel(program.duration || '3_YEARS')}</Badge>
                      <Badge variant="outline">{program.capacity || 0} places</Badge>
                      <Badge variant="outline">{(program.annual_fee || 0).toLocaleString()} FCFA</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(program)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => program.id && handleDelete(program.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{program.description}</p>
                
                {program.prerequisites && program.prerequisites.length > 0 && (
                  <div className="mb-2">
                    <strong>Prérequis:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {program.prerequisites.map((req, index) => (
                        <Badge key={index} variant="secondary">{req}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {program.career_opportunities && program.career_opportunities.length > 0 && (
                  <div className="mb-2">
                    <strong>Débouchés:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {program.career_opportunities.map((opportunity, index) => (
                        <Badge key={index} variant="secondary">{opportunity}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog pour ajouter/modifier */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProgram ? 'Modifier le programme' : 'Nouveau programme universitaire'}
            </DialogTitle>
            <DialogDescription>
              Remplissez les informations du programme universitaire.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations de base */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="name">Nom du programme *</Label>
                <Input
                  id="name"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: Master en Intelligence Artificielle"
                  required
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  placeholder="Description détaillée du programme"
                />
              </div>

              <div>
                <Label htmlFor="level">Niveau</Label>
                <Select
                  value={formData.level}
                  onValueChange={(value: 'LICENCE' | 'MASTER' | 'DOCTORAT') => 
                    setFormData(prev => ({ ...prev, level: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LICENCE">Licence</SelectItem>
                    <SelectItem value="MASTER">Master</SelectItem>
                    <SelectItem value="DOCTORAT">Doctorat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="duration">Durée</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value: string) => 
                    setFormData(prev => ({ ...prev, duration: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3_MONTHS">3 mois</SelectItem>
                    <SelectItem value="6_MONTHS">6 mois</SelectItem>
                    <SelectItem value="1_YEAR">1 an</SelectItem>
                    <SelectItem value="2_YEARS">2 ans</SelectItem>
                    <SelectItem value="3_YEARS">3 ans</SelectItem>
                    <SelectItem value="4_YEARS">4 ans</SelectItem>
                    <SelectItem value="5_YEARS">5 ans</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="capacity">Capacité d'accueil</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) || 0 }))}
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="annual_fee">Frais de scolarité annuels (FCFA)</Label>
                <Input
                  id="annual_fee"
                  type="number"
                  value={formData.annual_fee}
                  onChange={(e) => setFormData(prev => ({ ...prev, annual_fee: parseInt(e.target.value) || 0 }))}
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="registration_deadline">Date limite d'inscription</Label>
                <Input
                  id="registration_deadline"
                  type="date"
                  value={formData.registration_deadline || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, registration_deadline: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="start_date">Date de début</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="image">Image du programme</Label>
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    {formData.previewUrl || formData.image ? (
                      <img
                        src={formData.previewUrl || formData.image}
                        alt="Preview"
                        className="h-full w-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                          Cliquez pour sélectionner une image
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>

            {/* Prérequis */}
            <div>
              <Label htmlFor="requirements">Prérequis</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  placeholder="Ajouter un prérequis"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                />
                <Button type="button" onClick={addRequirement} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {formData.prerequisites && formData.prerequisites.length > 0 && (
                <div className="space-y-2">
                  {formData.prerequisites.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <span className="flex-1">{req}</span>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => removeRequirement(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Conditions d'admission */}
            <div>
              <Label htmlFor="admission_requirements">Conditions d'admission</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newAdmissionRequirement}
                  onChange={(e) => setNewAdmissionRequirement(e.target.value)}
                  placeholder="Ajouter une condition d'admission"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAdmissionRequirement())}
                />
                <Button type="button" onClick={addAdmissionRequirement} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {formData.admission_requirements && formData.admission_requirements.length > 0 && (
                <div className="space-y-2">
                  {formData.admission_requirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <span className="flex-1">{req}</span>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => removeAdmissionRequirement(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Débouchés professionnels */}
            <div>
              <Label htmlFor="career_opportunities">Débouchés professionnels</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newCareerOpportunity}
                  onChange={(e) => setNewCareerOpportunity(e.target.value)}
                  placeholder="Ajouter un débouché professionnel"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCareerOpportunity())}
                />
                <Button type="button" onClick={addCareerOpportunity} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {formData.career_opportunities && formData.career_opportunities.length > 0 && (
                <div className="space-y-2">
                  {formData.career_opportunities.map((opportunity, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <span className="flex-1">{opportunity}</span>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => removeCareerOpportunity(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Détails du programme */}
            <div>
              <Label htmlFor="program_details">Détails du programme</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newProgramDetail}
                  onChange={(e) => setNewProgramDetail(e.target.value)}
                  placeholder="Ajouter un détail du programme"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addProgramDetail())}
                />
                <Button type="button" onClick={addProgramDetail} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {formData.program_details && formData.program_details.length > 0 && (
                <div className="space-y-2">
                  {formData.program_details.map((detail, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <span className="flex-1">{detail}</span>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => removeProgramDetail(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Programme pédagogique */}
            <div>
              <Label htmlFor="curriculum">Programme pédagogique</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newCurriculumItem}
                  onChange={(e) => setNewCurriculumItem(e.target.value)}
                  placeholder="Ajouter un élément du curriculum"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCurriculumItem())}
                />
                <Button type="button" onClick={addCurriculumItem} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {formData.curriculum && formData.curriculum.length > 0 && (
                <div className="space-y-2">
                  {formData.curriculum.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <span className="flex-1">{item}</span>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => removeCurriculumItem(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Options */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                />
                <Label htmlFor="is_active">Programme actif</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
                />
                <Label htmlFor="is_featured">Programme mis en avant</Label>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-end gap-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsDialogOpen(false);
                  resetForm();
                }}
                disabled={isSubmitting}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {editingProgram ? 'Modification...' : 'Création...'}
                  </>
                ) : (
                  editingProgram ? 'Modifier' : 'Créer'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminContenusISTMPage;