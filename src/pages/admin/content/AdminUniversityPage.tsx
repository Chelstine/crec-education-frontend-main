import React, { useState } from 'react';
import { 
  DataTable,
  DeleteConfirmDialog,
  FormDialog,
  InfoPanel,
  ImageUploader,
  ProgramForm,
  CourseForm
} from '@/components/admin';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Clock, Calendar, Users, BookOpen, PencilIcon, TrashIcon, Plus, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Types pour l'université
interface Course {
  id: string;
  title: string;
  description: string;
  credits: number;
  level: 'Licence 1' | 'Licence 2' | 'Licence 3' | 'Master 1' | 'Master 2' | 'Doctorat';
  department: string;
  professor: string;
  duration: string;
  format: 'Présentiel' | 'Hybride' | 'À distance';
  status: 'active' | 'draft' | 'inactive';
  image?: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

interface Program {
  id: string;
  name: string;
  description: string;
  level: 'Licence' | 'Master' | 'Doctorat';
  duration: string;
  headOfProgram: string;
  courses: string[]; // IDs of courses
  status: 'active' | 'draft' | 'inactive';
  image?: string;
  createdAt: string;
  updatedAt: string;
}

interface SemesterInfo {
  id: string;
  academicYear: string;
  semesterName: string; // Premier semestre, Second semestre
  registrationStartDate: string;
  registrationEndDate: string;
  classesStartDate: string;
  classesEndDate: string;
  examsStartDate: string;
  examsEndDate: string;
  description: string;
  highlights: string[];
  bannerImage?: string;
}

const AdminUniversityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('programmes');
  const [showAddProgramDialog, setShowAddProgramDialog] = useState(false);
  const [showAddCourseDialog, setShowAddCourseDialog] = useState(false);
  const [showSemesterInfoDialog, setShowSemesterInfoDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [editingProgramId, setEditingProgramId] = useState<string | null>(null);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [editingSemesterId, setEditingSemesterId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deleteType, setDeleteType] = useState<'program' | 'course'>('program');
  
  // État pour l'information de rentrée universitaire
  const [semesterInfo, setSemesterInfo] = useState<SemesterInfo | null>(null);
  
  // États pour les données
  const [programs, setPrograms] = useState<Program[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  // État pour les formulaires
  const [programForm, setProgramForm] = useState<Partial<Program>>({
    name: '',
    description: '',
    level: 'Licence',
    duration: '',
    headOfProgram: '',
    courses: [],
    status: 'draft',
    image: ''
  });

  const [courseForm, setCourseForm] = useState<Partial<Course>>({
    title: '',
    description: '',
    credits: 0,
    level: 'Licence 1',
    department: '',
    professor: '',
    duration: '',
    format: 'Présentiel',
    status: 'draft',
    image: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  // Mock data for semester info
  const mockSemesterInfo: SemesterInfo = {
    id: "semester-2025-1",
    academicYear: "2025-2026",
    semesterName: "Premier Semestre",
    registrationStartDate: "2025-08-15T00:00:00.000Z",
    registrationEndDate: "2025-09-05T00:00:00.000Z",
    classesStartDate: "2025-09-15T00:00:00.000Z",
    classesEndDate: "2025-12-15T00:00:00.000Z",
    examsStartDate: "2025-12-20T00:00:00.000Z",
    examsEndDate: "2025-01-10T00:00:00.000Z",
    description: "Rentrée universitaire pour l'année académique 2025-2026. Ce semestre met l'accent sur l'intégration des nouvelles technologies dans l'enseignement et propose plusieurs initiatives innovantes.",
    highlights: [
      "Nouveau programme de mentorat entre étudiants",
      "Séminaires hebdomadaires avec des professionnels",
      "Lancement du Hub d'Innovation Technologique",
      "Cours spécial sur l'Intelligence Artificielle"
    ],
    bannerImage: "/img/university/rentree-2025.jpg"
  };
  
  // Mock data for programs
  const mockPrograms = [
    {
      id: "prog-1",
      name: "Licence en Informatique",
      description: "Programme de licence en informatique axé sur la programmation et les systèmes d'information.",
      level: "Licence" as const,
      duration: "3 ans",
      headOfProgram: "Dr. François Mensah",
      courses: ["course-1", "course-2", "course-3"],
      status: "active" as const,
      image: "/img/university/informatique.jpg",
      createdAt: "2025-01-15T08:00:00.000Z",
      updatedAt: "2025-05-20T10:30:00.000Z"
    },
    {
      id: "prog-2",
      name: "Master en Data Science",
      description: "Programme avancé couvrant l'analyse de données, l'apprentissage automatique et l'intelligence artificielle.",
      level: "Master" as const,
      duration: "2 ans",
      headOfProgram: "Dr. Marie Konaté",
      courses: ["course-4", "course-5", "course-6"],
      status: "active" as const,
      image: "/img/university/data-science.png",
      createdAt: "2025-02-10T09:15:00.000Z",
      updatedAt: "2025-05-25T14:20:00.000Z"
    }
  ];

  // Mock data for courses
  const mockCourses = [
    {
      id: "course-1",
      title: "Introduction à la Programmation",
      description: "Cours fondamental sur les concepts de programmation avec Python.",
      credits: 6,
      level: "Licence 1" as const,
      department: "Informatique",
      professor: "Dr. Jean Dupont",
      duration: "60 heures",
      format: "Présentiel" as const,
      status: "active" as const,
      startDate: "2025-09-15T00:00:00.000Z",
      endDate: "2025-12-15T00:00:00.000Z",
      createdAt: "2025-03-05T11:20:00.000Z",
      updatedAt: "2025-05-15T09:45:00.000Z"
    },
    {
      id: "course-2",
      title: "Structures de Données Avancées",
      description: "Étude approfondie des structures de données et des algorithmes.",
      credits: 4,
      level: "Licence 2" as const,
      department: "Informatique",
      professor: "Dr. Aminata Diallo",
      duration: "45 heures",
      format: "Hybride" as const,
      status: "active" as const,
      startDate: "2025-09-20T00:00:00.000Z",
      endDate: "2025-12-20T00:00:00.000Z",
      createdAt: "2025-03-10T14:30:00.000Z",
      updatedAt: "2025-05-18T16:00:00.000Z"
    }
  ];

  // Program CRUD operations
  const handleAddProgram = async (data: any) => {
    try {
      // Simuler l'ajout - à remplacer par un appel API
      console.log("Adding program:", data);
      // Logique pour ajouter un programme ici
      
      // Fermer le dialogue
      setShowAddProgramDialog(false);
      
      return Promise.resolve();
    } catch (error) {
      console.error("Error adding program:", error);
      return Promise.reject(error);
    }
  };

  const handleUpdateProgram = async (data: any) => {
    try {
      // Simuler la mise à jour - à remplacer par un appel API
      console.log("Updating program:", data);
      // Logique pour mettre à jour un programme ici
      
      // Fermer le dialogue et réinitialiser l'ID d'édition
      setShowAddProgramDialog(false);
      setEditingProgramId(null);
      
      return Promise.resolve();
    } catch (error) {
      console.error("Error updating program:", error);
      return Promise.reject(error);
    }
  };

  // Course CRUD operations
  const handleAddCourse = async (data: any) => {
    try {
      // Simuler l'ajout - à remplacer par un appel API
      console.log("Adding course:", data);
      // Logique pour ajouter un cours ici
      
      // Fermer le dialogue
      setShowAddCourseDialog(false);
      
      return Promise.resolve();
    } catch (error) {
      console.error("Error adding course:", error);
      return Promise.reject(error);
    }
  };

  const handleUpdateCourse = async (data: any) => {
    try {
      // Simuler la mise à jour - à remplacer par un appel API
      console.log("Updating course:", data);
      // Logique pour mettre à jour un cours ici
      
      // Fermer le dialogue et réinitialiser l'ID d'édition
      setShowAddCourseDialog(false);
      setEditingCourseId(null);
      
      return Promise.resolve();
    } catch (error) {
      console.error("Error updating course:", error);
      return Promise.reject(error);
    }
  };

  // Handle delete operation
  const handleDeleteItem = async () => {
    try {
      if (selectedItemId) {
        // Déterminer le type d'élément à supprimer (programme ou cours)
        const itemType = activeTab === 'programmes' ? 'programme' : 'cours';
        console.log(`Deleting ${itemType} with ID: ${selectedItemId}`);
        
        // Logique pour supprimer l'élément ici
        
        // Fermer le dialogue et réinitialiser l'ID sélectionné
        setShowDeleteDialog(false);
        setSelectedItemId(null);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Handle edit operation for programs
  const handleEditProgram = (id: string) => {
    setEditingProgramId(id);
    setShowAddProgramDialog(true);
  };

  // Handle edit operation for courses
  const handleEditCourse = (id: string) => {
    setEditingCourseId(id);
    setShowAddCourseDialog(true);
  };

  // Handle semester info
  const handleEditSemesterInfo = () => {
    setSemesterInfo(mockSemesterInfo);
    setShowSemesterInfoDialog(true);
  };

  const handleUpdateSemesterInfo = async (data: Partial<SemesterInfo>) => {
    try {
      // Simuler la mise à jour - à remplacer par un appel API
      console.log("Updating semester info:", data);
      
      // Mettre à jour l'état local
      setSemesterInfo({...mockSemesterInfo, ...data});
      
      // Fermer le dialogue
      setShowSemesterInfoDialog(false);
      
      return Promise.resolve();
    } catch (error) {
      console.error("Error updating semester info:", error);
      return Promise.reject(error);
    }
  };

  // Get program or course data by ID
  const getProgramById = (id: string) => mockPrograms.find(p => p.id === id) || null;
  const getCourseById = (id: string) => mockCourses.find(c => c.id === id) || null;

  // Columns for programs table
  const programColumns = [
    {
      key: "name",
      header: "Programme",
      renderCell: (program: Program) => (
        <div className="flex flex-col">
          <span className="font-medium">{program.name}</span>
          <span className="text-xs text-slate-500 mt-1">{program.level}</span>
        </div>
      )
    },
    {
      key: "duration",
      header: "Durée",
      renderCell: (program: Program) => (
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2 text-slate-400" />
          <span>{program.duration}</span>
        </div>
      )
    },
    {
      key: "headOfProgram",
      header: "Responsable",
      renderCell: (program: Program) => (
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-2 text-slate-400" />
          <span>{program.headOfProgram}</span>
        </div>
      )
    },
    {
      key: "status",
      header: "Statut",
      renderCell: (program: Program) => {
        const status = program.status;
        return (
          <Badge className={
            status === 'active' ? 'bg-green-100 text-green-800' :
            status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
            'bg-slate-100 text-slate-800'
          }>
            {status === 'active' ? 'Actif' :
             status === 'draft' ? 'Brouillon' : 'Inactif'}
          </Badge>
        );
      }
    },
    {
      key: "actions",
      header: "Actions",
      renderCell: (program: Program) => (
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleEditProgram(program.id)}
          >
            <PencilIcon className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => {
              setSelectedItemId(program.id);
              setShowDeleteDialog(true);
            }}
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  // Columns for courses table
  const courseColumns = [
    {
      key: "title",
      header: "Cours",
      renderCell: (course: Course) => (
        <div className="flex flex-col">
          <span className="font-medium">{course.title}</span>
          <span className="text-xs text-slate-500 mt-1">{course.level}</span>
        </div>
      )
    },
    {
      key: "professor",
      header: "Enseignant",
      renderCell: (course: Course) => (
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-2 text-slate-400" />
          <span>{course.professor}</span>
        </div>
      )
    },
    {
      key: "credits",
      header: "Crédits",
      renderCell: (course: Course) => (
        <div className="flex items-center">
          <BookOpen className="w-4 h-4 mr-2 text-slate-400" />
          <span>{course.credits} ECTS</span>
        </div>
      )
    },
    {
      key: "format",
      header: "Format",
      renderCell: (course: Course) => (
        <Badge className={
          course.format === 'Présentiel' ? 'bg-blue-100 text-blue-800' :
          course.format === 'Hybride' ? 'bg-purple-100 text-purple-800' :
          'bg-indigo-100 text-indigo-800'
        }>
          {course.format}
        </Badge>
      )
    },
    {
      key: "status",
      header: "Statut",
      renderCell: (course: Course) => {
        const status = course.status;
        return (
          <Badge className={
            status === 'active' ? 'bg-green-100 text-green-800' :
            status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
            'bg-slate-100 text-slate-800'
          }>
            {status === 'active' ? 'Actif' :
             status === 'draft' ? 'Brouillon' : 'Inactif'}
          </Badge>
        );
      }
    },
    {
      key: "actions",
      header: "Actions",
      renderCell: (course: Course) => (
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleEditCourse(course.id)}
          >
            <PencilIcon className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => {
              setSelectedItemId(course.id);
              setShowDeleteDialog(true);
            }}
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion de l'Université</h1>
          <p className="text-muted-foreground">
            Gérez les programmes académiques, les cours, et les contenus universitaires
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {activeTab === 'programmes' ? (
            <Button onClick={() => setShowAddProgramDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau Programme
            </Button>
          ) : activeTab === 'cours' ? (
            <Button onClick={() => setShowAddCourseDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau Cours
            </Button>
          ) : null}
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <h3 className="text-lg font-medium">Gestion universitaire</h3>
        </CardHeader>
        <Tabs defaultValue="programmes" value={activeTab} onValueChange={setActiveTab}>
          <CardHeader className="pb-3 pt-0">
            <TabsList>
              <TabsTrigger value="programmes">
                <GraduationCap className="mr-2 h-4 w-4" />
                Programmes
              </TabsTrigger>
              <TabsTrigger value="cours">
                <BookOpen className="mr-2 h-4 w-4" />
                Cours
              </TabsTrigger>
              <TabsTrigger value="rentree">
                <CalendarCheck className="mr-2 h-4 w-4" />
                Rentrée
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            <TabsContent value="programmes">
              <DataTable 
                columns={programColumns} 
                data={mockPrograms} 
                keyField="id"
                searchPlaceholder="Rechercher un programme..." 
              />
            </TabsContent>
            <TabsContent value="cours">
              <DataTable 
                columns={courseColumns} 
                data={mockCourses}
                keyField="id" 
                searchPlaceholder="Rechercher un cours..." 
              />
            </TabsContent>
            <TabsContent value="rentree">
              <Card className="border-dashed border-2">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-medium">{mockSemesterInfo.semesterName} - Année {mockSemesterInfo.academicYear}</h3>
                      <p className="text-sm text-slate-500 mt-1">{mockSemesterInfo.description}</p>
                    </div>
                    <Button variant="outline" onClick={handleEditSemesterInfo}>
                      <PencilIcon className="mr-2 h-4 w-4" />
                      Modifier
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="font-medium mb-2">Calendrier</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-slate-500" />
                          <span className="text-slate-700 w-40">Inscriptions:</span>
                          <span>
                            {new Date(mockSemesterInfo.registrationStartDate).toLocaleDateString()} - {new Date(mockSemesterInfo.registrationEndDate).toLocaleDateString()}
                          </span>
                        </li>
                        <li className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-slate-500" />
                          <span className="text-slate-700 w-40">Cours:</span>
                          <span>
                            {new Date(mockSemesterInfo.classesStartDate).toLocaleDateString()} - {new Date(mockSemesterInfo.classesEndDate).toLocaleDateString()}
                          </span>
                        </li>
                        <li className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-slate-500" />
                          <span className="text-slate-700 w-40">Examens:</span>
                          <span>
                            {new Date(mockSemesterInfo.examsStartDate).toLocaleDateString()} - {new Date(mockSemesterInfo.examsEndDate).toLocaleDateString()}
                          </span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Points importants</h4>
                      <ul className="space-y-1 text-sm">
                        {mockSemesterInfo.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-indigo-500 mr-2">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {mockSemesterInfo.bannerImage && (
                    <div className="mt-6">
                      <h4 className="font-medium mb-2">Image de bannière</h4>
                      <div className="relative h-40 rounded-md overflow-hidden">
                        <img 
                          src={mockSemesterInfo.bannerImage} 
                          alt="Bannière de rentrée" 
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>

      {/* Dialog de confirmation de suppression */}
      <DeleteConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteItem}
        title={`Supprimer cet élément ?`}
        description="Cette action est définitive et ne peut pas être annulée."
      />

      {/* Dialogue pour ajouter/éditer un programme */}
      <FormDialog
        isOpen={showAddProgramDialog}
        onClose={() => {
          setShowAddProgramDialog(false);
          setEditingProgramId(null);
        }}
        title={editingProgramId ? "Modifier un programme" : "Ajouter un nouveau programme"}
        description="Remplissez les informations pour créer ou modifier un programme académique."
        onSubmit={editingProgramId ? handleUpdateProgram : handleAddProgram}
        submitLabel={editingProgramId ? "Mettre à jour" : "Ajouter"}
        initialData={editingProgramId ? getProgramById(editingProgramId) : {}}
        isEdit={!!editingProgramId}
      >
        <ProgramForm 
          formData={editingProgramId ? getProgramById(editingProgramId) : {}}
          handleChange={(field, value) => {
            console.log(`Field ${field} changed:`, value);
          }}
          isSubmitting={false}
        />
      </FormDialog>

      {/* Dialogue pour ajouter/éditer un cours */}
      <FormDialog
        isOpen={showAddCourseDialog}
        onClose={() => {
          setShowAddCourseDialog(false);
          setEditingCourseId(null);
        }}
        title={editingCourseId ? "Modifier un cours" : "Ajouter un nouveau cours"}
        description="Remplissez les informations pour créer ou modifier un cours."
        onSubmit={editingCourseId ? handleUpdateCourse : handleAddCourse}
        submitLabel={editingCourseId ? "Mettre à jour" : "Ajouter"}
        initialData={editingCourseId ? getCourseById(editingCourseId) : {}}
        isEdit={!!editingCourseId}
      >
        <CourseForm 
          formData={editingCourseId ? getCourseById(editingCourseId) : {}}
          handleChange={(field, value) => {
            console.log(`Field ${field} changed:`, value);
          }}
          isSubmitting={false}
        />
      </FormDialog>

      {/* Dialogue pour modifier les informations de rentrée */}
      <FormDialog
        isOpen={showSemesterInfoDialog}
        onClose={() => setShowSemesterInfoDialog(false)}
        title="Modifier les informations de rentrée"
        description="Mettez à jour les dates et informations importantes pour la rentrée universitaire."
        onSubmit={handleUpdateSemesterInfo}
        submitLabel="Enregistrer les modifications"
        initialData={semesterInfo || {}}
        isEdit={true}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="academicYear">Année académique</Label>
              <Input
                id="academicYear"
                defaultValue={mockSemesterInfo.academicYear}
                placeholder="Ex: 2025-2026"
              />
            </div>
            <div>
              <Label htmlFor="semesterName">Nom du semestre</Label>
              <Input
                id="semesterName"
                defaultValue={mockSemesterInfo.semesterName}
                placeholder="Ex: Premier Semestre"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              defaultValue={mockSemesterInfo.description}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Période d'inscription</Label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div>
                  <Label htmlFor="registrationStartDate" className="text-xs">Début</Label>
                  <Input
                    id="registrationStartDate"
                    type="date"
                    defaultValue={new Date(mockSemesterInfo.registrationStartDate).toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <Label htmlFor="registrationEndDate" className="text-xs">Fin</Label>
                  <Input
                    id="registrationEndDate"
                    type="date"
                    defaultValue={new Date(mockSemesterInfo.registrationEndDate).toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </div>
            <div>
              <Label>Période des cours</Label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div>
                  <Label htmlFor="classesStartDate" className="text-xs">Début</Label>
                  <Input
                    id="classesStartDate"
                    type="date"
                    defaultValue={new Date(mockSemesterInfo.classesStartDate).toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <Label htmlFor="classesEndDate" className="text-xs">Fin</Label>
                  <Input
                    id="classesEndDate"
                    type="date"
                    defaultValue={new Date(mockSemesterInfo.classesEndDate).toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Période d'examens</Label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div>
                  <Label htmlFor="examsStartDate" className="text-xs">Début</Label>
                  <Input
                    id="examsStartDate"
                    type="date"
                    defaultValue={new Date(mockSemesterInfo.examsStartDate).toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <Label htmlFor="examsEndDate" className="text-xs">Fin</Label>
                  <Input
                    id="examsEndDate"
                    type="date"
                    defaultValue={new Date(mockSemesterInfo.examsEndDate).toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="bannerImage">Image de bannière</Label>
              <ImageUploader 
                currentImageUrl={mockSemesterInfo.bannerImage || ""} 
                onImageUpload={async (file) => {
                  const fakeUrl = URL.createObjectURL(file);
                  return fakeUrl;
                }}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="highlights">Points importants</Label>
            <p className="text-sm text-slate-500 mb-2">
              Entrez les points importants un par ligne
            </p>
            <Textarea
              id="highlights"
              defaultValue={mockSemesterInfo.highlights.join("\n")}
              rows={5}
              placeholder="Un point par ligne..."
            />
          </div>
        </div>
      </FormDialog>
    </div>
  );
};

export default AdminUniversityPage;
