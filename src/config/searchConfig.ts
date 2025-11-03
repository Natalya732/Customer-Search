import { Customer } from "@/types/customer";

/**
 * UI types for form fields
 */
export type UIType = "text" | "date" | "select" | "email" | "tel";

/**
 * Search field configuration
 */
export interface SearchFieldConfig {
  key: keyof Customer | string;
  uiType: UIType;
  label: string;
  placeholder?: string;
  renderOrder: number;
  options?: { value: string; label: string }[]; // For select fields
}

/**
 * Search form field configurations
 * Defines the search form structure with field types, labels, and order
 */
export const searchConfig: SearchFieldConfig[] = [
  {
    key: "firstName",
    uiType: "text",
    label: "First Name",
    placeholder: "Enter first name",
    renderOrder: 1,
  },
  {
    key: "lastName",
    uiType: "text",
    label: "Last Name",
    placeholder: "Enter last name",
    renderOrder: 2,
  },
  {
    key: "secureId",
    uiType: "text",
    label: "Secure ID",
    placeholder: "Enter secure ID (e.g., SEC-001)",
    renderOrder: 3,
  },
  {
    key: "dateOfBirth",
    uiType: "date",
    label: "Date of Birth",
    placeholder: "Select date of birth",
    renderOrder: 4,
  },
  {
    key: "maritalStatus",
    uiType: "select",
    label: "Marital Status",
    placeholder: "Select marital status",
    renderOrder: 5,
    options: [
      { value: "Single", label: "Single" },
      { value: "Married", label: "Married" },
      { value: "Divorced", label: "Divorced" },
      { value: "Widowed", label: "Widowed" },
    ],
  },
  {
    key: "city",
    uiType: "text",
    label: "City",
    placeholder: "Enter city",
    renderOrder: 6,
  },
  {
    key: "state",
    uiType: "text",
    label: "State",
    placeholder: "Enter state (e.g., NY, CA)",
    renderOrder: 7,
  },
  {
    key: "phone",
    uiType: "tel",
    label: "Phone Number",
    placeholder: "Enter phone number",
    renderOrder: 8,
  },
  {
    key: "email",
    uiType: "email",
    label: "Email Address",
    placeholder: "Enter email address",
    renderOrder: 9,
  },
];

/**
 * Get search config sorted by renderOrder
 */
export const getSortedSearchConfig = (): SearchFieldConfig[] => {
  return [...searchConfig].sort((a, b) => a.renderOrder - b.renderOrder);
};
