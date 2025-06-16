import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit, Trash2, Eye, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getBadgeColor } from '@/utils/adminUtils';

interface AdminTableColumn {
  key: string;
  label: string;
  type?: 'text' | 'badge' | 'date' | 'actions';
  badgeType?: 'status' | 'category' | 'level';
  render?: (value: any, item: any) => React.ReactNode;
}

interface AdminTableProps {
  columns: AdminTableColumn[];
  data: any[];
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  onView?: (item: any) => void;
  actions?: Array<{
    label: string;
    onClick: (item: any) => void;
    icon?: React.ComponentType<any>;
  }>;
  customActions?: Array<{
    label: string;
    onClick: (item: any) => void;
    icon?: React.ComponentType<any>;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  }>;
}

export const AdminTable: React.FC<AdminTableProps> = ({
  columns,
  data,
  onEdit,
  onDelete,
  onView,
  actions = [],
  customActions = [],
}) => {
  const renderCellContent = (column: AdminTableColumn, item: any) => {
    const value = item[column.key];

    if (column.render) {
      return column.render(value, item);
    }

    switch (column.type) {
      case 'badge':
        return (
          <Badge className={getBadgeColor(value, column.badgeType || 'status')}>
            {value}
          </Badge>
        );
      case 'date':
        return new Date(value).toLocaleDateString('fr-FR');
      case 'actions':
        return (
          <div className="flex items-center gap-2">
            {onView && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onView(item)}
              >
                <Eye className="h-4 w-4" />
              </Button>
            )}
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(item)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(item)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
            {customActions.length > 0 && customActions.map((action, index) => (
              <Button
                key={`custom-${index}`}
                variant={action.variant || "outline"}
                size="sm"
                onClick={() => action.onClick(item)}
              >
                {action.icon && <action.icon className="mr-1 h-4 w-4" />}
                {action.label}
              </Button>
            ))}
            {actions.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {actions.map((action, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => action.onClick(item)}
                    >
                      {action.icon && <action.icon className="mr-2 h-4 w-4" />}
                      {action.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        );
      default:
        return value;
    }
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <motion.tr
              key={item.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="hover:bg-muted/50"
            >
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {renderCellContent(column, item)}
                </TableCell>
              ))}
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
