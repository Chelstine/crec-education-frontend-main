import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  FileText, 
  Image as ImageIcon,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  ExternalLink
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'doc';
  url: string;
  size: number;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
}

interface DocumentViewerProps {
  document: Document;
  onClose: () => void;
  onStatusChange: (documentId: string, status: 'approved' | 'rejected', notes?: string) => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ document, onClose, onStatusChange }) => {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [notes, setNotes] = useState(document.notes || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="h-6 w-6 text-red-600" />;
      case 'image': return <ImageIcon className="h-6 w-6 text-blue-600" />;
      default: return <FileText className="h-6 w-6 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleApprove = () => {
    onStatusChange(document.id, 'approved', notes);
  };

  const handleReject = () => {
    onStatusChange(document.id, 'rejected', notes);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg max-w-6xl w-full h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            {getFileIcon(document.type)}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{document.name}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{formatFileSize(document.size)}</span>
                <span>Uploaded: {new Date(document.uploadedAt).toLocaleDateString()}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                  {document.status}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {document.type === 'image' && (
              <>
                <button
                  onClick={handleZoomOut}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                  disabled={zoom <= 50}
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <span className="text-sm text-gray-600 min-w-[4rem] text-center">{zoom}%</span>
                <button
                  onClick={handleZoomIn}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                  disabled={zoom >= 200}
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                <button
                  onClick={handleRotate}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                >
                  <RotateCw className="h-4 w-4" />
                </button>
              </>
            )}
            <a
              href={document.url}
              download
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
            >
              <Download className="h-4 w-4" />
            </a>
            <a
              href={document.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex">
          {/* Document Display */}
          <div className="flex-1 bg-gray-100 flex items-center justify-center p-4">
            {loading ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="text-gray-600">Loading document...</p>
              </div>
            ) : (
              <div className="bg-white shadow-lg rounded">
                {document.type === 'pdf' ? (
                  <div className="p-8 text-center">
                    <FileText className="h-16 w-16 text-red-600 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">PDF Viewer</p>
                    <p className="text-sm text-gray-500 mb-4">{document.name}</p>
                    <a
                      href={document.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Open in New Tab</span>
                    </a>
                  </div>
                ) : document.type === 'image' ? (
                  <img
                    src="/api/placeholder/600/800"
                    alt={document.name}
                    style={{
                      transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                      transition: 'transform 0.3s ease'
                    }}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="p-8 text-center">
                    <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Document Viewer</p>
                    <p className="text-sm text-gray-500 mb-4">{document.name}</p>
                    <a
                      href={document.url}
                      className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Panel */}
          <div className="w-80 border-l border-gray-200 bg-white flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h4 className="font-semibold text-gray-900">Document Review</h4>
            </div>
            
            <div className="flex-1 p-4 space-y-4">
              {/* Current Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Status</label>
                <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${getStatusColor(document.status)}`}>
                  {document.status === 'approved' && <CheckCircle className="h-4 w-4 mr-1" />}
                  {document.status === 'rejected' && <XCircle className="h-4 w-4 mr-1" />}
                  {document.status === 'pending' && <AlertTriangle className="h-4 w-4 mr-1" />}
                  {document.status}
                </div>
              </div>

              {/* Review Notes */}
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                  Review Notes
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add notes about this document..."
                />
              </div>

              {/* Quick Validation Checklist */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Validation Checklist</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <span className="ml-2 text-sm text-gray-700">Document is legible</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <span className="ml-2 text-sm text-gray-700">Information is complete</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <span className="ml-2 text-sm text-gray-700">Document is valid/recent</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <span className="ml-2 text-sm text-gray-700">Matches application info</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {document.status === 'pending' && (
              <div className="p-4 border-t border-gray-200 space-y-2">
                <button
                  onClick={handleApprove}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Approve Document</span>
                </button>
                <button
                  onClick={handleReject}
                  className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  <XCircle className="h-4 w-4" />
                  <span>Reject Document</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DocumentViewer;
