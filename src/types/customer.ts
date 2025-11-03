/**
 * Address interface representing a customer's address
 */
export interface Address {
  id: string;
  type: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

/**
 * Phone interface representing a customer's phone number
 */
export interface Phone {
  id: string;
  type: string;
  number: string;
  isPrimary: boolean;
}

/**
 * Email interface representing a customer's email address
 */
export interface Email {
  id: string;
  type: string;
  address: string;
  isPrimary: boolean;
}

/**
 * Customer interface representing a customer with all associated data
 */
export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  maritalStatus: string;
  secureId: string;
  addresses: Address[];
  phones: Phone[];
  emails: Email[];
}
