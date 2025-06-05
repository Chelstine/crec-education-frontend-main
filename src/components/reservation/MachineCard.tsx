import React from 'react';
import { motion } from 'framer-motion';
import { Printer, Zap, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { FablabMachine } from '@/types';

interface MachineCardProps {
  machine: FablabMachine;
  isSelected: boolean;
  hourlyRate: number;
  onSelect: (machineId: string) => void;
}

const MachineCard: React.FC<MachineCardProps> = ({
  machine,
  isSelected,
  hourlyRate,
  onSelect
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'impression': return <Printer className="h-4 w-4" />;
      case 'gravure': return <Zap className="h-4 w-4" />;
      case 'decoupe': return <Settings className="h-4 w-4" />;
      case 'electronique': return <Settings className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'occupied': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Débutant';
      case 'intermediate': return 'Intermédiaire';
      case 'advanced': return 'Avancé';
      default: return difficulty;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'maintenance': return 'Maintenance';
      case 'occupied': return 'Occupé';
      default: return status;
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-md'
          : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
      } ${machine.status !== 'available' ? 'opacity-60' : ''}`}
      onClick={() => machine.status === 'available' && onSelect(machine.id)}
    >
      {/* Status Badge */}
      <div className="absolute top-2 right-2">
        <Badge className={getStatusColor(machine.status)}>
          {getStatusLabel(machine.status)}
        </Badge>
      </div>

      <div className="flex items-start space-x-3">
        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
          {getCategoryIcon(machine.category)}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{machine.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{machine.description}</p>
          <div className="flex items-center space-x-2 mb-2">
            <Badge className={getDifficultyColor(machine.skillLevel)}>
              {getDifficultyLabel(machine.skillLevel)}
            </Badge>
            <span className="text-blue-600 font-semibold">
              {hourlyRate} FCFA/h
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {machine.features.slice(0, 2).map((feature, idx) => (
              <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MachineCard;
