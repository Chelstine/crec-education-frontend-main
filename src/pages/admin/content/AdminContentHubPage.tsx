import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  BookOpen,
  Users,
  Wrench,
  Calendar,
  School,
  Award,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';

interface ContentSectionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  color: string;
  bgColor: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ 
  icon, 
  title, 
  description, 
  link, 
  color, 
  bgColor 
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center mb-2`}>
          <div className={color}>{icon}</div>
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Button asChild variant="ghost" className="w-full justify-between mt-2">
          <Link to={link} className="flex w-full justify-between items-center">
            <span>Gérer</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

const AdminContentHubPage: React.FC = () => {
  // Sections de contenu à gérer
  const contentSections: ContentSectionProps[] = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "À propos",
      description: "Histoire, mission, équipe et valeurs du CREC",
      link: "/admin/content/about",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: <School className="h-6 w-6" />,
      title: "Université",
      description: "Filières et programmes universitaires",
      link: "/admin/content/university",
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Formations ouvertes",
      description: "Formations courtes et accessibles à tous",
      link: "/admin/content/formations",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "FabLab",
      description: "Équipements, services et abonnements",
      link: "/admin/content/fablab",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Événements",
      description: "Conférences, actualités et événements",
      link: "/admin/content/events",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Bibliothèque",
      description: "Ressources et ouvrages en ligne",
      link: "/admin/content/library",
      color: "text-indigo-600",
      bgColor: "bg-indigo-100"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Gestion du contenu</h1>
        <p className="text-slate-500">Gérez l'ensemble du contenu du site CREC</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentSections.map((section, index) => (
          <ContentSection key={index} {...section} />
        ))}
      </div>
    </div>
  );
};

export default AdminContentHubPage;
