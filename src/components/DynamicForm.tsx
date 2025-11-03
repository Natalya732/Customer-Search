import React, { useState, FormEvent } from "react";
import { SearchFieldConfig, getSortedSearchConfig } from "@/config/searchConfig";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

/**
 * Props for DynamicForm component
 */
export interface DynamicFormProps {
  /** Configuration array defining form fields */
  config?: SearchFieldConfig[];
  /** Callback function called on form submit with form data */
  onSearch: (formData: Record<string, string>) => void;
  /** Optional className for styling */
  className?: string;
}

/**
 * DynamicForm component that renders form fields based on configuration
 * Supports text, date, email, tel, and select input types
 */
export const DynamicForm: React.FC<DynamicFormProps> = ({
  config,
  onSearch,
  className,
}) => {
  // Use provided config or default to sorted search config
  const fields = config || getSortedSearchConfig();

  // Initialize form state with empty values for all fields
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    fields.forEach((field) => {
      initial[field.key] = "";
    });
    return initial;
  });

  /**
   * Handle input change
   */
  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Call onSearch with current form data
    onSearch(formData);
  };

  /**
   * Handle form reset
   */
  const handleReset = () => {
    const reset: Record<string, string> = {};
    fields.forEach((field) => {
      reset[field.key] = "";
    });
    setFormData(reset);
    // Optionally trigger search with empty data
    onSearch(reset);
  };

  /**
   * Render form field based on UI type
   */
  const renderField = (field: SearchFieldConfig) => {
    const fieldValue = formData[field.key] || "";

    switch (field.uiType) {
      case "select":
        return (
          <Select
            id={field.key}
            value={fieldValue}
            onChange={(e) => handleChange(field.key, e.target.value)}
          >
            <option value="">{field.placeholder || `Select ${field.label}`}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        );

      case "date":
        return (
          <Input
            id={field.key}
            type="date"
            value={fieldValue}
            onChange={(e) => handleChange(field.key, e.target.value)}
            placeholder={field.placeholder}
          />
        );

      case "email":
        return (
          <Input
            id={field.key}
            type="email"
            value={fieldValue}
            onChange={(e) => handleChange(field.key, e.target.value)}
            placeholder={field.placeholder}
          />
        );

      case "tel":
        return (
          <Input
            id={field.key}
            type="tel"
            value={fieldValue}
            onChange={(e) => handleChange(field.key, e.target.value)}
            placeholder={field.placeholder}
          />
        );

      case "text":
      default:
        return (
          <Input
            id={field.key}
            type="text"
            value={fieldValue}
            onChange={(e) => handleChange(field.key, e.target.value)}
            placeholder={field.placeholder}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fields.map((field) => (
          <div key={field.key} className="space-y-2">
            <Label htmlFor={field.key} className="text-sm font-medium">
              {field.label}
            </Label>
            {renderField(field)}
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Button type="submit" className="w-full sm:w-auto">
          Search
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleReset}
          className="w-full sm:w-auto"
        >
          Reset
        </Button>
      </div>
    </form>
  );
};

export default DynamicForm;
