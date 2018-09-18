import { DocumentNode } from 'graphql';
import React from 'react';
import { Mutation } from 'react-apollo';
import {
  ADD_PRODUCE,
  IProduce,
  IProduceListQuery,
  LIST_PRODUCE
} from '../graphql/produce';
import Button from './elements/Button';
import StyledInputBlock from './elements/StyledInputBlock';
import Modal from './Modal';

export interface ListProduceQueryData {
  produceList: IProduce[];
}

export interface IEditProduceModalProps {
  close: () => void;
}

export interface IEditProduceModalState {
  produce: { name: string; unit: string };
}

class EditProduceModal extends React.Component<
  IEditProduceModalProps,
  IEditProduceModalState
> {
  public state = {
    produce: { name: '', unit: '' }
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
          mutation={ADD_PRODUCE}
          update={(cache, { data: { createProduce } }) => {
            const queryResults = cache.readQuery<IProduceListQuery>({
              query: LIST_PRODUCE as DocumentNode
            });
            if (queryResults && 'produceList' in queryResults) {
              const { produceList } = queryResults;
              cache.writeQuery({
                data: {
                  produceList: produceList.concat([createProduce])
                },
                query: LIST_PRODUCE as DocumentNode
              });
            }
          }}
        >
          {(createProduce, { data, loading, error }) => {
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
                  createProduce({ variables: { data: this.state.produce } });
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
