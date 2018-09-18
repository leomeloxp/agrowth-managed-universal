import { DocumentNode } from 'graphql';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import CreateBuyersModal from '../../components/CreateBuyersModal';
import EditBuyersModal from '../../components/EditBuyersModal';
import Button from '../../components/elements/Button';
import Header from '../../components/Header';
import { IBuyer, LIST_BUYER } from '../../graphql/buyers';

export interface IManageBuyersPageState {
  buyer: unknown | IBuyer;
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

const ModelObjectListItemWrapper = styled.div`
  width: 100%;
`;
// I have included colours black and gray into the the colours.ts as simply as black and gray
// I wanted to make it easier when we need to change to a standard colour pallet.
const ModelObjectListItemTitle = styled.div`
  color: ${({ theme }) => theme.colours.black};
  width: 100%;
  padding: 0.3rem;
`;

const ModelObjectListItemDetails = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colours.gray};
  font-size: 0.85rem;
`;

export default class ManageBuyersPage extends Component<
  {},
  IManageBuyersPageState
> {
  public state = {
    buyer: {},
    renderCreateModal: false,
    renderEditModal: false
  };

  public handleEditButtonClick = (buyer: IBuyer) => {
    this.setState({ buyer, renderEditModal: true });
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
        <Header pageTitle='Manage Buyers' />
        {this.state.renderCreateModal && (
          <CreateBuyersModal close={this.closeModal} />
        )}
        {this.state.renderEditModal && (
          <EditBuyersModal
            close={this.closeModal}
            buyer={this.state.buyer as IBuyer}
          />
        )}
        <Query query={LIST_BUYER as DocumentNode}>
          {({ loading, error, data }) => {
            if (loading) {
              return <p data-testid='manage-buyers--loading'>Loading...</p>;
            }
            if (error) {
              return (
                <p data-testid='manage-buyers--error'>
                  <strong>Error occurred:</strong> {error.message}
                </p>
              );
            }

            if (data && data.buyersList) {
              const { buyersList } = data;
              return (
                <div>
                  <Button
                    data-testid='manage-buyers--button-add-new'
                    onClick={this.handleCreateButtonClick}
                  >
                    add new buyer
                  </Button>
                  <ModelObjectList>
                    {buyersList.map((buyer: IBuyer) => (
                      <ModelObjectListItem
                        key={buyer.id}
                        data-testid='manage-buyers--list-item'
                      >
                        <ModelObjectListItemWrapper>
                          <ModelObjectListItemTitle>
                            <strong>{buyer.name}</strong>
                          </ModelObjectListItemTitle>
                          <ModelObjectListItemDetails>
                            {buyer.phoneNumber}
                            {buyer.email ? ` | ${buyer.email}` : null}
                          </ModelObjectListItemDetails>
                        </ModelObjectListItemWrapper>
                        <Button
                          data-testid='manage-buyers--button-edit'
                          onClick={() => this.handleEditButtonClick(buyer)}
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
              <p data-testid='manage-buyers--impossible-case'>
                An unkown error has occurred. It has been reported.
              </p>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}
