import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export interface IProduce {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  unit: string;
  comments: string;
}

export interface IProduceListQuery extends DocumentNode {
  produceList: IProduce[];
}

export const ADD_PRODUCE = gql`
  mutation ADD_PRODUCE($data: ProduceUpdateInput!) {
    createProduce(data: $data) {
      id
      name
      unit
    }
  }
`;

export const UPDATE_PRODUCE = gql`
  mutation UPDATE_PRODUCE($id: ID!, $data: ProduceUpdateInput!) {
    updateProduce(id: $id, data: $data) {
      id
      name
      unit
    }
  }
`;

export const LIST_PRODUCE: IProduceListQuery = gql`
  query LIST_PRODUCE {
    produceList {
      id
      name
      unit
    }
  }
`;
