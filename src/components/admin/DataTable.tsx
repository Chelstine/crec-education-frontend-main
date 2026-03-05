import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  Edit,
  Trash2,
  Plus,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Filter,
  Loader2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { Card } from '../../components/ui/card';

export interface DataTableColumn<T> {
  key: keyof T | string;
  header: string;
  renderCell?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  keyField: keyof T;
  isLoading?: boolean;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onAdd?: () => void;
  title?: string;
  totalItems?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  renderActions?: (item: T) => React.ReactNode;
}

/**
 * Tableau de données réutilisable pour les interfaces CRUD
 */
function DataTable<T>({
  columns,
  data,
  keyField,
  isLoading = false,
  onEdit,
  onDelete,
  onAdd,
  title,
  totalItems = 0,
  currentPage = 1,
  pageSize = 10,
  onPageChange,
  searchPlaceholder = "Rechercher...",
  onSearch,
  renderActions,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Nombre total de pages
  const totalPages = Math.ceil((totalItems || data.length) / pageSize);
  
  // Gérer la recherche
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(searchQuery);
    }
  };
  
  // Gérer le tri
  const handleSort = (column: DataTableColumn<T>) => {
    if (!column.sortable) return;
    
    const columnKey = column.key as string;
    
    if (sortField === columnKey) {
      // Inverser la direction du tri si le champ est déjà sélectionné
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Nouveau champ de tri
      setSortField(columnKey);
      setSortDirection('asc');
    }
  };
  
  // Récupérer l'icône de tri pour un champ
  const getSortIcon = (column: DataTableColumn<T>) => {
    if (!column.sortable) return null;
    
    const columnKey = column.key as string;
    
    if (sortField === columnKey) {
      return sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
    }
    
    return <ArrowUpDown className="h-4 w-4" />;
  };
  
  return (
    <Card className="border">
      {/* En-tête du tableau */}
      <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border-b">
        {title && <h3 className="text-lg font-medium">{title}</h3>}
        
        <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
          {/* Champ de recherche */}
          {onSearch && (
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                type="text"
                placeholder={searchPlaceholder}
                className="pl-9 w-full md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
          )}
          
          {/* Bouton d'ajout */}
          {onAdd && (
            <Button onClick={onAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter
            </Button>
          )}
        </div>
      </div>
      
      {/* Conteneur du tableau avec scroll horizontal si nécessaire */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead 
                  key={index}
                  className={column.sortable ? 'cursor-pointer select-none' : ''}
                  onClick={() => column.sortable && handleSort(column)}
                >
                  <div className="flex items-center gap-1">
                    {column.header}
                    {column.sortable && getSortIcon(column)}
                  </div>
                </TableHead>
              ))}
              {/* Colonne pour les actions */}
              {(onEdit || onDelete || renderActions) && (
                <TableHead className="text-right">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Affichage pendant le chargement
              <TableRow>
                <TableCell colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center text-sm text-slate-500">
                    <Loader2 className="h-8 w-8 animate-spin text-slate-400 mb-2" />
                    <span>Chargement des données...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              // Aucune donnée à afficher
              <TableRow>
                <TableCell colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center text-sm text-slate-500">
                    <span>Aucun résultat trouvé</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              // Affichage normal des données
              data.map((item) => (
                <TableRow key={String(item[keyField])}>
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex}>
                      {column.renderCell ? column.renderCell(item) : String(item[column.key as keyof T] || '')}
                    </TableCell>
                  ))}
                  
                  {/* Cellule des actions */}
                  {(onEdit || onDelete || renderActions) && (
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {renderActions ? (
                          renderActions(item)
                        ) : (
                          <>
                            {onEdit && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onEdit(item)}
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Modifier</span>
                              </Button>
                            )}
                            {onDelete && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onDelete(item)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-100"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Supprimer</span>
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      {onPageChange && totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="text-sm text-slate-500">
            Affichage de {((currentPage - 1) * pageSize) + 1} à {Math.min(currentPage * pageSize, totalItems || data.length)} sur {totalItems || data.length} résultats
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1 || isLoading}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm px-3">
              Page {currentPage} sur {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isLoading}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages || isLoading}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}

export default DataTable;
