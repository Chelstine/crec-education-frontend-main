import React, { useState } from 'react';
import { 
  DataTable,
  DeleteConfirmDialog,
  FormDialog,
  InfoPanel,
  ImageUploader
} from '@/components/admin';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Clock, Calendar, Users, BookOpen, PencilIcon, TrashIcon, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

const AdminUniversityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('programmes');
  const [showAddProgramDialog, setShowAddProgramDialog] = useState(false);
  const [showAddCourseDialog, setShowAddCourseDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

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
            onClick={() => console.log("Edit program", program.id)}
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
            onClick={() => console.log("Edit course", course.id)}
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
          ) : (
            <Button onClick={() => setShowAddCourseDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau Cours
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <Tabs defaultValue="programmes" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="programmes">
                <GraduationCap className="mr-2 h-4 w-4" />
                Programmes
              </TabsTrigger>
              <TabsTrigger value="cours">
                <BookOpen className="mr-2 h-4 w-4" />
                Cours
              </TabsTrigger>
            </TabsList>
          </Tabs>
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
        </CardContent>
      </Card>

      {/* Dialog de confirmation de suppression */}
      <DeleteConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={async () => {
          console.log(`Delete item ${selectedItemId}`);
          setShowDeleteDialog(false);
          setSelectedItemId(null);
        }}
        title={`Supprimer cet élément ?`}
        description="Cette action est définitive et ne peut pas être annulée."
      />

      {/* Autres dialogues (formulaires d'ajout) seraient ajoutés ici */}
    </div>
  );
};

export default AdminUniversityPage;
