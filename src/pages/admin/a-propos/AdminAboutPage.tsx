import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useApi } from '@/hooks/useApi';
import { Edit, Save, X, Upload, Image } from 'lucide-react';

interface AboutSection {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  order: number;
}

interface AboutPageData {
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
  mission: string;
  vision: string;
  values: string[];
  history: string;
  sections: AboutSection[];
}

const AdminAboutPage: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const { get, put, post } = useApi();

  // Données par défaut
  const defaultAboutData: AboutPageData = {
    heroTitle: "À propos du CREC",
    heroSubtitle: "Centre de Recherche, d'Étude et de Créativité",
    heroImageUrl: "",
    mission: "Notre mission est de...",
    vision: "Notre vision est de...",
    values: ["Excellence", "Innovation", "Intégrité"],
    history: "Notre histoire commence...",
    sections: []
  };

  // Charger les données de la page À propos
  useEffect(() => {
    const loadAboutData = async () => {
      try {
        const response = await get('/api/admin/about');
        const responseData = response.data as any;
        
        // Si les données sont vides ou invalides, utiliser les données par défaut
        if (!responseData || Array.isArray(responseData) || !responseData.heroTitle) {
          setAboutData(defaultAboutData);
        } else {
          // S'assurer que values est un tableau
          const data: AboutPageData = {
            ...responseData,
            values: Array.isArray(responseData.values) ? responseData.values : []
          };
          setAboutData(data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement:', error);
        // En cas d'erreur, utiliser les données par défaut
        setAboutData(defaultAboutData);
        toast({
          title: "Information",
          description: "Données par défaut chargées",
          variant: "default",
        });
      } finally {
        setLoading(false);
      }
    };

    loadAboutData();
  }, [get, toast]);

  // Sauvegarder les modifications
  const handleSave = async (updatedData: AboutPageData) => {
    try {
      await put('/api/admin/about', updatedData);
      setAboutData(updatedData);
      setIsEditing(false);
      setEditingSection(null);
      toast({
        title: "Succès",
        description: "Page À propos mise à jour avec succès",
      });
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les modifications",
        variant: "destructive",
      });
    }
  };

  // Ajouter une nouvelle section
  const handleAddSection = async () => {
    if (!aboutData) return;

    const newSection: AboutSection = {
      id: `section_${Date.now()}`,
      title: 'Nouvelle section',
      content: 'Contenu de la nouvelle section...',
      order: aboutData.sections.length + 1,
    };

    const updatedData = {
      ...aboutData,
      sections: [...aboutData.sections, newSection],
    };

    await handleSave(updatedData);
  };

  // Supprimer une section
  const handleDeleteSection = async (sectionId: string) => {
    if (!aboutData) return;

    const updatedData = {
      ...aboutData,
      sections: aboutData.sections.filter(s => s.id !== sectionId),
    };

    await handleSave(updatedData);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="text-center p-4">
        <p>Aucune donnée disponible pour la page À propos</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion de la Page À Propos</h1>
        <Button 
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "destructive" : "default"}
        >
          {isEditing ? (
            <>
              <X className="mr-2 h-4 w-4" />
              Annuler
            </>
          ) : (
            <>
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </>
          )}
        </Button>
      </div>

      {/* Section Hero */}
      <Card>
        <CardHeader>
          <CardTitle>Section Hero</CardTitle>
          <CardDescription>
            Titre principal et image de la page À propos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Titre principal</label>
                <Input
                  value={aboutData.heroTitle}
                  onChange={(e) => setAboutData({
                    ...aboutData,
                    heroTitle: e.target.value
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Sous-titre</label>
                <Input
                  value={aboutData.heroSubtitle}
                  onChange={(e) => setAboutData({
                    ...aboutData,
                    heroSubtitle: e.target.value
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">URL de l'image</label>
                <div className="flex gap-2">
                  <Input
                    value={aboutData.heroImageUrl}
                    onChange={(e) => setAboutData({
                      ...aboutData,
                      heroImageUrl: e.target.value
                    })}
                    placeholder="https://..."
                  />
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold">{aboutData.heroTitle}</h2>
              <p className="text-gray-600">{aboutData.heroSubtitle}</p>
              {aboutData.heroImageUrl && (
                <img 
                  src={aboutData.heroImageUrl} 
                  alt="Hero" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Mission, Vision, Valeurs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mission</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Textarea
                value={aboutData.mission}
                onChange={(e) => setAboutData({
                  ...aboutData,
                  mission: e.target.value
                })}
                rows={4}
              />
            ) : (
              <p>{aboutData.mission}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vision</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Textarea
                value={aboutData.vision}
                onChange={(e) => setAboutData({
                  ...aboutData,
                  vision: e.target.value
                })}
                rows={4}
              />
            ) : (
              <p>{aboutData.vision}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Valeurs</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Textarea
                value={aboutData.values.join('\n')}
                onChange={(e) => setAboutData({
                  ...aboutData,
                  values: e.target.value.split('\n').filter(v => v.trim())
                })}
                rows={4}
                placeholder="Une valeur par ligne"
              />
            ) : (
              <ul className="list-disc pl-5">
                {Array.isArray(aboutData?.values) && aboutData.values.map((value, index) => (
                  <li key={index}>{value}</li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Histoire */}
      <Card>
        <CardHeader>
          <CardTitle>Notre Histoire</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea
              value={aboutData.history}
              onChange={(e) => setAboutData({
                ...aboutData,
                history: e.target.value
              })}
              rows={6}
            />
          ) : (
            <p className="whitespace-pre-wrap">{aboutData.history}</p>
          )}
        </CardContent>
      </Card>

      {/* Sections dynamiques */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Sections Supplémentaires</CardTitle>
              <CardDescription>
                Gérer les sections personnalisées de la page
              </CardDescription>
            </div>
            {isEditing && (
              <Button onClick={handleAddSection} variant="outline">
                Ajouter une section
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.isArray(aboutData?.sections) && aboutData.sections.map((section) => (
            <Card key={section.id} className="border-l-4 border-blue-500">
              <CardContent className="pt-4">
                {isEditing ? (
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <Input
                        value={section.title}
                        onChange={(e) => {
                          const updatedSections = aboutData.sections.map(s => 
                            s.id === section.id 
                              ? { ...s, title: e.target.value }
                              : s
                          );
                          setAboutData({ ...aboutData, sections: updatedSections });
                        }}
                        className="font-semibold"
                      />
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteSection(section.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <Textarea
                      value={section.content}
                      onChange={(e) => {
                        const updatedSections = aboutData.sections.map(s => 
                          s.id === section.id 
                            ? { ...s, content: e.target.value }
                            : s
                        );
                        setAboutData({ ...aboutData, sections: updatedSections });
                      }}
                      rows={4}
                    />
                    {section.imageUrl && (
                      <div className="flex gap-2">
                        <Input
                          value={section.imageUrl}
                          onChange={(e) => {
                            const updatedSections = aboutData.sections.map(s => 
                              s.id === section.id 
                                ? { ...s, imageUrl: e.target.value }
                                : s
                            );
                            setAboutData({ ...aboutData, sections: updatedSections });
                          }}
                          placeholder="URL de l'image"
                        />
                        <Button variant="outline" size="sm">
                          <Image className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <h3 className="font-semibold mb-2">{section.title}</h3>
                    <p className="whitespace-pre-wrap">{section.content}</p>
                    {section.imageUrl && (
                      <img 
                        src={section.imageUrl} 
                        alt={section.title}
                        className="mt-3 w-full h-32 object-cover rounded"
                      />
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Bouton de sauvegarde */}
      {isEditing && (
        <div className="flex justify-end">
          <Button onClick={() => handleSave(aboutData)} size="lg">
            <Save className="mr-2 h-4 w-4" />
            Sauvegarder tous les changements
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdminAboutPage;
