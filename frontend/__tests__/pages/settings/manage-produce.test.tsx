import { DocumentNode } from 'graphql';
import React from 'react';
// tslint:disable-next-line:no-submodule-imports
import { MockedProvider, MockedResponse } from 'react-apollo/test-utils';
// tslint:disable-next-line:no-implicit-dependencies
import { cleanup, render, waitForElement } from 'react-testing-library';
import { LIST_PRODUCE } from '../../../src/graphql/produce';
// tslint:disable-next-line:import-name
import ManageProducePage from '../../../src/pages/settings/manage-produce';
// tslint:disable-next-line:no-console
console.error = jest.fn();

jest.mock('next/router', () => ({
  withRouter: jest.fn(() => () => (
    <h1 data-testid='withRouter'>Mocked withRouter</h1>
  ))
}));

afterEach(() => {
  cleanup();
});

describe('<ManageProducePage/>', async () => {
  test('should render with loading then error', async () => {
    const mocks: MockedResponse = {
      error: new Error('Mock error'),
      request: { query: LIST_PRODUCE as DocumentNode }
    };
    const { getByTestId } = render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <ManageProducePage />
      </MockedProvider>
    );
    expect(getByTestId('manage-produce--loading')).toBeTruthy();
    await waitForElement(() => getByTestId('manage-produce--error'));
    expect(getByTestId('manage-produce--error').textContent).toBe(
      'Error occurred: Network error: Mock error'
    );
  });

  test('should render with loading then 2 list items', async () => {
    const mocks: MockedResponse = {
      request: { query: LIST_PRODUCE as DocumentNode },
      result: {
        data: {
          produceList: [
            {
              id: 'mock id',
              name: 'mock name',
              unit: 'mock unit'
            },
            {
              id: 'mock id2',
              name: 'mock name2',
              unit: 'mock unit2'
            }
          ]
        }
      }
    };
    const { getAllByTestId, getByTestId } = render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <ManageProducePage />
      </MockedProvider>
    );
    expect(getByTestId('manage-produce--loading')).toBeTruthy();
    await waitForElement(() => getByTestId('manage-produce--list-item'));
    expect(getAllByTestId('manage-produce--list-item').length).toEqual(2);
  });

  test('should not raise errors', async () => {
    // tslint:disable-next-line:no-console
    expect(console.error).not.toBeCalled();
  });
});
