import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  Settings, 
  Users, 
  DollarSign, 
  Mail, 
  Shield, 
  Globe,
  Bell,
  Palette,
  Database,
  Key,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff
} from 'lucide-react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'moderator';
  status: 'active' | 'inactive';
  lastLogin: string;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  type: 'acceptance' | 'rejection' | 'notification' | 'reminder';
  content: string;
  variables: string[];
}

interface PricingConfig {
  university: {
    application_fee: number;
    tuition_semester: number;
    tuition_year: number;
  };
  fablab: {
    monthly: number;
    quarterly: number;
    annual: number;
    student_discount: number;
  };
  formations: {
    base_price: number;
    premium_multiplier: number;
  };
}

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'users' | 'pricing' | 'emails' | 'security'>('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState<EmailTemplate | null>(null);

  // State for different settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'CREC Education',
    siteDescription: 'Centre de Recherche et d\'Excellence Créative',
    contactEmail: 'contact@crec.edu',
    contactPhone: '+33 1 23 45 67 89',
    address: '123 Rue de l\'Éducation, 75001 Paris',
    timezone: 'Europe/Paris',
    language: 'fr',
    maintenanceMode: false,
    registrationEnabled: true
  });

  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [pricing, setPricing] = useState<PricingConfig>({
    university: {
      application_fee: 150,
      tuition_semester: 3500,
      tuition_year: 6500
    },
    fablab: {
      monthly: 50,
      quarterly: 140,
      annual: 500,
      student_discount: 20
    },
    formations: {
      base_price: 200,
      premium_multiplier: 1.5
    }
  });

  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);

  const [securitySettings, setSecuritySettings] = useState({
    passwordMinLength: 8,
    requireSpecialChars: true,
    requireNumbers: true,
    sessionTimeout: 24,
    maxLoginAttempts: 5,
    twoFactorRequired: false
  });

  // Mock data
  useEffect(() => {
    const mockUsers: AdminUser[] = [
      {
        id: 'user-001',
        name: 'Admin Principal',
        email: 'admin@crec.edu',
        role: 'super_admin',
        status: 'active',
        lastLogin: '2024-01-15T10:30:00Z'
      },
      {
        id: 'user-002',
        name: 'Marie Responsable',
        email: 'marie.responsable@crec.edu',
        role: 'admin',
        status: 'active',
        lastLogin: '2024-01-14T16:45:00Z'
      },
      {
        id: 'user-003',
        name: 'Jean Modérateur',
        email: 'jean.moderateur@crec.edu',
        role: 'moderator',
        status: 'active',
        lastLogin: '2024-01-13T09:20:00Z'
      }
    ];

    const mockEmailTemplates: EmailTemplate[] = [
      {
        id: 'email-001',
        name: 'Acceptation Université',
        subject: 'Félicitations - Admission confirmée',
        type: 'acceptance',
        content: 'Cher(e) {{studentName}},\n\nNous avons le plaisir de vous informer que votre candidature pour le programme {{programName}} a été acceptée.\n\nCordialement,\nL\'équipe CREC',
        variables: ['studentName', 'programName', 'startDate']
      },
      {
        id: 'email-002',
        name: 'Refus Université',
        subject: 'Candidature - Décision',
        type: 'rejection',
        content: 'Cher(e) {{studentName}},\n\nAprès examen attentif de votre dossier, nous regrettons de vous informer que nous ne pouvons donner suite favorable à votre candidature.\n\nCordialement,\nL\'équipe CREC',
        variables: ['studentName', 'programName']
      }
    ];

    setTimeout(() => {
      setAdminUsers(mockUsers);
      setEmailTemplates(mockEmailTemplates);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-800';
      case 'admin': return 'bg-blue-100 text-blue-800';
      case 'moderator': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
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
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage system configuration and preferences</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          <span>{saving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'general', label: 'General', icon: Settings },
              { id: 'users', label: 'Admin Users', icon: Users },
              { id: 'pricing', label: 'Pricing', icon: DollarSign },
              { id: 'emails', label: 'Email Templates', icon: Mail },
              { id: 'security', label: 'Security', icon: Shield }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* General Settings Tab */}
          {activeTab === 'general' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                  <input
                    type="text"
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, siteName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                  <input
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={generalSettings.contactPhone}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, contactPhone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select
                    value={generalSettings.timezone}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, timezone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Europe/Paris">Europe/Paris</option>
                    <option value="Europe/London">Europe/London</option>
                    <option value="America/New_York">America/New_York</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                <textarea
                  value={generalSettings.siteDescription}
                  onChange={(e) => setGeneralSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  value={generalSettings.address}
                  onChange={(e) => setGeneralSettings(prev => ({ ...prev, address: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="maintenance"
                    checked={generalSettings.maintenanceMode}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, maintenanceMode: e.target.checked }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="maintenance" className="ml-2 block text-sm text-gray-900">
                    Maintenance Mode
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="registration"
                    checked={generalSettings.registrationEnabled}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, registrationEnabled: e.target.checked }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="registration" className="ml-2 block text-sm text-gray-900">
                    Enable New Registrations
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* Admin Users Tab */}
          {activeTab === 'users' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Admin Users</h3>
                <button
                  onClick={() => {
                    setSelectedUser(null);
                    setShowUserModal(true);
                  }}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add User</span>
                </button>
              </div>

              <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Login
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {adminUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                            {user.role.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.lastLogin).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowUserModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Pricing Tab */}
          {activeTab === 'pricing' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* University Pricing */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">University Programs</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Application Fee (€)</label>
                    <input
                      type="number"
                      value={pricing.university.application_fee}
                      onChange={(e) => setPricing(prev => ({
                        ...prev,
                        university: { ...prev.university, application_fee: Number(e.target.value) }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Semester Tuition (€)</label>
                    <input
                      type="number"
                      value={pricing.university.tuition_semester}
                      onChange={(e) => setPricing(prev => ({
                        ...prev,
                        university: { ...prev.university, tuition_semester: Number(e.target.value) }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Annual Tuition (€)</label>
                    <input
                      type="number"
                      value={pricing.university.tuition_year}
                      onChange={(e) => setPricing(prev => ({
                        ...prev,
                        university: { ...prev.university, tuition_year: Number(e.target.value) }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* FabLab Pricing */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">FabLab Subscriptions</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Monthly (€)</label>
                    <input
                      type="number"
                      value={pricing.fablab.monthly}
                      onChange={(e) => setPricing(prev => ({
                        ...prev,
                        fablab: { ...prev.fablab, monthly: Number(e.target.value) }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quarterly (€)</label>
                    <input
                      type="number"
                      value={pricing.fablab.quarterly}
                      onChange={(e) => setPricing(prev => ({
                        ...prev,
                        fablab: { ...prev.fablab, quarterly: Number(e.target.value) }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Annual (€)</label>
                    <input
                      type="number"
                      value={pricing.fablab.annual}
                      onChange={(e) => setPricing(prev => ({
                        ...prev,
                        fablab: { ...prev.fablab, annual: Number(e.target.value) }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Student Discount (%)</label>
                    <input
                      type="number"
                      value={pricing.fablab.student_discount}
                      onChange={(e) => setPricing(prev => ({
                        ...prev,
                        fablab: { ...prev.fablab, student_discount: Number(e.target.value) }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Formations Pricing */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Open Formations</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Base Price (€)</label>
                    <input
                      type="number"
                      value={pricing.formations.base_price}
                      onChange={(e) => setPricing(prev => ({
                        ...prev,
                        formations: { ...prev.formations, base_price: Number(e.target.value) }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Premium Multiplier</label>
                    <input
                      type="number"
                      step="0.1"
                      value={pricing.formations.premium_multiplier}
                      onChange={(e) => setPricing(prev => ({
                        ...prev,
                        formations: { ...prev.formations, premium_multiplier: Number(e.target.value) }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Email Templates Tab */}
          {activeTab === 'emails' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Email Templates</h3>
                <button
                  onClick={() => {
                    setSelectedEmailTemplate(null);
                    setShowEmailModal(true);
                  }}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Template</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {emailTemplates.map((template) => (
                  <div key={template.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{template.name}</h4>
                        <p className="text-sm text-gray-500 capitalize">{template.type}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedEmailTemplate(template);
                            setShowEmailModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Subject: {template.subject}</p>
                      <p className="text-sm text-gray-600 line-clamp-3">{template.content}</p>
                      <div className="flex flex-wrap gap-1">
                        {template.variables.map((variable, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {`{{${variable}}}`}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Password Policy</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Length</label>
                    <input
                      type="number"
                      value={securitySettings.passwordMinLength}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, passwordMinLength: Number(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                    <input
                      type="number"
                      value={securitySettings.maxLoginAttempts}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, maxLoginAttempts: Number(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="special-chars"
                      checked={securitySettings.requireSpecialChars}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, requireSpecialChars: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="special-chars" className="ml-2 block text-sm text-gray-900">
                      Require Special Characters
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="numbers"
                      checked={securitySettings.requireNumbers}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, requireNumbers: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="numbers" className="ml-2 block text-sm text-gray-900">
                      Require Numbers
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="two-factor"
                      checked={securitySettings.twoFactorRequired}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, twoFactorRequired: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="two-factor" className="ml-2 block text-sm text-gray-900">
                      Require Two-Factor Authentication
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Session Settings</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (hours)</label>
                  <input
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
