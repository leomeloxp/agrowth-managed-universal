import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import { ILocation } from './location';

export interface IBuyer {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  phoneNumber: string;
  email: string;
  comments: string;
  locations: [ILocation];
}

export interface IBuyerListQuery extends DocumentNode {
  buyerList: IBuyer[];
}

export const ADD_BUYER = gql`
  mutation ADD_BUYER($data: BuyerUpdateInput!) {
    createBuyer(data: $data) {
      id
      name
      phoneNumber
      email
      locations {
        name
        address
        notes
        latitude
        longitude
      }
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
      locations {
        name
        address
        notes
        latitude
        longitude
      }
    }
  }
`;

export const LIST_BUYER: IBuyerListQuery = gql`
  query LIST_BUYER {
    buyerList {
      id
      name
      phoneNumber
      email
      locations {
        name
        address
        notes
        latitude
        longitude
      }
    }
  }
`;
