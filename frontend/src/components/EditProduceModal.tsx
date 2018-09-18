import { DocumentNode } from 'graphql';
import React from 'react';
import { Mutation } from 'react-apollo';
import {
  IProduce,
  IProduceListQuery,
  LIST_PRODUCE,
  UPDATE_PRODUCE
} from '../graphql/produce';
import Button from './elements/Button';
import StyledInputBlock from './elements/StyledInputBlock';
import Modal from './Modal';

export interface ListProduceQueryData {
  produceList: IProduce[];
}

export interface IEditProduceModalProps {
  close: () => void;
  produce: IProduce;
}

export interface IEditProduceModalState {
  produce: { name: string; unit: string };
}

class EditProduceModal extends React.Component<
  IEditProduceModalProps,
  IEditProduceModalState
> {
  public state = {
    produce: { ...this.props.produce, id: undefined, __typename: undefined }
  };

  public handleInputChange = ({ target }: { target: HTMLInputElement }) => {
    this.setState(({ produce: prevProduceState }) => ({
      produce: {
        ...prevProduceState,
        [target.name]: target.value
      }
    }));
  };

  public render() {
    return (
      <Modal close={this.props.close}>
        <Mutation
          mutation={UPDATE_PRODUCE}
          update={(cache, { data: { updateProduce } }) => {
            const queryResults = cache.readQuery<IProduceListQuery>({
              query: LIST_PRODUCE as DocumentNode
            });
            if (queryResults && 'produceList' in queryResults) {
              const { produceList } = queryResults;
              produceList.map(
                produce =>
                  produce.id === updateProduce.id ? updateProduce : produce
              );
              cache.writeQuery({
                data: {
                  produceList
                },
                query: LIST_PRODUCE as DocumentNode
              });
            }
          }}
        >
          {(createProduce, { loading, error }) => {
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
                  createProduce({
                    variables: {
                      data: {
                        ...this.state.produce
                      },
                      id: this.props.produce.id
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
                    value={this.state.produce.name}
                  />
                </StyledInputBlock>
                <StyledInputBlock htmlFor='unit'>
                  <span>Unit</span>
                  <input
                    name='unit'
                    type='text'
                    required
                    onChange={this.handleInputChange}
                    value={this.state.produce.unit}
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

export default EditProduceModal;
