import React from "react";
import { Customer } from "@/types/customer";
import { getTableColumns } from "@/config/resultTableConfig";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/**
 * Props for CustomerTable component
 */
export interface CustomerTableProps {
  /** Array of customers to display */
  customers: Customer[];
  /** Optional className for styling */
  className?: string;
}

/**
 * CustomerTable component that displays customer data in a table format
 * Uses resultTableConfig to dynamically render columns
 */
export const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  className,
}) => {
  const columns = getTableColumns();

  if (customers.length === 0) {
    return (
      <div className={`p-8 text-center sm:p-12 ${className}`}>
        <p className="text-sm text-muted-foreground sm:text-base">
          No customers found. Try adjusting your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className="whitespace-nowrap"
                >
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                {columns.map((column) => (
                  <TableCell key={column.key} className="whitespace-nowrap">
                    {column.render(customer)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4 px-4 sm:px-6">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="rounded-lg border bg-card p-4 shadow-sm space-y-3"
          >
            {columns.map((column) => (
              <div key={column.key} className="flex flex-col gap-1 border-b last:border-0 pb-2 last:pb-0">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {column.label}
                </span>
                <span className="text-sm break-words">
                  {column.render(customer)}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerTable;
