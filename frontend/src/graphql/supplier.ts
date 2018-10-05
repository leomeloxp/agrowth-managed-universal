import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import { ILocation } from './location';

export interface ISupplier {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  phoneNumber: string;
  email: string;
  comments: string;
  locations: [ILocation];
}

export interface ISupplierListQuery extends DocumentNode {
  supplierList: ISupplier[];
}

export const ADD_SUPPLIER = gql`
  mutation ADD_SUPPLIER($data: SupplierUpdateInput!) {
    createSupplier(data: $data) {
      id
      name
      phoneNumber
      email
      locations {
        name
        address
        notes
        coordinates
      }
    }
  }
`;

export const UPDATE_SUPPLIER = gql`
  mutation UPDATE_SUPPLIER($id: ID!, $data: SupplierUpdateInput!) {
    updateSupplier(id: $id, data: $data) {
      id
      name
      phoneNumber
      email
      locations {
        name
        address
        notes
        coordinates
      }
    }
  }
`;

export const LIST_SUPPLIER: ISupplierListQuery = gql`
  query LIST_SUPPLIER {
    supplierList {
      id
      name
      phoneNumber
      email
      locations {
        name
        address
        notes
        coordinates
      }
    }
  }
`;
