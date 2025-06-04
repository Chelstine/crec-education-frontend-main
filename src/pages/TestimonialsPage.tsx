import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Star, 
  Quote, 
  User, 
  GraduationCap, 
  Briefcase,
  Plus,
  Calendar
} from 'lucide-react';
import { Testimonial } from '@/types';

const TestimonialsPage: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    authorName: '',
    authorEmail: '',
    graduationYear: new Date().getFullYear().toString(),
    program: '',
    currentPosition: '',
    content: '',
    rating: 5
  });

  useEffect(() => {
    const mockTestimonials: Testimonial[] = [
      {
        id: '1',
        authorName: 'Marie Kabila',
        authorEmail: 'marie.kabila@example.com',
        graduationYear: '2023',
        program: 'Informatique de Gestion',
        currentPosition: 'Développeuse Full Stack chez TechCorp Kinshasa',
        content: 'Mon passage au CREC a été transformateur. Les formations pratiques et l\'accompagnement personnalisé m\'ont permis de décrocher rapidement un poste dans une entreprise tech de renom. Les projets en équipe m\'ont préparée aux défis du monde professionnel.',
        rating: 5,
        status: 'approved',
        isVisible: true,
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z'
      },
      {
        id: '2',
        authorName: 'Jean Mukendi',
        authorEmail: 'jean.mukendi@example.com',
        graduationYear: '2022',
        program: 'Génie Électrique',
        currentPosition: 'Ingénieur Système chez SNEL',
        content: 'Les laboratoires du CREC sont exceptionnels. J\'ai pu expérimenter avec des équipements de pointe qui m\'ont donné une longueur d\'avance sur le marché du travail. Aujourd\'hui, je travaille sur des projets d\'infrastructure électrique majeurs.',
        rating: 5,
        status: 'approved',
        isVisible: true,
        createdAt: '2024-01-10T00:00:00Z',
        updatedAt: '2024-01-10T00:00:00Z'
      },
      {
        id: '3',
        authorName: 'Grace Mbuyi',
        authorEmail: 'grace.mbuyi@example.com',
        graduationYear: '2023',
        program: 'Marketing Digital',
        currentPosition: 'Chef de Projet Marketing chez Digital Agency Congo',
        content: 'Le programme de marketing digital du CREC est parfaitement adapté aux réalités du marché africain. Les cas d\'étude locaux et les partenariats avec les entreprises m\'ont permis de comprendre les enjeux spécifiques de notre région.',
        rating: 4,
        status: 'approved',
        isVisible: true,
        createdAt: '2024-01-05T00:00:00Z',
        updatedAt: '2024-01-05T00:00:00Z'
      },
      {
        id: '4',
        authorName: 'Paul Lumumba',
        authorEmail: 'paul.lumumba@example.com',
        graduationYear: '2024',
        program: 'Entrepreneuriat',
        currentPosition: 'Fondateur & CEO chez EcoSolutions RDC',
        content: 'L\'incubateur du CREC m\'a accompagné dans le développement de ma startup. De l\'idée initiale au lancement, j\'ai bénéficié d\'un mentoring de qualité et d\'un réseau d\'entrepreneurs inspirants.',
        rating: 5,
        status: 'approved',
        isVisible: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ];

    setTestimonials(mockTestimonials);
  }, []);

  const handleSubmitTestimonial = () => {
    const testimonial: Testimonial = {
      id: Date.now().toString(),
      authorName: newTestimonial.authorName,
      authorEmail: newTestimonial.authorEmail,
      graduationYear: newTestimonial.graduationYear,
      program: newTestimonial.program,
      currentPosition: newTestimonial.currentPosition,
      content: newTestimonial.content,
      rating: newTestimonial.rating,
      status: 'pending',
      isVisible: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setTestimonials(prev => [testimonial, ...prev]);
    setIsDialogOpen(false);
    setNewTestimonial({
      authorName: '',
      authorEmail: '',
      graduationYear: new Date().getFullYear().toString(),
      program: '',
      currentPosition: '',
      content: '',
      rating: 5
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const approvedTestimonials = testimonials.filter(t => t.status === 'approved' && t.isVisible);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Témoignages de nos Diplômés
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Découvrez les parcours inspirants de nos anciens étudiants qui excellent aujourd'hui 
            dans leur domaine professionnel
          </p>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-5 h-5 mr-2" />
                Partager mon témoignage
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Partager votre témoignage</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Nom complet</Label>
                    <Input
                      value={newTestimonial.authorName}
                      onChange={(e) => setNewTestimonial(prev => ({
                        ...prev,
                        authorName: e.target.value
                      }))}
                      placeholder="Votre nom complet"
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={newTestimonial.authorEmail}
                      onChange={(e) => setNewTestimonial(prev => ({
                        ...prev,
                        authorEmail: e.target.value
                      }))}
                      placeholder="Votre email"
                    />
                  </div>
                </div>

                <div>
                  <Label>Année de diplôme</Label>
                  <Input
                    type="number"
                    min="2000"
                    max={new Date().getFullYear()}
                    value={newTestimonial.graduationYear}
                    onChange={(e) => setNewTestimonial(prev => ({
                      ...prev,
                      graduationYear: e.target.value
                    }))}
                    placeholder="2024"
                  />
                </div>

                <div>
                  <Label>Programme d'études</Label>
                  <Select 
                    value={newTestimonial.program}
                    onValueChange={(value) => setNewTestimonial(prev => ({
                      ...prev,
                      program: value
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre programme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Informatique de Gestion">Informatique de Gestion</SelectItem>
                      <SelectItem value="Génie Électrique">Génie Électrique</SelectItem>
                      <SelectItem value="Marketing Digital">Marketing Digital</SelectItem>
                      <SelectItem value="Entrepreneuriat">Entrepreneuriat</SelectItem>
                      <SelectItem value="Sciences Commerciales">Sciences Commerciales</SelectItem>
                      <SelectItem value="Génie Civil">Génie Civil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Poste actuel</Label>
                  <Input
                    value={newTestimonial.currentPosition}
                    onChange={(e) => setNewTestimonial(prev => ({
                      ...prev,
                      currentPosition: e.target.value
                    }))}
                    placeholder="Votre poste actuel et entreprise"
                  />
                </div>

                <div>
                  <Label>Votre témoignage</Label>
                  <Textarea
                    value={newTestimonial.content}
                    onChange={(e) => setNewTestimonial(prev => ({
                      ...prev,
                      content: e.target.value
                    }))}
                    placeholder="Partagez votre expérience au CREC et comment cela vous a aidé dans votre carrière..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Note globale</Label>
                  <div className="flex items-center gap-2 mt-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setNewTestimonial(prev => ({
                          ...prev,
                          rating: i + 1
                        }))}
                      >
                        <Star 
                          className={`w-6 h-6 ${i < newTestimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {newTestimonial.rating}/5
                    </span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleSubmitTestimonial}>
                    Soumettre le témoignage
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
            <p className="text-gray-600">Taux d'insertion professionnelle</p>
          </Card>
          <Card className="text-center p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">4.8/5</div>
            <p className="text-gray-600">Satisfaction moyenne des diplômés</p>
          </Card>
          <Card className="text-center p-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
            <p className="text-gray-600">Diplômés dans le monde professionnel</p>
          </Card>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {approvedTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    <User className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {testimonial.authorName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      {testimonial.currentPosition}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <GraduationCap className="w-4 h-4" />
                      {testimonial.program} - Promotion {testimonial.graduationYear}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <Quote className="w-6 h-6 text-blue-500 mb-2" />
                  <p className="text-gray-700 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {renderStars(testimonial.rating)}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {new Date(testimonial.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white">
          <h2 className="text-3xl font-bold mb-4">
            Rejoignez nos Diplômés de Succès
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Commencez votre parcours vers l'excellence académique et professionnelle
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Découvrir nos Formations
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Prendre Rendez-vous
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
