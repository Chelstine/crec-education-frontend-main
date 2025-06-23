import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Briefcase, 
  GraduationCap, 
  Upload,
  Building,
  Mail,
  Phone,
  Filter,
  Search
} from "lucide-react";
import { Internship, InternshipApplication } from '@/types';

const StagesPage = () => {
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [isApplicationDialogOpen, setIsApplicationDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterDomain, setFilterDomain] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');

  // Mock data pour les stages
  const internships: Internship[] = [
    {
      id: '1',
      title: 'Stage Développement Web Full-Stack',
      company: 'TechCorp Afrique',
      description: 'Rejoignez notre équipe de développement pour travailler sur des projets innovants en React, Node.js et MongoDB.',
      requirements: [
        'Étudiant en informatique (L3/M1/M2)',
        'Connaissances en JavaScript, React',
        'Bases en développement backend',
        'Motivation et esprit d\'équipe'
      ],
      location: 'Cotonou, Bénin',
      duration: '3-6 mois',
      compensation: '50,000 FCFA/mois + prime de performance',
      type: 'stage',
      domain: 'informatique',
      level: 'licence',
      applicationDeadline: '2024-02-15',
      startDate: '2024-03-01',
      endDate: '2024-08-31',
      isActive: true,
      contactEmail: 'rh@techcorp.africa',
      contactPhone: '+229 12 34 56 78',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Stage Marketing Digital',
      company: 'AgencyPlus',
      description: 'Participez à nos campagnes marketing digital et apprenez les dernières techniques de growth hacking.',
      requirements: [
        'Étudiant en marketing/communication',
        'Créativité et sens artistique',
        'Maîtrise des réseaux sociaux',
        'Notions en design graphique'
      ],
      location: 'Porto-Novo, Bénin',
      duration: '4 mois',
      compensation: '40,000 FCFA/mois',
      type: 'stage',
      domain: 'marketing',
      level: 'licence',
      applicationDeadline: '2024-02-20',
      startDate: '2024-03-15',
      endDate: '2024-07-15',
      isActive: true,
      contactEmail: 'stages@agencyplus.bj',
      contactPhone: '+229 98 76 54 32',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-10'
    },
    {
      id: '3',
      title: 'Ingénieur Junior - CDI',
      company: 'BTP Solutions',
      description: 'Poste d\'ingénieur junior pour accompagner nos projets de construction et infrastructure.',
      requirements: [
        'Diplôme d\'ingénieur (M2)',
        'Spécialisation BTP/Génie Civil',
        'Expérience stage souhaitée',
        'Logiciels CAO/DAO'
      ],
      location: 'Cotonou, Bénin',
      duration: 'CDI',
      compensation: '150,000 FCFA/mois + avantages',
      type: 'emploi',
      domain: 'ingénierie',
      level: 'master',
      applicationDeadline: '2024-03-01',
      startDate: '2024-04-01',
      isActive: true,
      contactEmail: 'recrutement@btpsolutions.bj',
      contactPhone: '+229 44 55 66 77',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-05'
    },
    {
      id: '4',
      title: 'Alternance Développement Mobile',
      company: 'MobileDev Studio',
      description: 'Formation en alternance pour développer des applications mobiles natives et cross-platform.',
      requirements: [
        'Étudiant en informatique (M1/M2)',
        'Intérêt pour le développement mobile',
        'Bases en programmation orientée objet',
        'Anglais technique'
      ],
      location: 'Cotonou, Bénin',
      duration: '12 mois',
      compensation: '60,000 FCFA/mois progressif',
      type: 'alternance',
      domain: 'informatique',
      level: 'master',
      applicationDeadline: '2024-02-25',
      startDate: '2024-03-15',
      endDate: '2025-03-15',
      isActive: true,
      contactEmail: 'alternance@mobiledev.studio',
      contactPhone: '+229 22 33 44 55',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-12'
    },
    {
      id: '5',
      title: 'Stage Gestion de Projet',
      company: 'ConsultingPro',
      description: 'Assistez nos consultants dans la gestion de projets clients et apprenez les méthodologies agiles.',
      requirements: [
        'Étudiant en gestion/économie',
        'Rigueur et organisation',
        'Outils de gestion de projet',
        'Excellent relationnel'
      ],
      location: 'Parakou, Bénin',
      duration: '3 mois',
      compensation: '35,000 FCFA/mois',
      type: 'stage',
      domain: 'gestion',
      level: 'licence',
      applicationDeadline: '2024-02-10',
      startDate: '2024-02-26',
      endDate: '2024-05-26',
      isActive: true,
      contactEmail: 'stages@consultingpro.bj',
      contactPhone: '+229 66 77 88 99',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-08'
    }
  ];

  // Application form state
  const [applicationForm, setApplicationForm] = useState<Partial<InternshipApplication>>({
    applicantName: '',
    applicantEmail: '',
    applicantPhone: '',
    currentLevel: '',
    university: '',
    major: '',
    cvUrl: '',
    motivationLetterUrl: ''
  });

  const [applicationFiles, setApplicationFiles] = useState<{
    cv: File | null;
    motivationLetter: File | null;
  }>({
    cv: null,
    motivationLetter: null
  });

  // Filtered internships
  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || internship.type === filterType;
    const matchesDomain = filterDomain === 'all' || internship.domain === filterDomain;
    const matchesLevel = filterLevel === 'all' || internship.level === filterLevel;
    
    return matchesSearch && matchesType && matchesDomain && matchesLevel && internship.isActive;
  });

  const handleFileUpload = (type: 'cv' | 'motivationLetter', file: File) => {
    setApplicationFiles(prev => ({
      ...prev,
      [type]: file
    }));
    
    // Simuler l'upload et obtenir une URL
    const mockUrl = `https://storage.crec.edu/${type}/${file.name}`;
    setApplicationForm(prev => ({
      ...prev,
      [`${type}Url`]: mockUrl
    }));
  };

  const handleSubmitApplication = async () => {
    if (!selectedInternship) return;
    
    const application: Partial<InternshipApplication> = {
      ...applicationForm,
      internshipId: selectedInternship.id,
      status: 'pending',
      applicationDate: new Date().toISOString()
    };
    
    // Ici on appellerait l'API backend
    console.log('Submitting application:', application);
    
    // Simuler la soumission
    alert('Candidature soumise avec succès ! Vous recevrez une confirmation par email.');
    setIsApplicationDialogOpen(false);
    setApplicationForm({
      applicantName: '',
      applicantEmail: '',
      applicantPhone: '',
      currentLevel: '',
      university: '',
      major: '',
      cvUrl: '',
      motivationLetterUrl: ''
    });
    setApplicationFiles({ cv: null, motivationLetter: null });
  };

  const getTypeColor = (type: Internship['type']) => {
    switch (type) {
      case 'stage': return 'bg-blue-100 text-blue-800';
      case 'emploi': return 'bg-green-100 text-green-800';
      case 'alternance': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDomainColor = (domain: Internship['domain']) => {
    switch (domain) {
      case 'informatique': return 'bg-indigo-100 text-indigo-800';
      case 'ingénierie': return 'bg-orange-100 text-orange-800';
      case 'marketing': return 'bg-pink-100 text-pink-800';
      case 'gestion': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
        <div 
          className="min-h-[300px] flex flex-col items-center justify-center text-center relative text-white p-6 news-hero-bg"
        >
          <div className="max-w-3xl mx-auto bg-black/50 p-8 rounded-lg backdrop-blur-sm">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Stages</h1>
            <p className="text-xl md:text-2xl mb-8">
              Découvrez les opportunités de stage au CREC
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-white shadow-sm py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher par titre, entreprise, ou mot-clé..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous types</SelectItem>
                  <SelectItem value="stage">Stages</SelectItem>
                  <SelectItem value="emploi">Emplois</SelectItem>
                  <SelectItem value="alternance">Alternance</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterDomain} onValueChange={setFilterDomain}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Domaine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous domaines</SelectItem>
                  <SelectItem value="informatique">Informatique</SelectItem>
                  <SelectItem value="ingénierie">Ingénierie</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="gestion">Gestion</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterLevel} onValueChange={setFilterLevel}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Niveau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous niveaux</SelectItem>
                  <SelectItem value="licence">Licence</SelectItem>
                  <SelectItem value="master">Master</SelectItem>
                  <SelectItem value="doctorat">Doctorat</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtres
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Internships List */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-crec-dark">
              {filteredInternships.length} offres disponibles
            </h2>
          </div>

          <div className="grid gap-6">
            {filteredInternships.map((internship) => (
              <Card key={internship.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{internship.title}</CardTitle>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <Building className="w-4 h-4" />
                        <span className="font-medium">{internship.company}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className={getTypeColor(internship.type)}>
                          {internship.type}
                        </Badge>
                        <Badge className={getDomainColor(internship.domain)}>
                          {internship.domain}
                        </Badge>
                        <Badge variant="outline">
                          <GraduationCap className="w-3 h-3 mr-1" />
                          {internship.level}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-semibold text-crec-gold mb-1">
                        {internship.compensation}
                      </div>
                      <div className="text-sm text-gray-500">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {internship.duration}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-700 mb-4">{internship.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{internship.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Début: {new Date(internship.startDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{internship.contactEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>Candidature avant le {new Date(internship.applicationDeadline).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setSelectedInternship(internship);
                        // Scroll vers les détails ou ouvrir modal de détails
                      }}
                    >
                      Voir les détails
                    </Button>
                    
                    <Dialog open={isApplicationDialogOpen} onOpenChange={setIsApplicationDialogOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          className="bg-crec-gold hover:bg-crec-gold/90"
                          onClick={() => setSelectedInternship(internship)}
                        >
                          <Briefcase className="w-4 h-4 mr-2" />
                          Postuler
                        </Button>
                      </DialogTrigger>
                      
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Candidature - {internship.title}</DialogTitle>
                          <DialogDescription>
                            Complétez le formulaire ci-dessous pour postuler chez {internship.company}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Nom complet *</label>
                              <Input
                                value={applicationForm.applicantName || ''}
                                onChange={(e) => setApplicationForm(prev => ({...prev, applicantName: e.target.value}))}
                                placeholder="Votre nom complet"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Email *</label>
                              <Input
                                type="email"
                                value={applicationForm.applicantEmail || ''}
                                onChange={(e) => setApplicationForm(prev => ({...prev, applicantEmail: e.target.value}))}
                                placeholder="votre.email@example.com"
                              />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Téléphone *</label>
                              <Input
                                value={applicationForm.applicantPhone || ''}
                                onChange={(e) => setApplicationForm(prev => ({...prev, applicantPhone: e.target.value}))}
                                placeholder="+229 XX XX XX XX"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Niveau d'études *</label>
                              <Select onValueChange={(value) => setApplicationForm(prev => ({...prev, currentLevel: value}))}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez votre niveau" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="L1">Licence 1</SelectItem>
                                  <SelectItem value="L2">Licence 2</SelectItem>
                                  <SelectItem value="L3">Licence 3</SelectItem>
                                  <SelectItem value="M1">Master 1</SelectItem>
                                  <SelectItem value="M2">Master 2</SelectItem>
                                  <SelectItem value="D">Doctorat</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Université *</label>
                              <Input
                                value={applicationForm.university || ''}
                                onChange={(e) => setApplicationForm(prev => ({...prev, university: e.target.value}))}
                                placeholder="Nom de votre université"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Spécialité *</label>
                              <Input
                                value={applicationForm.major || ''}
                                onChange={(e) => setApplicationForm(prev => ({...prev, major: e.target.value}))}
                                placeholder="Votre domaine d'études"
                              />
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">CV (PDF) *</label>
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                                <p className="text-sm text-gray-600 mb-2">
                                  Glissez-déposez votre CV ou cliquez pour sélectionner
                                </p>
                                <Input
                                  type="file"
                                  accept=".pdf,.doc,.docx"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleFileUpload('cv', file);
                                  }}
                                  className="hidden"
                                  id="cv-upload"
                                />
                                <label htmlFor="cv-upload">
                                  <Button type="button" variant="outline" size="sm">
                                    Sélectionner un fichier
                                  </Button>
                                </label>
                                {applicationFiles.cv && (
                                  <p className="text-sm text-green-600 mt-2">
                                    ✓ {applicationFiles.cv.name}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-2">Lettre de motivation (PDF) *</label>
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                                <p className="text-sm text-gray-600 mb-2">
                                  Glissez-déposez votre lettre de motivation
                                </p>
                                <Input
                                  type="file"
                                  accept=".pdf,.doc,.docx"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleFileUpload('motivationLetter', file);
                                  }}
                                  className="hidden"
                                  id="motivation-upload"
                                />
                                <label htmlFor="motivation-upload">
                                  <Button type="button" variant="outline" size="sm">
                                    Sélectionner un fichier
                                  </Button>
                                </label>
                                {applicationFiles.motivationLetter && (
                                  <p className="text-sm text-green-600 mt-2">
                                    ✓ {applicationFiles.motivationLetter.name}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <Button 
                            variant="outline" 
                            onClick={() => setIsApplicationDialogOpen(false)}
                          >
                            Annuler
                          </Button>
                          <Button 
                            onClick={handleSubmitApplication}
                            disabled={!applicationForm.applicantName || !applicationForm.applicantEmail || !applicationFiles.cv || !applicationFiles.motivationLetter}
                            className="bg-crec-gold hover:bg-crec-gold/90"
                          >
                            Envoyer ma candidature
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredInternships.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Briefcase className="w-16 h-16 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Aucune offre trouvée</h3>
              <p className="text-gray-600">
                Modifiez vos critères de recherche ou contactez-nous pour être informé des nouvelles opportunités.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-crec-dark text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Vous êtes une entreprise ?</h2>
          <p className="text-xl mb-8">
            Publiez vos offres de stages et d'emplois pour recruter les meilleurs talents de CREC.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-crec-gold hover:bg-crec-gold/90 px-8 py-3">
              Publier une offre
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-crec-dark px-8 py-3">
              En savoir plus
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StagesPage;
