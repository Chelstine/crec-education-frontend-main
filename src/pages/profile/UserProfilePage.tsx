import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Lock, Mail, Phone, Calendar, MapPin, Save, FileText, GraduationCap, Award } from 'lucide-react';

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  bio: string;
}

interface FormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const UserProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // État pour stocker les données du profil
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: user ? `${user.firstName} ${user.lastName}` : 'Utilisateur CREC',
    email: user?.email || 'utilisateur@crec-education.com',
    phone: '+229 00 00 00 00',
    address: 'Cotonou, Bénin',
    joinDate: '01/01/2024',
    bio: 'Étudiant/Professionnel inscrit au CREC pour continuer mon apprentissage et améliorer mes compétences.',
  });

  // État pour les mots de passe
  const [passwordData, setPasswordData] = useState<FormData>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // État pour le mode édition
  const [editMode, setEditMode] = useState(false);
  
  // État de chargement pour les boutons de soumission
  const [loading, setLoading] = useState(false);
  
  // Gestion des mises à jour de profil
  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Gestion des mises à jour de mot de passe
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fonction de sauvegarde du profil
  const handleProfileSave = async () => {
    setLoading(true);
    try {
      // Simulation d'une API
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      toast({
        title: "Profil mis à jour",
        description: "Vos informations personnelles ont été mises à jour avec succès.",
        variant: "default",
      });
      
      setEditMode(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du profil.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Fonction de changement de mot de passe
  const handlePasswordSave = async () => {
    setLoading(true);
    
    // Validation du formulaire
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Erreur de validation",
        description: "Les nouveaux mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    
    try {
      // Simulation d'une API
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      toast({
        title: "Mot de passe mis à jour",
        description: "Votre mot de passe a été changé avec succès.",
        variant: "default",
      });
      
      setPasswordData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du changement de mot de passe.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Formations fictives de l'utilisateur
  const userCourses = [
    { id: 1, title: 'Bureautique avancée', status: 'En cours', progress: 60, startDate: '15/03/2024', endDate: '15/06/2024' },
    { id: 2, title: 'Anglais - Niveau intermédiaire', status: 'Terminé', progress: 100, startDate: '10/01/2024', endDate: '10/03/2024' },
  ];

  // Certificats fictifs de l'utilisateur
  const userCertificates = [
    { id: 1, title: 'Certificat en anglais professionnel', issueDate: '15/03/2024', expiry: null, downloadUrl: '#' },
    { id: 2, title: 'Attestation Formation Bureautique', issueDate: '10/01/2024', expiry: null, downloadUrl: '#' },
  ];

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8">Mon Profil</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Carte d'information sur le profil */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="/placeholder-avatar.jpg" alt={profileData.fullName} />
                <AvatarFallback>{profileData.fullName.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold">{profileData.fullName}</h2>
              <p className="text-gray-500 mt-1">Étudiant</p>
              
              <div className="w-full mt-6 space-y-4">
                <div className="flex items-center">
                  <Mail className="mr-3 text-gray-500" size={18} />
                  <span>{profileData.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-3 text-gray-500" size={18} />
                  <span>{profileData.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-3 text-gray-500" size={18} />
                  <span>{profileData.address}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-3 text-gray-500" size={18} />
                  <span>Inscription: {profileData.joinDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contenu principal */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="profile">Profil</TabsTrigger>
              <TabsTrigger value="courses">Formations</TabsTrigger>
              <TabsTrigger value="certificates">Certificats</TabsTrigger>
            </TabsList>
            
            {/* Onglet Profil */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Informations personnelles</CardTitle>
                    {!editMode ? (
                      <Button variant="outline" onClick={() => setEditMode(true)}>Modifier</Button>
                    ) : (
                      <Button variant="outline" onClick={() => setEditMode(false)}>Annuler</Button>
                    )}
                  </div>
                  <CardDescription>Mettez à jour vos informations personnelles</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Nom complet</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={profileData.fullName}
                        onChange={handleProfileInputChange}
                        disabled={!editMode}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleProfileInputChange}
                        disabled={!editMode}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileInputChange}
                        disabled={!editMode}
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Adresse</Label>
                      <Input
                        id="address"
                        name="address"
                        value={profileData.address}
                        onChange={handleProfileInputChange}
                        disabled={!editMode}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Input
                      id="bio"
                      name="bio"
                      value={profileData.bio}
                      onChange={handleProfileInputChange}
                      disabled={!editMode}
                    />
                  </div>
                </CardContent>
                {editMode && (
                  <CardFooter>
                    <Button
                      onClick={handleProfileSave}
                      disabled={loading}
                      className="w-full"
                    >
                      {loading ? (
                        <>Sauvegarde en cours...</>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Sauvegarder les modifications
                        </>
                      )}
                    </Button>
                  </CardFooter>
                )}
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Sécurité</CardTitle>
                  <CardDescription>Mettez à jour votre mot de passe</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="oldPassword">Mot de passe actuel</Label>
                    <Input
                      id="oldPassword"
                      name="oldPassword"
                      type="password"
                      value={passwordData.oldPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handlePasswordSave}
                    disabled={loading || !passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                    className="w-full"
                  >
                    {loading ? (
                      <>Modification en cours...</>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Modifier le mot de passe
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Onglet Formations */}
            <TabsContent value="courses">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Mes formations
                  </CardTitle>
                  <CardDescription>Suivez vos formations actuelles et passées</CardDescription>
                </CardHeader>
                <CardContent>
                  {userCourses.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <GraduationCap className="mx-auto h-12 w-12 opacity-20" />
                      <p className="mt-2">Vous n'êtes inscrit à aucune formation</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {userCourses.map((course) => (
                        <div key={course.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-lg">{course.title}</h3>
                            <span className={`text-sm px-2 py-1 rounded ${
                              course.status === 'En cours' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {course.status}
                            </span>
                          </div>
                          
                          <div className="text-sm text-gray-500 mb-3">
                            {course.startDate} - {course.endDate}
                          </div>
                          
                          <div className="mb-2 flex items-center">
                            <div className="text-sm font-medium mr-2">{course.progress}%</div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Onglet Certificats */}
            <TabsContent value="certificates">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Mes certificats
                  </CardTitle>
                  <CardDescription>Consultez et téléchargez vos certificats et attestations</CardDescription>
                </CardHeader>
                <CardContent>
                  {userCertificates.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Award className="mx-auto h-12 w-12 opacity-20" />
                      <p className="mt-2">Vous n'avez pas encore obtenu de certificat</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userCertificates.map((certificate) => (
                        <div key={certificate.id} className="flex justify-between items-center p-4 border rounded-lg">
                          <div>
                            <h3 className="font-medium mb-1">{certificate.title}</h3>
                            <p className="text-sm text-gray-500">
                              Délivré le {certificate.issueDate}
                              {certificate.expiry && ` · Expire le ${certificate.expiry}`}
                            </p>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={certificate.downloadUrl} download>
                              <FileText className="mr-2 h-4 w-4" />
                              Télécharger
                            </a>
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
