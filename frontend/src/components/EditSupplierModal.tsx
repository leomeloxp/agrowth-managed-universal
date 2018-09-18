import { DocumentNode } from 'graphql';
import React from 'react';
import { Mutation } from 'react-apollo';
import {
  ISupplier,
  ISupplierListQuery,
  LIST_SUPPLIER,
  UPDATE_SUPPLIER
} from '../graphql/supplier';
import Button from './elements/Button';
import StyledInputBlock from './elements/StyledInputBlock';
import Modal from './Modal';

export interface ListSupplierQueryData {
  supplierList: ISupplier[];
}

export interface IEditSupplierModalProps {
  close: () => void;
  supplier: ISupplier;
}

export interface IEditSupplierModalState {
  supplier: { name: string; phoneNumber: string; email: string };
}

class EditSupplierModal extends React.Component<
  IEditSupplierModalProps,
  IEditSupplierModalState
> {
  public state = {
    supplier: { ...this.props.supplier, id: undefined, __typename: undefined }
  };

  public handleInputChange = ({ target }: { target: HTMLInputElement }) => {
    this.setState(({ supplier: prevSupplierState }) => ({
      supplier: {
        ...prevSupplierState,
        [target.name]: target.value
      }
    }));
  };

  public render() {
    return (
      <Modal close={this.props.close}>
        <Mutation
          mutation={UPDATE_SUPPLIER}
          update={(cache, { data: { updateSupplier } }) => {
            const queryResults = cache.readQuery<ISupplierListQuery>({
              query: LIST_SUPPLIER as DocumentNode
            });
            if (queryResults && 'supplierList' in queryResults) {
              const { supplierList } = queryResults;
              supplierList.map(
                supplier =>
                  supplier.id === updateSupplier.id ? updateSupplier : supplier
              );
              cache.writeQuery({
                data: {
                  supplierList
                },
                query: LIST_SUPPLIER as DocumentNode
              });
            }
          }}
        >
          {(createSupplier, { loading, error }) => {
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
                  createSupplier({
                    variables: {
                      data: {
                        ...this.state.supplier
                      },
                      id: this.props.supplier.id
                    }
                  });
                }}
              >
                <StyledInputBlock htmlFor='name'>
                  <span>Name</span>
                  <input
                    name='name'
                    type='text'
                    required
                    onChange={this.handleInputChange}
                    value={this.state.supplier.name}
                  />
                </StyledInputBlock>
                <StyledInputBlock htmlFor='email'>
                  <span>Email</span>
                  <input
                    name='email'
                    type='text'
                    required
                    onChange={this.handleInputChange}
                    value={this.state.supplier.email}
                  />
                </StyledInputBlock>
                <StyledInputBlock htmlFor='phoneNumber'>
                  <span>Phone</span>
                  <input
                    name='phoneNumber'
                    type='text'
                    required
                    onChange={this.handleInputChange}
                    value={this.state.supplier.phoneNumber}
                  />
                </StyledInputBlock>
                <Button primary type='submit'>
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

export default EditSupplierModal;
