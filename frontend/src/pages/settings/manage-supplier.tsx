import { DocumentNode } from 'graphql';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import CreateSupplierModal from '../../components/CreateSupplierModal';
import EditSupplierModal from '../../components/EditSupplierModal';
import Button from '../../components/elements/Button';
import Header from '../../components/Header';
import { ISupplier, LIST_SUPPLIER } from '../../graphql/supplier';

export interface IManageSupplierPageState {
  supplier: unknown | ISupplier;
  renderCreateModal: boolean;
  renderEditModal: boolean;
}

const ModelObjectList = styled.ul`
  padding-left: 0;
  margin-left: 0;
  list-style: none;
`;

const ModelObjectListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  &:nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

export default class ManageSupplierPage extends Component<
  {},
  IManageSupplierPageState
> {
  public state = {
    renderCreateModal: false,
    renderEditModal: false,
    supplier: {}
  };

  public handleEditButtonClick = (supplier: ISupplier) => {
    this.setState({ supplier, renderEditModal: true });
  };

  public handleCreateButtonClick = () => {
    this.setState({ renderCreateModal: true });
  };

  public closeModal = () => {
    this.setState({
      renderCreateModal: false,
      renderEditModal: false
    });
  };

  public render() {
    return (
      <React.Fragment>
        <Header pageTitle='Manage Supplier' />
        {this.state.renderCreateModal && (
          <CreateSupplierModal close={this.closeModal} />
        )}
        {this.state.renderEditModal && (
          <EditSupplierModal
            close={this.closeModal}
            supplier={this.state.supplier as ISupplier}
          />
        )}
        <Query query={LIST_SUPPLIER as DocumentNode}>
          {({ loading, error, data }) => {
            if (loading) {
              return <p data-testid='manage-supplier--loading'>Loading...</p>;
            }
            if (error) {
              return (
                <p data-testid='manage-supplier--error'>
                  <strong>Error occurred:</strong> {error.message}
                </p>
              );
            }

            if (data && data.supplierList) {
              const { supplierList } = data;
              return (
                <div>
                  <Button
                    data-testid='manage-supplier--button-add-new'
                    onClick={this.handleCreateButtonClick}
                  >
                    add new supplier
                  </Button>
                  <ModelObjectList>
                    {supplierList.map((supplier: ISupplier) => (
                      <ModelObjectListItem
                        key={supplier.id}
                        data-testid='manage-supplier--list-item'
                      >
                        <div>
                          <strong>{supplier.name}</strong>:
                          <p>
                            {supplier.phoneNumber}
                            {supplier.phoneNumber && supplier.email
                              ? ' | '
                              : null}
                            {supplier.email}
                          </p>
                        </div>
                        <Button
                          data-testid='manage-supplier--button-edit'
                          onClick={() => this.handleEditButtonClick(supplier)}
                        >
                          edit
                        </Button>
                      </ModelObjectListItem>
                    ))}
                  </ModelObjectList>
                </div>
              );
            }
            return (
              <p data-testid='manage-supplier--impossible-case'>
                An unkown error has occurred. It has been reported.
              </p>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}
