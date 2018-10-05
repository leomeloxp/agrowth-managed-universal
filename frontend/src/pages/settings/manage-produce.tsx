import { DocumentNode } from 'graphql';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import CreateProduceModal from '../../components/CreateProduceModal';
import EditProduceModal from '../../components/EditProduceModal';
import Button from '../../components/elements/Button';
import {
  ModelObjectList,
  ModelObjectListItem,
  ModelObjectListItemDetails,
  ModelObjectListItemTitle,
  ModelObjectListItemWrapper
} from '../../components/elements/ModelObjectList';
import Header from '../../components/Header';
import { IProduce, LIST_PRODUCE } from '../../graphql/produce';
export interface IManageProducePageState {
  produce: unknown | IProduce;
  renderCreateModal: boolean;
  renderEditModal: boolean;
}

export default class ManageProducePage extends Component<
  {},
  IManageProducePageState
> {
  public state = {
    produce: {},
    renderCreateModal: false,
    renderEditModal: false
  };

  public handleCreateButtonClick = () => {
    this.setState({ renderCreateModal: true });
  };

  public handleEditButtonClick = (produce: IProduce) => {
    this.setState({ produce, renderEditModal: true });
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
        <Header pageTitle='Manage Produce' />
        <main>
          {this.state.renderCreateModal && (
            <CreateProduceModal close={this.closeModal} />
          )}
          {this.state.renderEditModal && this.state.produce ? (
            <EditProduceModal
              close={this.closeModal}
              produce={this.state.produce as IProduce}
            />
          ) : null}
          <Query query={LIST_PRODUCE as DocumentNode}>
            {({ loading, error, data }) => {
              if (loading) {
                return <p data-testid='manage-produce--loading'>Loading...</p>;
              }
              if (error) {
                return (
                  <p data-testid='manage-produce--error'>
                    <strong>Error occurred:</strong> {error.message}
                  </p>
                );
              }

              if (data && data.produceList) {
                const { produceList } = data;
                return (
                  <div>
                    <Button
                      data-testid='manage-produce--button-add-new'
                      onClick={this.handleCreateButtonClick}
                    >
                      add new produce
                    </Button>
                    <ModelObjectList>
                      {produceList.map((produce: IProduce) => (
                        <ModelObjectListItem
                          key={produce.id}
                          data-testid='manage-produce--list-item'
                        >
                          <ModelObjectListItemWrapper>
                            <ModelObjectListItemTitle>
                              <strong>{produce.name}</strong>
                            </ModelObjectListItemTitle>
                            <ModelObjectListItemDetails>
                              Unit: {produce.unit}
                            </ModelObjectListItemDetails>
                          </ModelObjectListItemWrapper>
                          <Button
                            data-testid='manage-produce--button-edit'
                            onClick={() => this.handleEditButtonClick(produce)}
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
                <p data-testid='manage-produce--impossible-case'>
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
