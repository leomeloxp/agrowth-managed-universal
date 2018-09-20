import { DocumentNode } from 'graphql';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import CreateSupplierModal from '../../components/CreateSupplierModal';
import EditSupplierModal from '../../components/EditSupplierModal';
import Button from '../../components/elements/Button';
import Header from '../../components/Header';
import { ISupplier, LIST_SUPPLIER } from '../../graphql/supplier';
import {
  ModelObjectList,
  ModelObjectListItem,
  ModelObjectListItemWrapper,
  ModelObjectListItemTitle,
  ModelObjectListItemDetails
} from '../../components/elements/ModelObjectList';

export interface IManageSupplierPageState {
  supplier: unknown | ISupplier;
  renderCreateModal: boolean;
  renderEditModal: boolean;
}

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
        <Header pageTitle="Manage Supplier" />
        <main>
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
                return <p data-testid="manage-supplier--loading">Loading...</p>;
              }
              if (error) {
                return (
                  <p data-testid="manage-supplier--error">
                    <strong>Error occurred:</strong> {error.message}
                  </p>
                );
              }

              if (data && data.supplierList) {
                const { supplierList } = data;
                return (
                  <div>
                    <Button
                      data-testid="manage-supplier--button-add-new"
                      onClick={this.handleCreateButtonClick}
                    >
                      add new supplier
                    </Button>
                    <ModelObjectList>
                      {supplierList.map((supplier: ISupplier) => (
                        <ModelObjectListItem
                          key={supplier.id}
                          data-testid="manage-supplier--list-item"
                        >
                          <ModelObjectListItemWrapper>
                            <ModelObjectListItemTitle>
                              <strong>{supplier.name}</strong>
                            </ModelObjectListItemTitle>
                            <ModelObjectListItemDetails>
                              {supplier.phoneNumber}
                              {supplier.phoneNumber && supplier.email
                                ? ' | '
                                : null}
                              {supplier.email}
                            </ModelObjectListItemDetails>
                          </ModelObjectListItemWrapper>
                          <Button
                            data-testid="manage-suppliers--button-edit"
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
                <p data-testid="manage-supplier--impossible-case">
                  An unkown error has occurred. It has been reported.
                </p>
              );
            }}
          </Query>
        </main>
      </React.Fragment>
    );
  }
}
