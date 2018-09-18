import { DocumentNode } from 'graphql';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import CreateProduceModal from '../../components/CreateProduceModal';
import EditProduceModal from '../../components/EditProduceModal';
import Button from '../../components/elements/Button';
import Header from '../../components/Header';
import { IProduce, LIST_PRODUCE } from '../../graphql/produce';
export interface IManageProducePageState {
  produce: unknown | IProduce;
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
                        <span>
                          <strong>{produce.name}</strong>: {produce.unit}
                        </span>
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
      </React.Fragment>
    );
  }
}
