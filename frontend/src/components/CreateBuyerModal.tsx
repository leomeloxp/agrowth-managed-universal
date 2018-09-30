import { DocumentNode } from 'graphql';
import React from 'react';
import { Mutation } from 'react-apollo';
import {
  ADD_BUYER,
  IBuyer,
  IBuyerListQuery,
  LIST_BUYER
} from '../graphql/buyer';
import Button from './elements/Button';
import StyledInputBlock from './elements/StyledInputBlock';
import Modal from './Modal';

export interface ListBuyersQueryData {
  buyerList: IBuyer[];
}

export interface IEditBuyersModalProps {
  close: () => void;
}

export interface IEditBuyersModalState {
  buyer: { name: string; phoneNumber: string; email: string };
}

class EditBuyersModal extends React.Component<
  IEditBuyersModalProps,
  IEditBuyersModalState
> {
  public state = {
    buyer: { name: '', phoneNumber: '', email: '', locations: ''}
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
          mutation={ADD_BUYER}
          update={(cache, { data: { createBuyer } }) => {
            const queryResults = cache.readQuery<IBuyerListQuery>({
              query: LIST_BUYER as DocumentNode
            });
            if (queryResults && 'buyerList' in queryResults) {
              const { buyerList } = queryResults;
              cache.writeQuery({
                data: {
                  buyerList: buyerList.concat([createBuyer])
                },
                query: LIST_BUYER as DocumentNode
              });
            }
          }}
        >
          {(createBuyer, { data, loading, error }) => {
            // tslint:disable-next-line:no-console
            console.log({ data, loading, error });
            if (error) {
              return (
                <p>
                  <strong>An error ocurred: ${error}</strong>
                </p>
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
                  createBuyer({ variables: { data: this.state.buyer } });
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
                <StyledInputBlock htmlFor='locations'>
                  <span>Location</span>
                  <input
                    name='location'
                    type='text'
                    required
                    onChange={this.handleInputChange}
                    value={this.state.buyer.locations}
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
