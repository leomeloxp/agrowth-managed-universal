import { DocumentNode } from 'graphql';
import React from 'react';
import { Mutation } from 'react-apollo';
import {
  IBuyer,
  IBuyerListQuery,
  LIST_BUYER,
  UPDATE_BUYER
} from '../graphql/buyer';
import Button from './elements/Button';
import StyledInputBlock from './elements/StyledInputBlock';
import Modal from './Modal';

export interface ListBuyerQueryData {
  buyerList: IBuyer[];
}

export interface IEditBuyersModalProps {
  close: () => void;
  buyer: IBuyer;
}

export interface IEditBuyersModalState {
  buyer: { name: string; phoneNumber: string; email: string };
}

class EditBuyersModal extends React.Component<
  IEditBuyersModalProps,
  IEditBuyersModalState
> {
  public state = {
    buyer: { ...this.props.buyer, id: undefined, __typename: undefined }
  };

  public handleInputChange = ({ target }: { target: HTMLInputElement }) => {
    this.setState(({ buyer: prevBuyersState }) => ({
      buyer: {
        ...prevBuyersState,
        [target.name]: target.value
      }
    }));
  };

  public render() {
    return (
      <Modal close={this.props.close}>
        <Mutation
          mutation={UPDATE_BUYER}
          update={(cache, { data: { updateBuyers } }) => {
            const queryResults = cache.readQuery<IBuyerListQuery>({
              query: LIST_BUYER as DocumentNode
            });
            if (queryResults && 'buyerList' in queryResults) {
              const { buyerList } = queryResults;
              buyerList.map(
                buyer => (buyer.id === updateBuyers.id ? updateBuyers : buyer)
              );
              cache.writeQuery({
                data: {
                  buyerList
                },
                query: LIST_BUYER as DocumentNode
              });
            }
          }}
        >
          {(createBuyer, { loading, error }) => {
            if (error) {
              return (
                <div>
                  <p>
                    <strong>An error ocurred</strong>
                  </p>
                  <p>${error.message}</p>
                </div>
              );
            }
            if (loading) {
              return (
                <p>
                  <strong>Loading.</strong>
                </p>
              );
            }

            return (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  createBuyer({
                    variables: {
                      data: {
                        ...this.state.buyer
                      },
                      id: this.props.buyer.id
                    }
                  });
                }}
              >
                <StyledInputBlock htmlFor="name">
                  <span>Name</span>
                  <input
                    name="name"
                    type="text"
                    required
                    onChange={this.handleInputChange}
                    value={this.state.buyer.name}
                  />
                </StyledInputBlock>
                <StyledInputBlock htmlFor="phoneNumber">
                  <span>Phone</span>
                  <input
                    name="phoneNumber"
                    type="text"
                    required
                    onChange={this.handleInputChange}
                    value={this.state.buyer.phoneNumber}
                  />
                </StyledInputBlock>
                <StyledInputBlock htmlFor="email">
                  <span>Email</span>
                  <input
                    name="email"
                    type="text"
                    required
                    onChange={this.handleInputChange}
                    value={this.state.buyer.email}
                  />
                </StyledInputBlock>
                <Button primary type="submit">
                  Save
                </Button>
              </form>
            );
          }}
        </Mutation>
      </Modal>
    );
  }
}

export default EditBuyersModal;
