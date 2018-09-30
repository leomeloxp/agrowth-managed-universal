import { DocumentNode } from 'graphql';
// import gql from 'graphql-tag';

// Copied from BE
export interface ILocation {
  created: Date | number;
  updated: Date | number;
  id: string;
  name: string;
  address: string;
  notes: string;
  latitude: string;
  longitude: string;
}

export interface ILocationListQuery extends DocumentNode {
  supplierList: ILocation[];
}


// export const ADD_SUPPLIER = gql`
//   mutation ADD_SUPPLIER($data: SupplierUpdateInput!) {
//     createSupplier(data: $data) {
//       id
//       name
//       phoneNumber
//       email
//     }
//   }
// `;

// export const UPDATE_SUPPLIER = gql`
//   mutation UPDATE_SUPPLIER($id: ID!, $data: SupplierUpdateInput!) {
//     updateSupplier(id: $id, data: $data) {
//       id
//       name
//       phoneNumber
//       email
//     }
//   }
// `;

// export const LIST_SUPPLIER: ISupplierListQuery = gql`
//   query LIST_SUPPLIER {
//     supplierList {
//       id
//       name
//       phoneNumber
//       email
//     }
//   }
// `;
