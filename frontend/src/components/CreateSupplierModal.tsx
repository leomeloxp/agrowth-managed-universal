import { DocumentNode } from 'graphql';
import React from 'react';
import { Mutation } from 'react-apollo';
import {
  ADD_SUPPLIER,
  ISupplier,
  ISupplierListQuery,
  LIST_SUPPLIER
} from '../graphql/supplier';
import Button from './elements/Button';
import StyledInputBlock from './elements/StyledInputBlock';
import Modal from './Modal';

export interface ListSupplierQueryData {
  supplierList: ISupplier[];
}

export interface IEditSupplierModalProps {
  close: () => void;
}

export interface IEditSupplierModalState {
  supplier: { name: string; phoneNumber: string; email: string };
}

class EditSupplierModal extends React.Component<
  IEditSupplierModalProps,
  IEditSupplierModalState
> {
  public state = {
    supplier: { name: '', phoneNumber: '', email: '', locations: '' }
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
          mutation={ADD_SUPPLIER}
          update={(cache, { data: { createSupplier } }) => {
            const queryResults = cache.readQuery<ISupplierListQuery>({
              query: LIST_SUPPLIER as DocumentNode
            });
            if (queryResults && 'supplierList' in queryResults) {
              const { supplierList } = queryResults;
              cache.writeQuery({
                data: {
                  supplierList: supplierList.concat([createSupplier])
                },
                query: LIST_SUPPLIER as DocumentNode
              });
            }
          }}
        >
          {(createSupplier, { data, loading, error }) => {
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
                  createSupplier({ variables: { data: this.state.supplier } });
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
                <StyledInputBlock htmlFor='locations'>
                  <span>Location</span>
                  <input
                    name='location'
                    type='text'
                    required
                    onChange={this.handleInputChange}
                    value={this.state.supplier.locations}
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
