import React from 'react';
import { Printer, Zap, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FablabMachine } from '@/types';
import MachineCard from './MachineCard';

interface MachineSelectionProps {
  machines: FablabMachine[];
  selectedCategory: string;
  selectedMachine: string;
  hourlyRates: { machineId: string; hourlyRate: number }[];
  onCategoryChange: (category: string) => void;
  onMachineSelect: (machineId: string) => void;
}

const MachineSelection: React.FC<MachineSelectionProps> = ({
  machines,
  selectedCategory,
  selectedMachine,
  hourlyRates,
  onCategoryChange,
  onMachineSelect
}) => {
  const getMachineHourlyRate = (machineId: string): number => {
    const rate = hourlyRates.find(r => r.machineId === machineId);
    return rate?.hourlyRate || 0;
  };

  const filteredMachines = selectedCategory === 'all' 
    ? machines 
    : machines.filter(machine => machine.category === selectedCategory);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>Sélection d'équipement</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange('all')}
          >
            Toutes
          </Button>
          <Button
            variant={selectedCategory === 'impression' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange('impression')}
            className="flex items-center space-x-1"
          >
            <Printer className="h-4 w-4" />
            <span>Impression 3D</span>
          </Button>
          <Button
            variant={selectedCategory === 'gravure' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange('gravure')}
            className="flex items-center space-x-1"
          >
            <Zap className="h-4 w-4" />
            <span>Gravure</span>
          </Button>
          <Button
            variant={selectedCategory === 'decoupe' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange('decoupe')}
          >
            Découpe
          </Button>
          <Button
            variant={selectedCategory === 'electronique' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange('electronique')}
          >
            Électronique
          </Button>
        </div>

        {/* Machine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMachines.map(machine => (
            <MachineCard
              key={machine.id}
              machine={machine}
              isSelected={selectedMachine === machine.id}
              hourlyRate={getMachineHourlyRate(machine.id)}
              onSelect={onMachineSelect}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MachineSelection;
