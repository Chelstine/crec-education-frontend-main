// src/pages/admin/inscriptions/AdminInscriptionsUniversityPage.tsx
import inscriptionService, { UniversityInscription } from '@/services/inscription-service';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Eye,
  CheckCircle,
  XCircle,
  Download,
  Filter,
  Search,
  Calendar,
  User,
  Mail,
  Phone,
  GraduationCap,
  MapPin,
  Users,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

const AdminInscriptionsUniversityPage: React.FC = () => {
  const [inscriptions, setInscriptions] = useState<UniversityInscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInscription, setSelectedInscription] = useState<UniversityInscription | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [processing, setProcessing] = useState(false);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [programFilter, setProgramFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const programNames = {
    'prog-1': 'Licence en Développement Logiciel',
    'prog-2': 'Master en Data Science',
    'prog-3': 'Licence en Théologie',
  };

  const genderNames = {
    male: 'Masculin',
    female: 'Féminin',
    other: 'Autre',
  };

  const mentionNames = {
    passable: 'Passable',
    'assez-bien': 'Assez Bien',
    bien: 'Bien',
    'tres-bien': 'Très Bien',
  };

  useEffect(() => {
    fetchInscriptions();
  }, [currentPage, statusFilter, programFilter]);

  const fetchInscriptions = async () => {
    try {
      setLoading(true);
      const params: any = {
        page: currentPage,
        per_page: 15,
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(programFilter !== 'all' && { program: programFilter }),
      };
      const response = await inscriptionService.getInscriptionsByType('university', params);
      if (response.success) {
        setInscriptions(response.data.data as UniversityInscription[]);
        setTotalPages(response.data.last_page);
      } else {
        setInscriptions([]);
        setTotalPages(1);
        toast.error('Erreur lors du chargement des inscriptions');
      }
    } catch (error) {
      console.error('Erreur lors du chargement des inscriptions:', error);
      toast.error('Erreur lors du chargement des inscriptions');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (inscription: UniversityInscription) => {
    setSelectedInscription(inscription);
    setShowDetailsModal(true);
  };

  const handleApprove = (inscription: UniversityInscription) => {
    setSelectedInscription(inscription);
    setAdminNotes('');
    setShowApproveModal(true);
  };

  const handleReject = (inscription: UniversityInscription) => {
    setSelectedInscription(inscription);
    setAdminNotes('');
    setRejectionReason('');
    setShowRejectModal(true);
  };

  const handleDownloadDocuments = (inscription: UniversityInscription) => {
    const baseUrl = import.meta.env?.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000';
    window.open(`${baseUrl}/storage/${inscription.documents_path}`, '_blank');
  };

  const confirmApproval = async () => {
    if (!selectedInscription) return;
    try {
      setProcessing(true);
      const response = await inscriptionService.approveInscription('university', selectedInscription.id, adminNotes);
      if (response.success) {
        toast.success('Inscription approuvée avec succès !');
        setShowApproveModal(false);
        fetchInscriptions();
      } else {
        toast.error(response.message || 'Erreur lors de l\'approbation');
      }
    } catch (error) {
      console.error('Erreur lors de l\'approbation:', error);
      toast.error('Erreur lors de l\'approbation');
    } finally {
      setProcessing(false);
    }
  };

  const confirmRejection = async () => {
    if (!selectedInscription || !rejectionReason.trim()) {
      toast.error('Veuillez spécifier une raison de rejet');
      return;
    }
    try {
      setProcessing(true);
      const response = await inscriptionService.rejectInscription('university', selectedInscription.id, rejectionReason, adminNotes);
      if (response.success) {
        toast.success('Inscription rejetée avec succès !');
        setShowRejectModal(false);
        fetchInscriptions();
      } else {
        toast.error(response.message || 'Erreur lors du rejet');
      }
    } catch (error) {
      console.error('Erreur lors du rejet:', error);
      toast.error('Erreur lors du rejet');
    } finally {
      setProcessing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approuvée</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejetée</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>;
    }
  };

  const getProgramBadge = (program: string) => {
    const colors = {
      'prog-1': 'bg-blue-100 text-blue-800',
      'prog-2': 'bg-purple-100 text-purple-800',
      'prog-3': 'bg-green-100 text-green-800',
    };

    return (
      <Badge className={colors[program as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {programNames[program as keyof typeof programNames] || program}
      </Badge>
    );
  };

  const filteredInscriptions = inscriptions.filter((inscription) => {
    const matchesSearch =
      searchTerm === '' ||
      inscription.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inscription.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inscription.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inscription.phone.includes(searchTerm) ||
      inscription.city.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const calculateAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Inscriptions - Université University</h1>
          <p className="text-gray-600">Gérez les demandes d'inscription universitaire</p>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="approved">Approuvées</SelectItem>
                <SelectItem value="rejected">Rejetées</SelectItem>
              </SelectContent>
            </Select>

            <Select value={programFilter} onValueChange={setProgramFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par programme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les programmes</SelectItem>
                <SelectItem value="prog-1">Licence Développement Logiciel</SelectItem>
                <SelectItem value="prog-2">Master Data Science</SelectItem>
                <SelectItem value="prog-3">Licence Théologie</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={fetchInscriptions} className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Actualiser
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Inscriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inscriptions Universitaires ({filteredInscriptions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidat</TableHead>
                  <TableHead>Programme</TableHead>
                  <TableHead>Informations</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInscriptions.map((inscription) => (
                  <TableRow key={inscription.id}>
                    <TableCell>
                      <div className="font-medium">
                        {inscription.firstName} {inscription.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {calculateAge(inscription.dob)} ans, {genderNames[inscription.gender]}
                      </div>
                    </TableCell>
                    <TableCell>{getProgramBadge(inscription.program)}</TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {inscription.city}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {inscription.nationality}
                        </div>
                        {inscription.program === 'prog-2' ? (
                          <div className="text-xs text-gray-500">
                            Licence: {inscription.licenseYear} - {inscription.licenseUniversity}
                          </div>
                        ) : (
                          <div className="text-xs text-gray-500">
                            Bac: {inscription.graduationYear} -{' '}
                            {inscription.bacMention ? mentionNames[inscription.bacMention as keyof typeof mentionNames] : ''}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {inscription.email}
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Phone className="h-3 w-3" />
                          {inscription.phone}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Parent: {inscription.parentNames}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3" />
                        {formatDate(inscription.created_at)}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(inscription.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(inscription)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDownloadDocuments(inscription)}>
                          <Download className="h-4 w-4" />
                        </Button>
                        {inscription.status === 'pending' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleApprove(inscription)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleReject(inscription)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Précédent
              </Button>
              <span className="flex items-center px-4">
                Page {currentPage} sur {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Suivant
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Détails de l'inscription universitaire</DialogTitle>
            <DialogDescription>
              Informations complètes sur la demande d'inscription à l'université University
            </DialogDescription>
          </DialogHeader>

          {selectedInscription && (
            <div className="space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Personal Information */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Informations personnelles
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <span className="font-medium">Nom complet:</span>
                    <p>
                      {selectedInscription.firstName} {selectedInscription.lastName}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Date de naissance:</span>
                    <p>
                      {formatDate(selectedInscription.dob)} ({calculateAge(selectedInscription.dob)} ans)
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Genre:</span>
                    <p>{genderNames[selectedInscription.gender]}</p>
                  </div>
                  <div>
                    <span className="font-medium">Nationalité:</span>
                    <p>{selectedInscription.nationality}</p>
                  </div>
                  <div>
                    <span className="font-medium">Ville:</span>
                    <p>{selectedInscription.city}</p>
                  </div>
                  <div>
                    <span className="font-medium">Date d'inscription:</span>
                    <p>{formatDate(selectedInscription.created_at)}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Contact
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <span className="font-medium">Email:</span>
                    <p>{selectedInscription.email}</p>
                  </div>
                  <div>
                    <span className="font-medium">Téléphone:</span>
                    <p>{selectedInscription.phone}</p>
                  </div>
                  <div>
                    <span className="font-medium">Parent/Tuteur:</span>
                    <p>{selectedInscription.parentNames}</p>
                  </div>
                  <div>
                    <span className="font-medium">Tél. Parent/Tuteur:</span>
                    <p>{selectedInscription.parentPhone}</p>
                  </div>
                </div>
              </div>

              {/* Academic Program */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Programme demandé
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-4">
                    <span className="font-medium">Programme:</span>
                    <div className="mt-1">{getProgramBadge(selectedInscription.program)}</div>
                  </div>

                  {selectedInscription.program === 'prog-2' ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="font-medium">Année d'obtention licence:</span>
                        <p>{selectedInscription.licenseYear}</p>
                      </div>
                      <div>
                        <span className="font-medium">Université de licence:</span>
                        <p>{selectedInscription.licenseUniversity}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="font-medium">Établissement Bac:</span>
                        <p>{selectedInscription.highSchool}</p>
                      </div>
                      <div>
                        <span className="font-medium">Mention Bac:</span>
                        <p>
                          {selectedInscription.bacMention
                            ? mentionNames[selectedInscription.bacMention as keyof typeof mentionNames]
                            : 'Non spécifiée'}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">Année d'obtention:</span>
                        <p>{selectedInscription.graduationYear}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Status and Processing */}
              <div>
                <h3 className="font-semibold mb-3">Statut et traitement</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">Statut:</span>
                    {getStatusBadge(selectedInscription.status)}
                  </div>

                  {selectedInscription.processed_at && (
                    <div>
                      <span className="font-medium">Traité le:</span>
                      <p>{formatDate(selectedInscription.processed_at)}</p>
                    </div>
                  )}

                  {selectedInscription.processedBy && (
                    <div>
                      <span className="font-medium">Traité par:</span>
                      <p>
                        {selectedInscription.processedBy.prenom} {selectedInscription.processedBy.nom}
                      </p>
                    </div>
                  )}

                  {selectedInscription.admin_notes && (
                    <div className="mt-2">
                      <span className="font-medium">Notes admin:</span>
                      <p className="text-gray-700">{selectedInscription.admin_notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Consent */}
              <div>
                <h3 className="font-semibold mb-3">Consentement</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Acceptation des conditions:</span>
                    <Badge
                      className={
                        selectedInscription.agreeToTerms ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }
                    >
                      {selectedInscription.agreeToTerms ? 'Acceptées' : 'Non acceptées'}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsModal(false)}>
              Fermer
            </Button>
            {selectedInscription && (
              <Button onClick={() => handleDownloadDocuments(selectedInscription)}>
                <FileText className="h-4 w-4 mr-2" />
                Télécharger les documents
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approval Modal */}
      <Dialog open={showApproveModal} onOpenChange={setShowApproveModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approuver l'inscription</DialogTitle>
            <DialogDescription>Voulez-vous approuver cette inscription universitaire ?</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Notes administratives (optionnel)</label>
              <Textarea
                placeholder="Ajoutez des notes internes si nécessaire..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApproveModal(false)} disabled={processing}>
              Annuler
            </Button>
            <Button
              onClick={confirmApproval}
              disabled={processing}
              className="bg-green-600 hover:bg-green-700"
            >
              {processing ? 'Traitement...' : 'Approuver'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rejection Modal */}
      <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rejeter l'inscription</DialogTitle>
            <DialogDescription>
              Veuillez spécifier la raison du rejet de cette inscription universitaire.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Raison du rejet *</label>
              <Textarea
                placeholder="Expliquez pourquoi cette inscription est rejetée..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Notes administratives internes (optionnel)</label>
              <Textarea
                placeholder="Notes internes non visibles par le candidat..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows={2}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectModal(false)} disabled={processing}>
              Annuler
            </Button>
            <Button
              onClick={confirmRejection}
              disabled={processing || !rejectionReason.trim()}
              variant="destructive"
            >
              {processing ? 'Traitement...' : 'Rejeter'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminInscriptionsUniversityPage;