import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterConfig {
  key: string;
  label: string;
  options: FilterOption[];
  placeholder?: string;
}

interface AdminFiltersProps {
  filters: FilterConfig[];
  activeFilters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
}

export const AdminFilters: React.FC<AdminFiltersProps> = ({
  filters,
  activeFilters,
  onFilterChange,
  onClearFilters,
}) => {
  const hasActiveFilters = Object.values(activeFilters).some(value => value !== '' && value !== 'all');

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((filter) => (
        <Select
          key={filter.key}
          value={activeFilters[filter.key] || 'all'}
          onValueChange={(value) => onFilterChange(filter.key, value === 'all' ? '' : value)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder={filter.placeholder || filter.label} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            {filter.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
      
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="h-9 px-2"
        >
          <X className="h-4 w-4" />
          Effacer
        </Button>
      )}
    </div>
  );
};
