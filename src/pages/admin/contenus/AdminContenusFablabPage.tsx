import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Label } from '../../../components/ui/label';
import { Badge } from '../../../components/ui/badge';
import { Switch } from '../../../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { ImageUpload } from '../../../components/ui/image-upload';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { 
  useFablabMachines, 
  useFablabProjects, 
  useFablabSubscriptions, 
  useFablabTrainings, 
  useFablabServices,
  useCreateMachine,
  useUpdateMachine,
  useDeleteMachine,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
  useCreateSubscription,
  useUpdateSubscription,
  useDeleteSubscription,
  useCreateTraining,
  useUpdateTraining,
  useDeleteTraining,
  useCreateService,
  useUpdateService,
  useDeleteService
} from '../../../hooks/useFablab';
import { Machine, Project, Subscription, Training, Service, CreateMachineData, CreateProjectData, CreateSubscriptionData, CreateTrainingData, CreateServiceData } from '../../../types/fablab';
import { toast } from 'sonner';
import { 
  Loader2, Plus, Edit, Trash2, Wrench, Cpu, CircuitBoard, 
  DollarSign, Clock, Settings, CheckCircle, XCircle, AlertTriangle, X,
  BookOpen, Users, Calendar, Award, BarChart3, Target
} from 'lucide-react';

// Types étendus pour inclure les propriétés temporaires d'upload
type MachineFormData = Partial<Machine> & { previewUrl?: string };
type ProjectFormData = Partial<Project> & { previewUrl?: string };

const AdminContenusFablabPage: React.FC = () => {
  // Hooks pour les données FabLab
  const { data: machines = [], isLoading: loadingMachines } = useFablabMachines();
  const { data: projects = [], isLoading: loadingProjects } = useFablabProjects();
  const { data: subscriptions = [], isLoading: loadingSubscriptions } = useFablabSubscriptions();
  const { data: trainings = [], isLoading: loadingTrainings } = useFablabTrainings();
  const { data: services = [], isLoading: loadingServices } = useFablabServices();

  // Ensure arrays are always arrays with fallback
  const machinesArray = Array.isArray(machines) ? machines : [];
  const projectsArray = Array.isArray(projects) ? projects : [];
  const subscriptionsArray = Array.isArray(subscriptions) ? subscriptions : [];
  const trainingsArray = Array.isArray(trainings) ? trainings : [];
  const servicesArray = Array.isArray(services) ? services : [];

  // Hooks pour les mutations
  const createMachine = useCreateMachine();
  const updateMachine = useUpdateMachine();
  const deleteMachine = useDeleteMachine();
  
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  
  const createSubscription = useCreateSubscription();
  const updateSubscription = useUpdateSubscription();
  const deleteSubscription = useDeleteSubscription();
  
  const createTraining = useCreateTraining();
  const updateTraining = useUpdateTraining();
  const deleteTraining = useDeleteTraining();
  
  const createService = useCreateService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();

  const [activeTab, setActiveTab] = useState<'machines' | 'projects' | 'subscriptions' | 'trainings' | 'services'>('machines');
  
  console.log('Current activeTab:', activeTab);
  
  const [showMachineForm, setShowMachineForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showSubscriptionForm, setShowSubscriptionForm] = useState(false);
  const [showTrainingForm, setShowTrainingForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [editingMachine, setEditingMachine] = useState<Machine | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);
  const [editingTraining, setEditingTraining] = useState<Training | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [machineData, setMachineData] = useState<MachineFormData>({
    name: '',
    code: '',
    type: '',
    description: '',
    features: [],
    image_url: '',
    hourly_rate: 0,
    status: 'available',
    requires_training: false,
    max_booking_hours: 4,
    location: '',
    brand: '',
    model: '',
    specifications: [],
    safety_instructions: [],
    is_active: true,
  });

  const [projectData, setProjectData] = useState<ProjectFormData>({
    title: '',
    description: '',
    category: '',
    difficulty: 'Débutant',
    duration: '',
    materials_needed: [],
    tools_required: [],
    image_url: '',
    estimated_cost: 0,
    skill_level: 'beginner',
    tags: [],
    is_published: true,
    featured: false,
    downloads: 0,
    views: 0,
  });

  const [subscriptionData, setSubscriptionData] = useState<Partial<Subscription>>({
    name: '',
    slug: '',
    description: '',
    price: 0,
    duration_months: 1,
    features: [],
    type: 'BASIC',
    max_hours_per_month: 10,
    machine_access: [],
    training_included: false,
    priority_booking: false,
    is_active: true,
    sort_order: 0,
  });

  const [trainingData, setTrainingData] = useState<Partial<Training>>({
    name: '',
    slug: '',
    description: '',
    price: 0,
    duration_hours: 1,
    max_participants: 8,
    requirements: [],
    what_you_learn: [],
    materials_included: [],
    is_active: true,
    sort_order: 0,
    instructor: '',
    difficulty_level: 'Débutant',
    category: '',
    image_url: '',
  });

  const [serviceData, setServiceData] = useState<Partial<Service>>({
    name: '',
    slug: '',
    description: '',
    price: 0,
    service_type: 'prototypage',
    duration_estimated: '',
    requirements: [],
    deliverables: [],
    is_active: true,
    sort_order: 0,
    image_url: '',
  });

  // Form helper states
  const [newFeature, setNewFeature] = useState('');
  const [newMaterial, setNewMaterial] = useState('');
  const [newSpecification, setNewSpecification] = useState('');
  const [newSafetyInstruction, setNewSafetyInstruction] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newRequirement, setNewRequirement] = useState('');
  const [newLearning, setNewLearning] = useState('');
  const [newMaterialIncluded, setNewMaterialIncluded] = useState('');
  const [newDeliverable, setNewDeliverable] = useState('');
  const [newMachineAccess, setNewMachineAccess] = useState('');
  const [newSubscriptionFeature, setNewSubscriptionFeature] = useState('');
  const [newWorkshopRequirement, setNewWorkshopRequirement] = useState('');
  const [newWhatYouLearn, setNewWhatYouLearn] = useState('');

  const resetMachineForm = () => {
    setMachineData({
      name: '',
      code: '',
      type: '',
      description: '',
      features: [],
      image_url: '',
      hourly_rate: 0,
      status: 'available',
      requires_training: false,
      max_booking_hours: 4,
      location: '',
      brand: '',
      model: '',
      specifications: [],
      safety_instructions: [],
      is_active: true,
    });
    setEditingMachine(null);
    setNewFeature('');
    setNewSpecification('');
    setNewSafetyInstruction('');
  };

  const resetProjectForm = () => {
    setProjectData({
      title: '',
      description: '',
      category: '',
      difficulty: 'Débutant',
      duration: '',
      instructions: '',
      materials_needed: [],
      tools_required: [],
      image_url: '',
      estimated_cost: 0,
      skill_level: 'beginner',
      tags: [],
      is_published: true,
      featured: false,
      downloads: 0,
      views: 0,
    });
    setEditingProject(null);
    setNewMaterial('');
    setNewTag('');
  };

  const resetSubscriptionForm = () => {
    setSubscriptionData({
      name: '',
      slug: '',
      description: '',
      price: 0,
      duration_months: 1,
      features: [],
      type: 'BASIC',
      max_hours_per_month: 10,
      machine_access: [],
      training_included: false,
      priority_booking: false,
      is_active: true,
      sort_order: 0,
    });
    setEditingSubscription(null);
    setNewSubscriptionFeature('');
  };

  const resetTrainingForm = () => {
    setTrainingData({
      name: '',
      slug: '',
      description: '',
      price: 0,
      duration_hours: 1,
      max_participants: 8,
      requirements: [],
      what_you_learn: [],
      materials_included: [],
      is_active: true,
      sort_order: 0,
      instructor: '',
      difficulty_level: 'Débutant',
      category: '',
      image_url: '',
    });
    setEditingTraining(null);
    setNewWorkshopRequirement('');
    setNewWhatYouLearn('');
  };

  const resetServiceForm = () => {
    setServiceData({
      name: '',
      slug: '',
      description: '',
      price: 0,
      service_type: 'prototypage',
      duration_estimated: '',
      requirements: [],
      deliverables: [],
      is_active: true,
      sort_order: 0,
      image_url: '',
    });
    setEditingService(null);
  };

  const handleOpenMachineForm = (machine?: Machine) => {
    console.log('handleOpenMachineForm called with:', machine);
    if (machine) {
      setMachineData({
        ...machine,
        features: machine.features || [],
        specifications: machine.specifications || [],
        safety_instructions: machine.safety_instructions || [],
      });
      setEditingMachine(machine);
    } else {
      resetMachineForm();
    }
    setShowMachineForm(true);
  };

  const handleOpenProjectForm = (project?: Project) => {
    console.log('handleOpenProjectForm called with:', project);
    if (project) {
      setProjectData({
        ...project,
        materials_needed: project.materials_needed || [],
        tools_required: project.tools_required || [],
        tags: project.tags || [],
      });
      setEditingProject(project);
    } else {
      resetProjectForm();
    }
    setShowProjectForm(true);
  };

  const handleOpenSubscriptionForm = (subscription?: Subscription) => {
    console.log('handleOpenSubscriptionForm called with:', subscription);
    if (subscription) {
      setSubscriptionData({
        ...subscription,
        features: subscription.features || [],
      });
      setEditingSubscription(subscription);
    } else {
      resetSubscriptionForm();
    }
    setShowSubscriptionForm(true);
  };

  const handleOpenTrainingForm = (training?: Training) => {
    console.log('handleOpenTrainingForm called with:', training);
    if (training) {
      setTrainingData({
        ...training,
        requirements: training.requirements || [],
        what_you_learn: training.what_you_learn || [],
      });
      setEditingTraining(training);
    } else {
      resetTrainingForm();
    }
    setShowTrainingForm(true);
  };

  const handleOpenServiceForm = (service?: Service) => {
    console.log('handleOpenServiceForm called with:', service);
    if (service) {
      setServiceData({
        ...service,
        requirements: service.requirements || [],
      });
      setEditingService(service);
    } else {
      resetServiceForm();
    }
    setShowServiceForm(true);
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setMachineData(prev => ({
        ...prev,
        features: [...(prev.features || []), newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setMachineData(prev => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index) || []
    }));
  };

  const addSpecification = () => {
    if (newSpecification.trim()) {
      setMachineData(prev => ({
        ...prev,
        specifications: [...(prev.specifications || []), newSpecification.trim()]
      }));
      setNewSpecification('');
    }
  };

  const removeSpecification = (index: number) => {
    setMachineData(prev => ({
      ...prev,
      specifications: prev.specifications?.filter((_, i) => i !== index) || []
    }));
  };

  const addSafetyInstruction = () => {
    if (newSafetyInstruction.trim()) {
      setMachineData(prev => ({
        ...prev,
        safety_instructions: [...(prev.safety_instructions || []), newSafetyInstruction.trim()]
      }));
      setNewSafetyInstruction('');
    }
  };

  const removeSafetyInstruction = (index: number) => {
    setMachineData(prev => ({
      ...prev,
      safety_instructions: prev.safety_instructions?.filter((_, i) => i !== index) || []
    }));
  };

  const addMaterial = () => {
    if (newMaterial.trim()) {
      setProjectData(prev => ({
        ...prev,
        materials_needed: [...(prev.materials_needed || []), newMaterial.trim()]
      }));
      setNewMaterial('');
    }
  };

  const removeMaterial = (index: number) => {
    setProjectData(prev => ({
      ...prev,
      materials_needed: prev.materials_needed?.filter((_, i) => i !== index) || []
    }));
  };

  const addTag = () => {
    if (newTag.trim()) {
      setProjectData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    setProjectData(prev => ({
      ...prev,
      tags: prev.tags?.filter((_, i) => i !== index) || []
    }));
  };

  const addSubscriptionFeature = () => {
    if (newSubscriptionFeature.trim()) {
      setSubscriptionData(prev => ({
        ...prev,
        features: [...(prev.features || []), newSubscriptionFeature.trim()]
      }));
      setNewSubscriptionFeature('');
    }
  };

  const removeSubscriptionFeature = (index: number) => {
    setSubscriptionData(prev => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index) || []
    }));
  };

  const addMachineAccess = () => {
    if (newMachineAccess.trim()) {
      setSubscriptionData(prev => ({
        ...prev,
        machine_access: [...(prev.machine_access || []), newMachineAccess.trim()]
      }));
      setNewMachineAccess('');
    }
  };

  const removeMachineAccess = (index: number) => {
    setSubscriptionData(prev => ({
      ...prev,
      machine_access: prev.machine_access?.filter((_, i) => i !== index) || []
    }));
  };

  const addWorkshopRequirement = () => {
    if (newWorkshopRequirement.trim()) {
      setTrainingData(prev => ({
        ...prev,
        requirements: [...(prev.requirements || []), newWorkshopRequirement.trim()]
      }));
      setNewWorkshopRequirement('');
    }
  };

  const removeWorkshopRequirement = (index: number) => {
    setTrainingData(prev => ({
      ...prev,
      requirements: prev.requirements?.filter((_, i) => i !== index) || []
    }));
  };

  const addWhatYouLearn = () => {
    if (newWhatYouLearn.trim()) {
      setTrainingData(prev => ({
        ...prev,
        what_you_learn: [...(prev.what_you_learn || []), newWhatYouLearn.trim()]
      }));
      setNewWhatYouLearn('');
    }
  };

  const removeWhatYouLearn = (index: number) => {
    setTrainingData(prev => ({
      ...prev,
      what_you_learn: prev.what_you_learn?.filter((_, i) => i !== index) || []
    }));
  };

  const addMaterialIncluded = () => {
    if (newMaterialIncluded.trim()) {
      setTrainingData(prev => ({
        ...prev,
        materials_included: [...(prev.materials_included || []), newMaterialIncluded.trim()]
      }));
      setNewMaterialIncluded('');
    }
  };

  const removeMaterialIncluded = (index: number) => {
    setTrainingData(prev => ({
      ...prev,
      materials_included: prev.materials_included?.filter((_, i) => i !== index) || []
    }));
  };

  const handleMachineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!machineData.name?.trim()) {
      toast.error('Le nom de la machine est obligatoire');
      return;
    }

    if (!machineData.code?.trim()) {
      toast.error('Le code de la machine est obligatoire');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const submitData: CreateMachineData = {
        name: machineData.name!,
        code: machineData.code!,
        type: machineData.type || '',
        description: machineData.description,
        features: machineData.features || [],
        hourly_rate: machineData.hourly_rate || 0,
        status: machineData.status || 'available',
        requires_training: machineData.requires_training || false,
        max_booking_hours: machineData.max_booking_hours || 4,
        location: machineData.location,
        brand: machineData.brand,
        model: machineData.model,
        specifications: machineData.specifications || [],
        safety_instructions: machineData.safety_instructions || [],
        is_active: machineData.is_active ?? true,
      };

      if (editingMachine) {
        await updateMachine.mutateAsync({ 
          id: editingMachine.id!, 
          data: submitData 
        });
        toast.success('Machine modifiée avec succès');
      } else {
        await createMachine.mutateAsync(submitData);
        toast.success('Machine créée avec succès');
      }

      setShowMachineForm(false);
      resetMachineForm();
    } catch (error) {
      toast.error('Une erreur est survenue');
      console.error('Erreur:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectData.title?.trim()) {
      toast.error('Le titre du projet est obligatoire');
      return;
    }

    if (!projectData.category?.trim()) {
      toast.error('La catégorie du projet est obligatoire');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const submitData: CreateProjectData = {
        title: projectData.title!,
        description: projectData.description,
        category: projectData.category!,
        difficulty: projectData.difficulty || 'Débutant',
        duration: projectData.duration,
        instructions: projectData.instructions,
        materials_needed: projectData.materials_needed || [],
        tools_required: projectData.tools_required || [],
        estimated_cost: projectData.estimated_cost,
        skill_level: projectData.skill_level || 'beginner',
        tags: projectData.tags || [],
        is_published: projectData.is_published ?? true,
        featured: projectData.featured ?? false,
      };

      if (editingProject) {
        await updateProject.mutateAsync({ 
          id: editingProject.id!, 
          data: submitData 
        });
        toast.success('Projet mis à jour avec succès !');
      } else {
        await createProject.mutateAsync(submitData);
        toast.success('Projet créé avec succès !');
      }
      
      setShowProjectForm(false);
      resetProjectForm();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast.error('Erreur lors de la sauvegarde du projet');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubscriptionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subscriptionData.name?.trim()) {
      toast.error('Le nom de l\'abonnement est obligatoire');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const submitData: CreateSubscriptionData = {
        name: subscriptionData.name!,
        slug: subscriptionData.slug || subscriptionData.name!.toLowerCase().replace(/\s+/g, '-'),
        description: subscriptionData.description,
        price: subscriptionData.price || 0,
        duration_months: subscriptionData.duration_months || 1,
        features: subscriptionData.features || [],
        type: subscriptionData.type || 'BASIC',
        max_hours_per_month: subscriptionData.max_hours_per_month,
        machine_access: subscriptionData.machine_access || [],
        training_included: subscriptionData.training_included || false,
        priority_booking: subscriptionData.priority_booking || false,
        is_active: subscriptionData.is_active ?? true,
        sort_order: subscriptionData.sort_order || 0,
      };

      if (editingSubscription) {
        await updateSubscription.mutateAsync({ 
          id: editingSubscription.id!, 
          data: submitData 
        });
        toast.success('Abonnement modifié avec succès');
      } else {
        await createSubscription.mutateAsync(submitData);
        toast.success('Abonnement créé avec succès');
      }

      setShowSubscriptionForm(false);
      // resetSubscriptionForm();
    } catch (error) {
      toast.error('Une erreur est survenue');
      console.error('Erreur:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTrainingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trainingData.name?.trim()) {
      toast.error('Le nom de la formation est obligatoire');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const submitData: CreateTrainingData = {
        name: trainingData.name!,
        slug: trainingData.slug || trainingData.name!.toLowerCase().replace(/\s+/g, '-'),
        description: trainingData.description,
        price: trainingData.price || 0,
        duration_hours: trainingData.duration_hours || 1,
        max_participants: trainingData.max_participants || 10,
        requirements: trainingData.requirements || [],
        what_you_learn: trainingData.what_you_learn || [],
        materials_included: trainingData.materials_included || [],
        is_active: trainingData.is_active ?? true,
        sort_order: trainingData.sort_order || 0,
        instructor: trainingData.instructor,
        difficulty_level: trainingData.difficulty_level || 'Débutant',
        category: trainingData.category || '',
      };

      if (editingTraining) {
        await updateTraining.mutateAsync({ 
          id: editingTraining.id!, 
          data: submitData 
        });
        toast.success('Formation modifiée avec succès');
      } else {
        await createTraining.mutateAsync(submitData);
        toast.success('Formation créée avec succès');
      }

      setShowTrainingForm(false);
      // resetTrainingForm();
    } catch (error) {
      toast.error('Une erreur est survenue');
      console.error('Erreur:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!serviceData.name?.trim()) {
      toast.error('Le nom du service est obligatoire');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const submitData: CreateServiceData = {
        name: serviceData.name!,
        slug: serviceData.slug || serviceData.name!.toLowerCase().replace(/\s+/g, '-'),
        description: serviceData.description,
        price: serviceData.price || 0,
        service_type: serviceData.service_type || 'autre',
        duration_estimated: serviceData.duration_estimated,
        requirements: serviceData.requirements || [],
        deliverables: serviceData.deliverables || [],
        is_active: serviceData.is_active ?? true,
        sort_order: serviceData.sort_order || 0,
      };

      if (editingService) {
        await updateService.mutateAsync({ 
          id: editingService.id!, 
          data: submitData 
        });
        toast.success('Service modifié avec succès');
      } else {
        await createService.mutateAsync(submitData);
        toast.success('Service créé avec succès');
      }

      setShowServiceForm(false);
      // resetServiceForm();
    } catch (error) {
      toast.error('Une erreur est survenue');
      console.error('Erreur:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMachine = async (machine: Machine) => {
    if (!machine.id) return;
    
    if (!confirm(`Êtes-vous sûr de vouloir supprimer la machine "${machine.name}" ?`)) {
      return;
    }

    try {
      await deleteMachine.mutateAsync(machine.id);
      toast.success('Machine supprimée avec succès !');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast.error('Erreur lors de la suppression de la machine');
    }
  };

  const handleDeleteProject = async (project: Project) => {
    if (!project.id) return;
    
    if (!confirm(`Êtes-vous sûr de vouloir supprimer le projet "${project.title}" ?`)) {
      return;
    }

    try {
      await deleteProject.mutateAsync(project.id);
      toast.success('Projet supprimé avec succès !');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast.error('Erreur lors de la suppression du projet');
    }
  };

  const handleDeleteSubscription = async (subscription: Subscription) => {
    if (!subscription.id) return;
    
    if (!confirm(`Êtes-vous sûr de vouloir supprimer l'abonnement "${subscription.name}" ?`)) {
      return;
    }

    try {
      await deleteSubscription.mutateAsync(subscription.id);
      toast.success('Abonnement supprimé avec succès !');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast.error('Erreur lors de la suppression de l\'abonnement');
    }
  };

  const handleDeleteTraining = async (training: Training) => {
    if (!training.id) return;
    
    if (!confirm(`Êtes-vous sûr de vouloir supprimer la formation "${training.name}" ?`)) {
      return;
    }

    try {
      await deleteTraining.mutateAsync(training.id);
      toast.success('Formation supprimée avec succès !');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast.error('Erreur lors de la suppression de la formation');
    }
  };

  const handleDeleteService = async (service: Service) => {
    if (!service.id) return;
    
    if (!confirm(`Êtes-vous sûr de vouloir supprimer le service "${service.name}" ?`)) {
      return;
    }

    try {
      await deleteService.mutateAsync(service.id);
      toast.success('Service supprimé avec succès !');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast.error('Erreur lors de la suppression du service');
    }
  };

  const formatPrice = (price?: number) => {
    if (!price) return 'Gratuit';
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'maintenance':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'unavailable':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Settings className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case 'available':
        return 'Disponible';
      case 'maintenance':
        return 'Maintenance';
      case 'unavailable':
        return 'Indisponible';
      default:
        return 'Inconnu';
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'Débutant':
        return 'bg-green-100 text-green-800';
      case 'Intermédiaire':
        return 'bg-yellow-100 text-yellow-800';
      case 'Avancé':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Wrench className="h-7 w-7 text-orange-600" />
            Gestion FabLab
          </h1>
          <p className="text-gray-600">Gérez les machines et projets du FabLab</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Machines</p>
                <p className="text-2xl font-bold">{machinesArray.length}</p>
              </div>
              <Cpu className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Disponibles</p>
                <p className="text-2xl font-bold text-green-600">
                  {machinesArray.filter(m => m.status === 'available').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Projets</p>
                <p className="text-2xl font-bold">{projectsArray.length}</p>
              </div>
              <CircuitBoard className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Publiés</p>
                <p className="text-2xl font-bold text-blue-600">
                  {projectsArray.filter(p => p.is_published).length}
                </p>
              </div>
              <Settings className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'machines' | 'projects' | 'subscriptions' | 'trainings' | 'services')}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="machines" className="flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              Machines ({machines?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <CircuitBoard className="h-4 w-4" />
              Projets ({projects?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Abonnements ({subscriptions?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="trainings" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Formations ({trainings?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Services ({services?.length || 0})
            </TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            {activeTab === 'machines' && (
              <Button onClick={() => {
                console.log('Button clicked for machines');
                handleOpenMachineForm();
              }} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nouvelle Machine
              </Button>
            )}
            {activeTab === 'projects' && (
              <Button onClick={() => {
                console.log('Button clicked for projects');
                handleOpenProjectForm();
              }} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nouveau Projet
              </Button>
            )}
            {activeTab === 'subscriptions' && (
              <Button onClick={() => {
                console.log('Button clicked for subscriptions');
                setShowSubscriptionForm(true);
              }} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nouvel Abonnement
              </Button>
            )}
            {activeTab === 'trainings' && (
              <Button onClick={() => {
                console.log('Button clicked for trainings');
                setShowTrainingForm(true);
              }} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nouvelle Formation
              </Button>
            )}
            {activeTab === 'services' && (
              <Button onClick={() => {
                console.log('Button clicked for services');
                setShowServiceForm(true);
              }} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nouveau Service
              </Button>
            )}
          </div>
        </div>

        {/* Machines Tab */}
        <TabsContent value="machines">
          <Card>
            <CardHeader>
              <CardTitle>Machines FabLab ({machines?.length || 0})</CardTitle>
              <CardDescription>
                Gérez les machines disponibles dans le FabLab
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingMachines ? (
                <div className="flex justify-center items-center h-32">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Chargement des machines...</span>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Machine</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Tarif/h</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {machinesArray.map((machine) => (
                        <TableRow key={machine.id}>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{machine.name}</div>
                              {machine.description && (
                                <div className="text-sm text-gray-600 line-clamp-2">
                                  {machine.description}
                                </div>
                              )}
                              {machine.features && machine.features.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {machine.features.slice(0, 2).map((feature, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                  {machine.features.length > 2 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{machine.features.length - 2}
                                    </Badge>
                                  )}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{machine.code || 'N/A'}</Badge>
                          </TableCell>
                          <TableCell>{machine.type || 'N/A'}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              <span>{formatPrice(machine.hourly_rate)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(machine.status)}
                              <span className="text-sm">{getStatusLabel(machine.status)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleOpenMachineForm(machine)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteMachine(machine)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {(!machines || machines.length === 0) && (
                    <div className="text-center py-8">
                      <Cpu className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune machine</h3>
                      <p className="text-gray-500 mb-4">Commencez par ajouter votre première machine.</p>
                      <Button onClick={() => handleOpenMachineForm()}>
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter une machine
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Projets FabLab ({projects?.length || 0})</CardTitle>
              <CardDescription>
                Gérez les projets et tutoriels du FabLab
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingProjects ? (
                <div className="flex justify-center items-center h-32">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Chargement des projets...</span>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Projet</TableHead>
                        <TableHead>Catégorie</TableHead>
                        <TableHead>Difficulté</TableHead>
                        <TableHead>Durée</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projectsArray.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{project.title}</div>
                              {project.description && (
                                <div className="text-sm text-gray-600 line-clamp-2">
                                  {project.description}
                                </div>
                              )}
                              {project.materials_needed && project.materials_needed.length > 0 && (
                                <div className="text-xs text-gray-500">
                                  {project.materials_needed.length} matériaux requis
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {project.category && (
                              <Badge variant="outline">{project.category}</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge className={getDifficultyColor(project.difficulty)}>
                              {project.difficulty}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{project.duration || 'N/A'}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={project.is_published ? 'default' : 'secondary'}
                              className={project.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                            >
                              {project.is_published ? 'Publié' : 'Brouillon'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleOpenProjectForm(project)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteProject(project)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {(!projects || projects.length === 0) && (
                    <div className="text-center py-8">
                      <CircuitBoard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun projet</h3>
                      <p className="text-gray-500 mb-4">Commencez par créer votre premier projet.</p>
                      <Button onClick={() => handleOpenProjectForm()}>
                        <Plus className="h-4 w-4 mr-2" />
                        Créer un projet
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscriptions Tab */}
        <TabsContent value="subscriptions">
          <Card>
            <CardHeader>
              <CardTitle>Abonnements FabLab ({subscriptions?.length || 0})</CardTitle>
              <CardDescription>
                Gérez les formules d'abonnement du FabLab
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingSubscriptions ? (
                <div className="flex justify-center items-center h-32">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Chargement des abonnements...</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {subscriptionsArray.map((subscription) => (
                    <Card key={subscription.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h3 className="font-semibold">{subscription.name}</h3>
                          <p className="text-gray-600">{subscription.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <Badge variant="outline">{subscription.type}</Badge>
                            <span>{formatPrice(subscription.price)}/mois</span>
                            <span>{subscription.duration_months} mois</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => {
                            setEditingSubscription(subscription);
                            setShowSubscriptionForm(true);
                          }}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDeleteSubscription(subscription)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                  
                  {(!subscriptions || subscriptions.length === 0) && (
                    <div className="text-center py-8">
                      <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun abonnement</h3>
                      <p className="text-gray-500 mb-4">Créez votre première formule d'abonnement.</p>
                      <Button onClick={() => setShowSubscriptionForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Créer un abonnement
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trainings Tab */}
        <TabsContent value="trainings">
          <Card>
            <CardHeader>
              <CardTitle>Formations FabLab ({trainings?.length || 0})</CardTitle>
              <CardDescription>
                Gérez les formations et ateliers du FabLab
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingTrainings ? (
                <div className="flex justify-center items-center h-32">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Chargement des formations...</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {trainingsArray.map((training) => (
                    <Card key={training.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h3 className="font-semibold">{training.name}</h3>
                          <p className="text-gray-600">{training.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <Badge className={getDifficultyColor(training.difficulty_level)}>
                              {training.difficulty_level}
                            </Badge>
                            <span>{formatPrice(training.price)}</span>
                            <span>{training.duration_hours}h</span>
                            <span>{training.max_participants} participants max</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => {
                            setEditingTraining(training);
                            setShowTrainingForm(true);
                          }}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDeleteTraining(training)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                  
                  {(!trainings || trainings.length === 0) && (
                    <div className="text-center py-8">
                      <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune formation</h3>
                      <p className="text-gray-500 mb-4">Créez votre première formation.</p>
                      <Button onClick={() => setShowTrainingForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Créer une formation
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Services FabLab ({services?.length || 0})</CardTitle>
              <CardDescription>
                Gérez les services personnalisés du FabLab
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingServices ? (
                <div className="flex justify-center items-center h-32">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Chargement des services...</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {servicesArray.map((service) => (
                    <Card key={service.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h3 className="font-semibold">{service.name}</h3>
                          <p className="text-gray-600">{service.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <Badge variant="outline">{service.service_type}</Badge>
                            <span>{formatPrice(service.price)}</span>
                            {service.duration_estimated && <span>{service.duration_estimated}</span>}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => {
                            setEditingService(service);
                            setShowServiceForm(true);
                          }}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDeleteService(service)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                  
                  {(!services || services.length === 0) && (
                    <div className="text-center py-8">
                      <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun service</h3>
                      <p className="text-gray-500 mb-4">Créez votre premier service personnalisé.</p>
                      <Button onClick={() => setShowServiceForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Créer un service
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Machine Form Dialog */}
      <Dialog open={showMachineForm} onOpenChange={setShowMachineForm}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingMachine ? 'Modifier la machine' : 'Nouvelle machine'}
            </DialogTitle>
            <DialogDescription>
              {editingMachine 
                ? 'Modifiez les informations de la machine.' 
                : 'Ajoutez une nouvelle machine au FabLab.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleMachineSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="machine-name">Nom de la machine *</Label>
                <Input
                  id="machine-name"
                  value={machineData.name}
                  onChange={(e) => setMachineData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Imprimante 3D Ultimaker"
                  required
                />
              </div>

              <div>
                <Label htmlFor="machine-code">Code machine</Label>
                <Input
                  id="machine-code"
                  value={machineData.code || ''}
                  onChange={(e) => setMachineData(prev => ({ ...prev, code: e.target.value }))}
                  placeholder="Ex: FAB-IMP01"
                />
              </div>

              <div>
                <Label htmlFor="machine-type">Type</Label>
                <Input
                  id="machine-type"
                  value={machineData.type || ''}
                  onChange={(e) => setMachineData(prev => ({ ...prev, type: e.target.value }))}
                  placeholder="Ex: Imprimante 3D"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="machine-description">Description</Label>
                <Textarea
                  id="machine-description"
                  value={machineData.description || ''}
                  onChange={(e) => setMachineData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Description détaillée de la machine..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="machine-hourly-rate">Tarif horaire (FCFA)</Label>
                <Input
                  id="machine-hourly-rate"
                  type="number"
                  value={machineData.hourly_rate || 0}
                  onChange={(e) => setMachineData(prev => ({ 
                    ...prev, 
                    hourly_rate: parseInt(e.target.value) || 0 
                  }))}
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="machine-status">Statut</Label>
                <Select
                  value={machineData.status}
                  onValueChange={(value: 'available' | 'maintenance' | 'unavailable') => 
                    setMachineData(prev => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Disponible</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="unavailable">Indisponible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="machine-image">Image de la machine</Label>
                <ImageUpload
                  value={machineData.previewUrl || machineData.image_url}
                  onChange={(file, previewUrl) => {
                    setMachineData(prev => ({
                      ...prev,
                      imageFile: file,
                      previewUrl: previewUrl
                    }));
                  }}
                  type="fablab"
                  placeholder="Sélectionnez une image pour la machine"
                />
              </div>

              <div>
                <Label htmlFor="machine-location">Localisation</Label>
                <Input
                  id="machine-location"
                  value={machineData.location || ''}
                  onChange={(e) => setMachineData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Zone ou atelier"
                />
              </div>

              <div>
                <Label htmlFor="machine-brand">Marque</Label>
                <Input
                  id="machine-brand"
                  value={machineData.brand || ''}
                  onChange={(e) => setMachineData(prev => ({ ...prev, brand: e.target.value }))}
                  placeholder="Marque de la machine"
                />
              </div>

              <div>
                <Label htmlFor="machine-model">Modèle</Label>
                <Input
                  id="machine-model"
                  value={machineData.model || ''}
                  onChange={(e) => setMachineData(prev => ({ ...prev, model: e.target.value }))}
                  placeholder="Modèle de la machine"
                />
              </div>

              <div>
                <Label htmlFor="machine-max-hours">Max heures par réservation</Label>
                <Input
                  id="machine-max-hours"
                  type="number"
                  value={machineData.max_booking_hours || 4}
                  onChange={(e) => setMachineData(prev => ({ ...prev, max_booking_hours: parseInt(e.target.value) || 4 }))}
                  min="1"
                  max="24"
                />
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="machine-training"
                  checked={machineData.requires_training || false}
                  onCheckedChange={(checked) => setMachineData(prev => ({ ...prev, requires_training: checked }))}
                />
                <Label htmlFor="machine-training">Formation requise</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="machine-active"
                  checked={machineData.is_active || false}
                  onCheckedChange={(checked) => setMachineData(prev => ({ ...prev, is_active: checked }))}
                />
                <Label htmlFor="machine-active">Machine active</Label>
              </div>
            </div>

            {/* Caractéristiques */}
            <div>
              <Label>Caractéristiques</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Ajouter une caractéristique"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                />
                <Button type="button" onClick={addFeature} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {machineData.features && machineData.features.length > 0 && (
                <div className="space-y-2">
                  {machineData.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <span className="flex-1">{feature}</span>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFeature(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Spécifications */}
            <div>
              <Label>Spécifications techniques</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newSpecification}
                  onChange={(e) => setNewSpecification(e.target.value)}
                  placeholder="Ajouter une spécification"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecification())}
                />
                <Button type="button" onClick={addSpecification} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {machineData.specifications && machineData.specifications.length > 0 && (
                <div className="space-y-2">
                  {machineData.specifications.map((spec, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <span className="flex-1">{spec}</span>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => removeSpecification(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Instructions de sécurité */}
            <div>
              <Label>Instructions de sécurité</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newSafetyInstruction}
                  onChange={(e) => setNewSafetyInstruction(e.target.value)}
                  placeholder="Ajouter une instruction de sécurité"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSafetyInstruction())}
                />
                <Button type="button" onClick={addSafetyInstruction} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {machineData.safety_instructions && machineData.safety_instructions.length > 0 && (
                <div className="space-y-2">
                  {machineData.safety_instructions.map((instruction, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <span className="flex-1">{instruction}</span>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => removeSafetyInstruction(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowMachineForm(false)}
                disabled={isSubmitting}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {editingMachine ? 'Modification...' : 'Création...'}
                  </>
                ) : (
                  editingMachine ? 'Modifier' : 'Créer'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Project Form Dialog */}
      <Dialog open={showProjectForm} onOpenChange={setShowProjectForm}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? 'Modifier le projet' : 'Nouveau projet'}
            </DialogTitle>
            <DialogDescription>
              {editingProject 
                ? 'Modifiez les informations du projet.' 
                : 'Créez un nouveau projet pour le FabLab.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleProjectSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="project-title">Titre du projet *</Label>
                <Input
                  id="project-title"
                  value={projectData.title}
                  onChange={(e) => setProjectData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: Prototype de drone agricole"
                  required
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="project-description">Description</Label>
                <Textarea
                  id="project-description"
                  value={projectData.description || ''}
                  onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Description du projet..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="project-category">Catégorie</Label>
                <Input
                  id="project-category"
                  value={projectData.category || ''}
                  onChange={(e) => setProjectData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="Ex: Prototypage"
                />
              </div>

              <div>
                <Label htmlFor="project-difficulty">Difficulté</Label>
                <Select
                  value={projectData.difficulty}
                  onValueChange={(value: 'Débutant' | 'Intermédiaire' | 'Avancé') => 
                    setProjectData(prev => ({ ...prev, difficulty: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Débutant">Débutant</SelectItem>
                    <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                    <SelectItem value="Avancé">Avancé</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="project-duration">Durée estimée</Label>
                <Input
                  id="project-duration"
                  value={projectData.duration || ''}
                  onChange={(e) => setProjectData(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="Ex: 2 semaines"
                />
              </div>

              <div>
                <Label htmlFor="project-skill-level">Niveau de compétence</Label>
                <Select
                  value={projectData.skill_level}
                  onValueChange={(value: 'beginner' | 'intermediate' | 'advanced') => 
                    setProjectData(prev => ({ ...prev, skill_level: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Débutant</SelectItem>
                    <SelectItem value="intermediate">Intermédiaire</SelectItem>
                    <SelectItem value="advanced">Avancé</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="project-estimated-cost">Coût estimé (FCFA)</Label>
                <Input
                  id="project-estimated-cost"
                  type="number"
                  value={projectData.estimated_cost || 0}
                  onChange={(e) => setProjectData(prev => ({ ...prev, estimated_cost: Number(e.target.value) }))}
                  placeholder="0"
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="project-image">Image du projet</Label>
                <ImageUpload
                  value={projectData.previewUrl || projectData.image_url}
                  onChange={(file, previewUrl) => {
                    setProjectData(prev => ({
                      ...prev,
                      imageFile: file || undefined,
                      previewUrl: previewUrl
                    }));
                  }}
                  type="fablab"
                  placeholder="Sélectionnez une image pour le projet"
                />
              </div>

              <div>
                <Label htmlFor="project-tools">Outils requis</Label>
                <Input
                  id="project-tools"
                  value={Array.isArray(projectData.tools_required) ? projectData.tools_required.join(', ') : projectData.tools_required || ''}
                  onChange={(e) => setProjectData(prev => ({ 
                    ...prev, 
                    tools_required: e.target.value.split(',').map(tool => tool.trim()).filter(tool => tool)
                  }))}
                  placeholder="Ex: Imprimante 3D, Découpeuse laser"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="project-instructions">Instructions</Label>
                <Textarea
                  id="project-instructions"
                  value={projectData.instructions || ''}
                  onChange={(e) => setProjectData(prev => ({ ...prev, instructions: e.target.value }))}
                  placeholder="Instructions détaillées du projet..."
                  rows={4}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="project-published"
                  checked={projectData.is_published || false}
                  onCheckedChange={(checked) => setProjectData(prev => ({ 
                    ...prev, 
                    is_published: checked 
                  }))}
                />
                <Label htmlFor="project-published">Projet publié</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="project-featured"
                  checked={projectData.featured || false}
                  onCheckedChange={(checked) => setProjectData(prev => ({ 
                    ...prev, 
                    featured: checked 
                  }))}
                />
                <Label htmlFor="project-featured">Projet en vedette</Label>
              </div>
            </div>

            {/* Materials */}
            <div>
              <Label>Matériaux nécessaires</Label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newMaterial}
                    onChange={(e) => setNewMaterial(e.target.value)}
                    placeholder="Ajouter un matériau"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMaterial())}
                  />
                  <Button type="button" onClick={addMaterial} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {projectData.materials_needed && projectData.materials_needed.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {projectData.materials_needed.map((material, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {material}
                        <button
                          type="button"
                          onClick={() => removeMaterial(index)}
                          className="ml-1 hover:text-red-600"
                          title="Supprimer ce matériau"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div>
              <Label>Tags du projet</Label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Ajouter un tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {projectData.tags && projectData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {projectData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="ml-1 hover:text-red-600"
                          title="Supprimer ce tag"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowProjectForm(false)}
                disabled={isSubmitting}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {editingProject ? 'Modification...' : 'Création...'}
                  </>
                ) : (
                  editingProject ? 'Modifier' : 'Créer'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminContenusFablabPage;
