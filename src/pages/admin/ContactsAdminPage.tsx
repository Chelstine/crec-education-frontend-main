import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Eye, 
  Reply, 
  Trash2, 
  Mail,
  User,
  Calendar,
  BarChart3
} from 'lucide-react';
import { messageContactService } from '@/services/adminService';
import { MessageContact } from '@/types/admin';

const ContactsAdminPage = () => {
  const [messages, setMessages] = useState<MessageContact[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<MessageContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedMessage, setSelectedMessage] = useState<MessageContact | null>(null);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [showReplyDialog, setShowReplyDialog] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  // Statistiques
  const [stats, setStats] = useState({
    total: 0,
    nouveaux: 0,
    lus: 0,
    repondus: 0
  });

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    filterMessages();
  }, [messages, searchTerm, statusFilter]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await messageContactService.getAll();
      setMessages(data);
      
      // Calculer les statistiques
      const statsData = {
        total: data.length,
        nouveaux: data.filter(m => m.status === 'new').length,
        lus: data.filter(m => m.status === 'read').length,
        repondus: data.filter(m => m.status === 'replied').length
      };
      setStats(statsData);
    } catch (error) {
      console.error('Erreur lors du chargement des messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterMessages = () => {
    let filtered = messages;

    // Filtrer par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(message =>
        message.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrer par statut
    if (statusFilter !== 'all') {
      filtered = filtered.filter(message => message.status === statusFilter);
    }

    setFilteredMessages(filtered);
  };

  const handleViewMessage = async (message: MessageContact) => {
    setSelectedMessage(message);
    setShowMessageDialog(true);

    // Marquer comme lu si nouveau
    if (message.status === 'new') {
      await handleStatusUpdate(message.id, 'read');
    }
  };

  const handleStatusUpdate = async (messageId: string, status: 'read' | 'replied') => {
    try {
      await messageContactService.updateStatus(messageId, status);
      await loadMessages();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
    }
  };

  const handleReply = (message: MessageContact) => {
    setSelectedMessage(message);
    setReplyContent(`Bonjour ${message.nom},\n\nMerci pour votre message.\n\n`);
    setShowReplyDialog(true);
  };

  const handleSendReply = async () => {
    if (!selectedMessage || !replyContent.trim()) return;

    try {
      await messageContactService.sendReply(selectedMessage.id, replyContent);
      setShowReplyDialog(false);
      setReplyContent('');
      setSelectedMessage(null);
      await loadMessages();
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la réponse:', error);
    }
  };

  const handleDelete = async (messageId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      try {
        await messageContactService.delete(messageId);
        await loadMessages();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  const getStatusBadge = (status: MessageContact['status']) => {
    const styles = {
      new: 'bg-red-100 text-red-800',
      read: 'bg-blue-100 text-blue-800',
      replied: 'bg-green-100 text-green-800'
    };

    const labels = {
      new: 'Nouveau',
      read: 'Lu',
      replied: 'Répondu'
    };

    return (
      <Badge className={styles[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-crec-gold"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Contacts</h1>
          <p className="text-gray-600">Gérez les messages reçus via le formulaire de contact</p>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Messages</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Mail className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Nouveaux</p>
                <p className="text-2xl font-bold text-gray-900">{stats.nouveaux}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Lus</p>
                <p className="text-2xl font-bold text-gray-900">{stats.lus}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Reply className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Répondus</p>
                <p className="text-2xl font-bold text-gray-900">{stats.repondus}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par nom, email ou message..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="new">Nouveaux</SelectItem>
                  <SelectItem value="read">Lus</SelectItem>
                  <SelectItem value="replied">Répondus</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des messages */}
      <Card>
        <CardHeader>
          <CardTitle>Messages de Contact ({filteredMessages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredMessages.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">Aucun message</h3>
              <p className="mt-1 text-sm text-gray-500">
                {messages.length === 0 ? 'Aucun message reçu pour le moment.' : 'Aucun message ne correspond aux critères de recherche.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 border rounded-lg ${message.status === 'new' ? 'bg-red-50 border-red-200' : 'bg-white'}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="font-semibold text-gray-900">{message.nom}</span>
                        <span className="text-sm text-gray-500">{message.email}</span>
                        {getStatusBadge(message.status)}
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Calendar className="h-4 w-4" />
                        {formatDate(message.dateEnvoi)}
                      </div>

                      <p className="text-gray-700 line-clamp-2">{message.message}</p>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewMessage(message)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Voir
                      </Button>
                      
                      {message.status !== 'replied' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReply(message)}
                        >
                          <Reply className="h-4 w-4 mr-1" />
                          Répondre
                        </Button>
                      )}
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(message.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog pour voir le message */}
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message de Contact</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Nom</label>
                  <p className="font-semibold">{selectedMessage.nom}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="font-semibold">{selectedMessage.email}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Date d'envoi</label>
                <p className="font-semibold">{formatDate(selectedMessage.dateEnvoi)}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Statut</label>
                <div className="mt-1">{getStatusBadge(selectedMessage.status)}</div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Message</label>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMessageDialog(false)}>
              Fermer
            </Button>
            {selectedMessage && selectedMessage.status !== 'replied' && (
              <Button onClick={() => {
                setShowMessageDialog(false);
                handleReply(selectedMessage);
              }}>
                <Reply className="h-4 w-4 mr-2" />
                Répondre
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour répondre */}
      <Dialog open={showReplyDialog} onOpenChange={setShowReplyDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Répondre au Message</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Message original de {selectedMessage.nom}:</p>
                <p className="text-sm italic">{selectedMessage.message}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Votre réponse</label>
                <Textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  rows={8}
                  className="mt-2"
                  placeholder="Tapez votre réponse ici..."
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReplyDialog(false)}>
              Annuler
            </Button>
            <Button onClick={handleSendReply} disabled={!replyContent.trim()}>
              <Reply className="h-4 w-4 mr-2" />
              Envoyer la Réponse
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactsAdminPage;
