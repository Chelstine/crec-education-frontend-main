import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  Users,
  Calendar,
  DollarSign,
  AlertCircle
} from 'lucide-react';

interface FabLabSubscription {
  id: string;
  userId: string;
  userName: string;
  email: string;
  phone: string;
  subscriptionType: 'monthly' | 'quarterly' | 'annual' | 'student';
  status: 'active' | 'pending' | 'expired' | 'cancelled';
  startDate: string;
  endDate: string;
  amount: number;
  paymentStatus: 'paid' | 'pending' | 'failed';
  documentsUploaded: string[];
  skills: string[];
  interests: string[];
  submittedAt: string;
}

const FabLabInscriptions: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<FabLabSubscription[]>([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<FabLabSubscription[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [selectedSubscription, setSelectedSubscription] = useState<FabLabSubscription | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data for development
  useEffect(() => {
    const mockSubscriptions: FabLabSubscription[] = [
      {
        id: 'sub-001',
        userId: 'user-001',
        userName: 'Marie Dubois',
        email: 'marie.dubois@email.com',
        phone: '+33 6 12 34 56 78',
        subscriptionType: 'monthly',
        status: 'active',
        startDate: '2024-01-15',
        endDate: '2024-02-15',
        amount: 50,
        paymentStatus: 'paid',
        documentsUploaded: ['id-card.pdf', 'student-certificate.pdf'],
        skills: ['3D Design', 'Arduino'],
        interests: ['Prototyping', 'IoT'],
        submittedAt: '2024-01-10T10:30:00Z'
      },
      {
        id: 'sub-002',
        userId: 'user-002',
        userName: 'Jean Martin',
        email: 'jean.martin@email.com',
        phone: '+33 6 98 76 54 32',
        subscriptionType: 'annual',
        status: 'pending',
        startDate: '2024-02-01',
        endDate: '2025-02-01',
        amount: 400,
        paymentStatus: 'pending',
        documentsUploaded: ['id-card.pdf'],
        skills: ['Laser Cutting', 'Woodworking'],
        interests: ['Furniture Design', 'Crafts'],
        submittedAt: '2024-01-25T14:15:00Z'
      },
      {
        id: 'sub-003',
        userId: 'user-003',
        userName: 'Sophie Bernard',
        email: 'sophie.bernard@student.edu',
        phone: '+33 7 11 22 33 44',
        subscriptionType: 'student',
        status: 'active',
        startDate: '2024-01-20',
        endDate: '2024-07-20',
        amount: 120,
        paymentStatus: 'paid',
        documentsUploaded: ['id-card.pdf', 'student-id.pdf', 'enrollment-certificate.pdf'],
        skills: ['Electronics', 'PCB Design'],
        interests: ['Robotics', 'Automation'],
        submittedAt: '2024-01-18T09:45:00Z'
      },
      {
        id: 'sub-004',
        userId: 'user-004',
        userName: 'Pierre Lefebvre',
        email: 'pierre.lefebvre@email.com',
        phone: '+33 6 55 44 33 22',
        subscriptionType: 'quarterly',
        status: 'expired',
        startDate: '2023-10-01',
        endDate: '2024-01-01',
        amount: 150,
        paymentStatus: 'paid',
        documentsUploaded: ['id-card.pdf'],
        skills: ['3D Printing', 'CAD'],
        interests: ['Product Design', 'Mechanical Engineering'],
        submittedAt: '2023-09-28T16:20:00Z'
      }
    ];

    setTimeout(() => {
      setSubscriptions(mockSubscriptions);
      setFilteredSubscriptions(mockSubscriptions);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = subscriptions.filter(subscription => {
      const matchesSearch = subscription.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           subscription.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || subscription.status === statusFilter;
      const matchesType = typeFilter === 'all' || subscription.subscriptionType === typeFilter;
      const matchesPayment = paymentFilter === 'all' || subscription.paymentStatus === paymentFilter;
      
      return matchesSearch && matchesStatus && matchesType && matchesPayment;
    });

    setFilteredSubscriptions(filtered);
  }, [subscriptions, searchTerm, statusFilter, typeFilter, paymentFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'expired': return 'text-red-600 bg-red-100';
      case 'cancelled': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleStatusChange = (subscriptionId: string, newStatus: string) => {
    setSubscriptions(prev => prev.map(sub => 
      sub.id === subscriptionId ? { ...sub, status: newStatus as any } : sub
    ));
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Name', 'Email', 'Type', 'Status', 'Payment', 'Amount', 'Start Date', 'End Date'].join(','),
      ...filteredSubscriptions.map(sub => [
        sub.userName,
        sub.email,
        sub.subscriptionType,
        sub.status,
        sub.paymentStatus,
        sub.amount,
        sub.startDate,
        sub.endDate
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fablab-subscriptions.csv';
    a.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FabLab Subscriptions</h1>
          <p className="text-gray-600">Manage FabLab memberships and access control</p>
        </div>
        <button
          onClick={exportToCSV}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Subscriptions</p>
              <p className="text-2xl font-bold text-green-600">
                {subscriptions.filter(s => s.status === 'active').length}
              </p>
            </div>
            <Users className="h-8 w-8 text-green-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-sm border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Approval</p>
              <p className="text-2xl font-bold text-yellow-600">
                {subscriptions.filter(s => s.status === 'pending').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-sm border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-blue-600">
                €{subscriptions.filter(s => s.paymentStatus === 'paid').reduce((sum, s) => sum + s.amount, 0)}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-blue-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-sm border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Expiring Soon</p>
              <p className="text-2xl font-bold text-red-600">
                {subscriptions.filter(s => {
                  const endDate = new Date(s.endDate);
                  const now = new Date();
                  const diffTime = endDate.getTime() - now.getTime();
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  return diffDays <= 30 && diffDays > 0;
                }).length}
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="expired">Expired</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annual">Annual</option>
            <option value="student">Student</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Payments</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubscriptions.map((subscription) => (
                <motion.tr
                  key={subscription.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {subscription.userName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {subscription.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {subscription.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 capitalize">
                      {subscription.subscriptionType}
                    </div>
                    <div className="text-sm text-gray-500">
                      €{subscription.amount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(subscription.status)}`}>
                      {subscription.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(subscription.paymentStatus)}`}>
                      {subscription.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>Start: {new Date(subscription.startDate).toLocaleDateString()}</div>
                    <div>End: {new Date(subscription.endDate).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => {
                        setSelectedSubscription(subscription);
                        setShowModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    {subscription.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(subscription.id, 'active')}
                          className="text-green-600 hover:text-green-900"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleStatusChange(subscription.id, 'cancelled')}
                          className="text-red-600 hover:text-red-900"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subscription Detail Modal */}
      {showModal && selectedSubscription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Subscription Details</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Member Name</label>
                  <p className="text-sm text-gray-900">{selectedSubscription.userName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="text-sm text-gray-900">{selectedSubscription.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-sm text-gray-900">{selectedSubscription.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subscription Type</label>
                  <p className="text-sm text-gray-900 capitalize">{selectedSubscription.subscriptionType}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                <div className="flex flex-wrap gap-2">
                  {selectedSubscription.skills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
                <div className="flex flex-wrap gap-2">
                  {selectedSubscription.interests.map((interest, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Documents</label>
                <div className="space-y-2">
                  {selectedSubscription.documentsUploaded.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{doc}</span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default FabLabInscriptions;
