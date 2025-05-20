import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Shield,
  Settings,
  Link,
  Save,
  Mail,
  Lock,
  Globe,
  Users,
} from "lucide-react";

const AdminSettingsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Paramètres</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="general" className="space-y-8">
          <TabsList>
            <TabsTrigger value="general">
              <Settings className="h-4 w-4 mr-2" />
              Général
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4 mr-2" />
              Sécurité
            </TabsTrigger>
            <TabsTrigger value="integrations">
              <Link className="h-4 w-4 mr-2" />
              Intégrations
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Institution Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres de l'institution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="institution-name">Nom de l'institution</Label>
                    <Input id="institution-name" defaultValue="CREC" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="institution-email">Email de contact</Label>
                    <Input
                      id="institution-email"
                      type="email"
                      defaultValue="contact@crec.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="institution-phone">Téléphone</Label>
                    <Input
                      id="institution-phone"
                      type="tel"
                      defaultValue="+33 1 23 45 67 89"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="institution-address">Adresse</Label>
                    <Input
                      id="institution-address"
                      defaultValue="123 Rue de l'Éducation, Paris"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Language and Region */}
              <Card>
                <CardHeader>
                  <CardTitle>Langue et région</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="language">Langue par défaut</Label>
                    <select
                      id="language"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      defaultValue="fr"
                    >
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                      <option value="es">Español</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuseau horaire</Label>
                    <select
                      id="timezone"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      defaultValue="Europe/Paris"
                    >
                      <option value="Europe/Paris">Europe/Paris</option>
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">America/New_York</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Format de date</Label>
                    <select
                      id="date-format"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      defaultValue="DD/MM/YYYY"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Email Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Notifications par email</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Nouvelles inscriptions</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir un email pour chaque nouvelle inscription
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Événements à venir</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir un rappel pour les événements à venir
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Rapports hebdomadaires</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir un rapport hebdomadaire des activités
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              {/* System Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Notifications système</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Mises à jour système</Label>
                      <p className="text-sm text-muted-foreground">
                        Être notifié des mises à jour du système
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Alertes de sécurité</Label>
                      <p className="text-sm text-muted-foreground">
                        Être notifié des alertes de sécurité
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Maintenance système</Label>
                      <p className="text-sm text-muted-foreground">
                        Être notifié des périodes de maintenance
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Password Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres de mot de passe</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Mot de passe actuel</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nouveau mot de passe</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      Confirmer le mot de passe
                    </Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Mettre à jour le mot de passe
                  </Button>
                </CardContent>
              </Card>

              {/* Security Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Options de sécurité</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Authentification à deux facteurs</Label>
                      <p className="text-sm text-muted-foreground">
                        Activer la vérification en deux étapes
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Session unique</Label>
                      <p className="text-sm text-muted-foreground">
                        Limiter à une seule session active
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Journal d'activité</Label>
                      <p className="text-sm text-muted-foreground">
                        Enregistrer toutes les connexions
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Integration Settings */}
          <TabsContent value="integrations">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Email Integration */}
              <Card>
                <CardHeader>
                  <CardTitle>Intégration email</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-server">Serveur SMTP</Label>
                    <Input
                      id="smtp-server"
                      defaultValue="smtp.crec.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">Port SMTP</Label>
                    <Input
                      id="smtp-port"
                      type="number"
                      defaultValue="587"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-username">Nom d'utilisateur</Label>
                    <Input
                      id="smtp-username"
                      defaultValue="noreply@crec.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-password">Mot de passe</Label>
                    <Input
                      id="smtp-password"
                      type="password"
                      defaultValue="********"
                    />
                  </div>
                  <Button>
                    <Mail className="h-4 w-4 mr-2" />
                    Tester la connexion
                  </Button>
                </CardContent>
              </Card>

              {/* API Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres API</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">Clé API</Label>
                    <Input
                      id="api-key"
                      defaultValue="sk_live_123456789"
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-secret">Secret API</Label>
                    <Input
                      id="api-secret"
                      type="password"
                      defaultValue="********"
                      readOnly
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Mode test</Label>
                      <p className="text-sm text-muted-foreground">
                        Activer le mode test pour l'API
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <Button variant="outline">
                    <Lock className="h-4 w-4 mr-2" />
                    Régénérer les clés
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminSettingsPage; 