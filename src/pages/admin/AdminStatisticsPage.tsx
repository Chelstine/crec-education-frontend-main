import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  GraduationCap,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const AdminStatisticsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Statistiques</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Étudiants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <div className="flex items-center text-sm text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +12% par rapport au mois dernier
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Formations</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <div className="flex items-center text-sm text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +2 nouvelles formations
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Événements</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <div className="flex items-center text-sm text-red-600">
                <ArrowDownRight className="h-4 w-4 mr-1" />
                -2 par rapport au mois dernier
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45,678€</div>
              <div className="flex items-center text-sm text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +8% par rapport au mois dernier
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Statistics */}
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="students">Étudiants</TabsTrigger>
            <TabsTrigger value="courses">Formations</TabsTrigger>
            <TabsTrigger value="revenue">Revenus</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Enrollment Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Tendances des inscriptions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Graphique des tendances</span>
                  </div>
                </CardContent>
              </Card>

              {/* Course Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Distribution des formations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Graphique de distribution</span>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Aperçu des revenus</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Graphique des revenus</span>
                  </div>
                </CardContent>
              </Card>

              {/* Student Demographics */}
              <Card>
                <CardHeader>
                  <CardTitle>Démographie des étudiants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Graphique démographique</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Student Growth */}
              <Card>
                <CardHeader>
                  <CardTitle>Croissance des étudiants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Graphique de croissance</span>
                  </div>
                </CardContent>
              </Card>

              {/* Student Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Distribution par formation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Graphique de distribution</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Course Popularity */}
              <Card>
                <CardHeader>
                  <CardTitle>Popularité des formations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Graphique de popularité</span>
                  </div>
                </CardContent>
              </Card>

              {/* Course Completion */}
              <Card>
                <CardHeader>
                  <CardTitle>Taux de complétion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Graphique de complétion</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Revenue Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Tendances des revenus</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Graphique des tendances</span>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Sources */}
              <Card>
                <CardHeader>
                  <CardTitle>Sources de revenus</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Graphique des sources</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminStatisticsPage; 