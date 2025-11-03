import React, { useState } from "react";
import { Customer } from "@/types/customer";
import DynamicForm from "./DynamicForm";
import CustomerTable from "./CustomerTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * SearchPage component that handles customer search and display
 */
export const SearchPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Filter customers based on search criteria
   */
  const filterCustomers = (
    allCustomers: Customer[],
    searchCriteria: Record<string, string>
  ): Customer[] => {
    // Helper to check if a value is meaningful (not empty or just whitespace)
    const hasValue = (value: string | undefined): boolean => {
      return value !== undefined && typeof value === 'string' && value.trim().length > 0;
    };

    // Helper to trim and normalize search value
    const normalizeValue = (value: string | undefined): string => {
      if (!value || typeof value !== 'string') {
        return '';
      }
      return value.trim();
    };

    // Check if there are any search criteria at all
    const hasAnySearchCriteria = Object.values(searchCriteria).some(value => 
      value !== undefined && typeof value === 'string' && value.trim().length > 0
    );

    // If no search criteria provided, return all customers
    if (!hasAnySearchCriteria) {
      return allCustomers;
    }

    return allCustomers.filter((customer) => {
      // Check firstName
      if (hasValue(searchCriteria.firstName)) {
        const searchVal = normalizeValue(searchCriteria.firstName).toLowerCase();
        if (!customer.firstName.toLowerCase().includes(searchVal)) {
          return false;
        }
      }

      // Check lastName
      if (hasValue(searchCriteria.lastName)) {
        const searchVal = normalizeValue(searchCriteria.lastName).toLowerCase();
        if (!customer.lastName.toLowerCase().includes(searchVal)) {
          return false;
        }
      }

      // Check secureId
      if (hasValue(searchCriteria.secureId)) {
        const searchVal = normalizeValue(searchCriteria.secureId).toLowerCase();
        if (!customer.secureId.toLowerCase().includes(searchVal)) {
          return false;
        }
      }

      // Check dateOfBirth
      if (hasValue(searchCriteria.dateOfBirth)) {
        const searchDate = normalizeValue(searchCriteria.dateOfBirth);
        // Handle date format - remove time component if present
        const customerDate = customer.dateOfBirth.split("T")[0];
        if (customerDate !== searchDate) {
          return false;
        }
      }

      // Check maritalStatus
      if (hasValue(searchCriteria.maritalStatus)) {
        if (customer.maritalStatus !== searchCriteria.maritalStatus.trim()) {
          return false;
        }
      }

      // Check city (in addresses)
      if (hasValue(searchCriteria.city)) {
        const searchVal = normalizeValue(searchCriteria.city).toLowerCase();
        const hasMatchingCity = customer.addresses.some((addr) =>
          addr.city.toLowerCase().includes(searchVal)
        );
        if (!hasMatchingCity) {
          return false;
        }
      }

      // Check state (in addresses)
      if (hasValue(searchCriteria.state)) {
        const searchVal = normalizeValue(searchCriteria.state).toLowerCase();
        const hasMatchingState = customer.addresses.some((addr) =>
          addr.state.toLowerCase().includes(searchVal)
        );
        if (!hasMatchingState) {
          return false;
        }
      }

      // Check phone (in phones)
      if (hasValue(searchCriteria.phone)) {
        const searchVal = normalizeValue(searchCriteria.phone);
        const hasMatchingPhone = customer.phones.some((phone) =>
          phone.number.includes(searchVal)
        );
        if (!hasMatchingPhone) {
          return false;
        }
      }

      // Check email (in emails)
      if (hasValue(searchCriteria.email)) {
        const searchVal = normalizeValue(searchCriteria.email).toLowerCase();
        const hasMatchingEmail = customer.emails.some((email) =>
          email.address.toLowerCase().includes(searchVal)
        );
        if (!hasMatchingEmail) {
          return false;
        }
      }

      return true;
    });
  };

  /**
   * Handle form submission and fetch customers
   */
  const handleSearch = async (formData: Record<string, string>) => {
    setLoading(true);
    setError(null);

    
    try {  
      const response = await fetch("http://localhost:3001/customers");


      if (!response.ok) {
        throw new Error(`Failed to fetch customers: ${response.statusText}`);
      }

      const data = await response.json();
      const allCustomers: Customer[] = data || [];
    
      const filteredCustomers = filterCustomers(allCustomers, formData);
      
      setCustomers(filteredCustomers);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      setCustomers([]);
      console.error("Error fetching customers:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Customer Search
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Search for customers using any combination of fields below
          </p>
        </div>

        {/* Search Form Card */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle>Search Criteria</CardTitle>
            <CardDescription>
              Fill in any fields to filter customers. Leave fields empty to see all results.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DynamicForm onSearch={handleSearch} />
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading && (
          <Card className="mb-6 sm:mb-8">
            <CardContent className="flex items-center justify-center py-12 sm:py-16">
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-4 text-sm text-muted-foreground sm:text-base">
                  Loading customers...
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error State */}
        {error && !loading && (
          <Card className="mb-6 sm:mb-8 border-destructive">
            <CardContent className="pt-6">
              <div className="rounded-lg border border-destructive bg-destructive/10 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <span className="font-semibold text-destructive">Error:</span>
                  <span className="text-destructive">{error}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Please check if the API server is running at http://localhost:3001
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {!loading && !error && (
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle>Search Results</CardTitle>
                <span className="text-sm font-medium text-muted-foreground sm:text-base">
                  {customers.length} {customers.length === 1 ? "customer" : "customers"} found
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-0 md:p-6">
              <CustomerTable customers={customers} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
