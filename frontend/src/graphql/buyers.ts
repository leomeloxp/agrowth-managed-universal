import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export interface IBuyer {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  phoneNumber: string;
  email: string;
  comments: string;
}

export interface IBuyerListQuery extends DocumentNode {
  buyersList: IBuyer[];
}

export const ADD_BUYER = gql`
  mutation ADD_BUYER($data: BuyerUpdateInput!) {
    createBuyer(data: $data) {
      id
      name
      phoneNumber
      email
    }
  }
`;

export const UPDATE_BUYER = gql`
  mutation UPDATE_BUYER($id: ID!, $data: BuyerUpdateInput!) {
    updateBuyer(id: $id, data: $data) {
      id
      name
      phoneNumber
      email
    }
  }
`;

export const LIST_BUYER: IBuyerListQuery = gql`
  query LIST_BUYER {
    buyersList {
      id
      name
      phoneNumber
      email
    }
  }
`;
