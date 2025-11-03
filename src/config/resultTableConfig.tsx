import React from "react";
import { Customer } from "@/types/customer";

/**
 * Table column configuration
 */
export interface TableColumnConfig {
  key: string;
  label: string;
  render: (customer: Customer) => React.ReactNode;
}

/**
 * Result table column configurations
 * Defines how customer data is displayed in the results table
 */
export const resultTableConfig: TableColumnConfig[] = [
  {
    key: "secureId",
    label: "Secure ID",
    render: (customer: Customer) => (
      <span className="font-mono text-sm">{customer.secureId}</span>
    ),
  },
  {
    key: "name",
    label: "Name",
    render: (customer: Customer) => (
      <span className="font-medium">
        {customer.firstName} {customer.lastName}
      </span>
    ),
  },
  {
    key: "dateOfBirth",
    label: "Date of Birth",
    render: (customer: Customer) => {
      const date = new Date(customer.dateOfBirth);
      return (
        <span>
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      );
    },
  },
  {
    key: "maritalStatus",
    label: "Marital Status",
    render: (customer: Customer) => (
      <span className="capitalize">{customer.maritalStatus}</span>
    ),
  },
  {
    key: "primaryPhone",
    label: "Primary Phone",
    render: (customer: Customer) => {
      const primaryPhone = customer.phones.find((phone) => phone.isPrimary);
      return primaryPhone ? (
        <div>
          <div className="font-medium">{primaryPhone.number}</div>
          <div className="text-xs text-muted-foreground">{primaryPhone.type}</div>
        </div>
      ) : (
        <span className="text-muted-foreground">N/A</span>
      );
    },
  },
  {
    key: "primaryEmail",
    label: "Primary Email",
    render: (customer: Customer) => {
      const primaryEmail = customer.emails.find((email) => email.isPrimary);
      return primaryEmail ? (
        <div>
          <div className="font-medium">{primaryEmail.address}</div>
          <div className="text-xs text-muted-foreground">{primaryEmail.type}</div>
        </div>
      ) : (
        <span className="text-muted-foreground">N/A</span>
      );
    },
  },
  {
    key: "primaryAddress",
    label: "Primary Address",
    render: (customer: Customer) => {
      const primaryAddress = customer.addresses.find(
        (addr) => addr.type === "Home"
      ) || customer.addresses[0];
      return primaryAddress ? (
        <div>
          <div className="font-medium">{primaryAddress.street}</div>
          <div className="text-xs text-muted-foreground">
            {primaryAddress.city}, {primaryAddress.state} {primaryAddress.zipCode}
          </div>
        </div>
      ) : (
        <span className="text-muted-foreground">N/A</span>
      );
    },
  },
  {
    key: "contactCount",
    label: "Contact Info",
    render: (customer: Customer) => (
      <div className="text-sm">
        <div>{customer.phones.length} phone(s)</div>
        <div>{customer.emails.length} email(s)</div>
        <div>{customer.addresses.length} address(es)</div>
      </div>
    ),
  },
];

/**
 * Get table columns sorted by their definition order
 */
export const getTableColumns = (): TableColumnConfig[] => {
  return resultTableConfig;
};
