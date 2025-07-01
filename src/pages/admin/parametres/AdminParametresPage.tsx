import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Settings, 
  Mail, 
  Globe, 
  Shield, 
  Bell, 
  Database,
  Server,
  Info,
  Save
} from 'lucide-react';

const AdminParametresPage: React.FC = () => {
  const [settings, setSettings] = useState({
    siteName: 'CREC - Centre de Recherche, d\'Étude et de Créativité',
    siteDescription: 'Formation, Recherche et Accompagnement pour une éducation intégrale fondée sur des valeurs chrétiennes.',
    contactEmail: 'contact@crec.bj',
    adminEmail: 'admin@crec.bj',
    phone: '+229 XX XX XX XX',
    address: 'Cotonou, Bénin',
    maintenanceMode: false,
    allowRegistrations: true,
    emailNotifications: true,
    smsNotifications: false,
    maxFileSize: 10, // MB
    allowedFileTypes: 'jpg,jpeg,png,gif,pdf,doc,docx'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Ici, vous intégreriez l'appel API pour sauvegarder
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulation
      
      setMessage({ type: 'success', text: 'Paramètres mis à jour avec succès!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors de la mise à jour des paramètres.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Settings className="h-8 w-8 mr-3 text-blue-600" />
          Paramètres Généraux
        </h1>
        <p className="text-gray-600 mt-2">
          Configurez les paramètres généraux de la plateforme CREC
        </p>
      </div>

      {message && (
        <Alert className={`mb-6 ${message.type === 'error' ? 'border-red-500' : 'border-green-500'}`}>
          <Info className="h-4 w-4" />
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="system">Système</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Informations du site
              </CardTitle>
              <CardDescription>
                Configurez les informations générales de votre site web
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Nom du site</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => handleInputChange('siteName', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Description du site</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleInputChange('maintenanceMode', checked)}
                />
                <Label htmlFor="maintenanceMode">Mode maintenance</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="allowRegistrations"
                  checked={settings.allowRegistrations}
                  onCheckedChange={(checked) => handleInputChange('allowRegistrations', checked)}
                />
                <Label htmlFor="allowRegistrations">Autoriser les inscriptions</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Informations de contact
              </CardTitle>
              <CardDescription>
                Configurez les informations de contact de l'organisation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email de contact</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Email administrateur</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={settings.adminEmail}
                    onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Textarea
                  id="address"
                  value={settings.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Paramètres de notification
              </CardTitle>
              <CardDescription>
                Configurez les notifications système
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notifications par email</Label>
                  <p className="text-sm text-gray-600">
                    Envoyer des notifications par email aux utilisateurs
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notifications SMS</Label>
                  <p className="text-sm text-gray-600">
                    Envoyer des notifications par SMS (nécessite une configuration supplémentaire)
                  </p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => handleInputChange('smsNotifications', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="h-5 w-5 mr-2" />
                Paramètres système
              </CardTitle>
              <CardDescription>
                Configurez les paramètres techniques de la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxFileSize">Taille max des fichiers (MB)</Label>
                  <Input
                    id="maxFileSize"
                    type="number"
                    value={settings.maxFileSize}
                    onChange={(e) => handleInputChange('maxFileSize', parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allowedFileTypes">Types de fichiers autorisés</Label>
                  <Input
                    id="allowedFileTypes"
                    value={settings.allowedFileTypes}
                    onChange={(e) => handleInputChange('allowedFileTypes', e.target.value)}
                    placeholder="jpg,png,pdf,doc"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} className="px-8">
          {isSaving ? (
            <>Sauvegarde...</>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder les paramètres
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AdminParametresPage;
