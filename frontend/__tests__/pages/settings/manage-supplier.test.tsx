import { DocumentNode } from 'graphql';
import React from 'react';
// tslint:disable-next-line:no-submodule-imports
import { MockedProvider, MockedResponse } from 'react-apollo/test-utils';
// tslint:disable-next-line:no-implicit-dependencies
import { cleanup, render, waitForElement } from 'react-testing-library';
import { LIST_SUPPLIER } from '../../../src/graphql/supplier';
// tslint:disable-next-line:import-name
import ManageSupplierPage from '../../../src/pages/settings/manage-supplier';
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

describe('<ManageSupplierPage/>', async () => {
  test('should render with loading then error', async () => {
    const mocks: MockedResponse = {
      error: new Error('Mock error'),
      request: { query: LIST_SUPPLIER as DocumentNode }
    };
    const { getByTestId } = render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <ManageSupplierPage />
      </MockedProvider>
    );
    expect(getByTestId('manage-supplier--loading')).toBeTruthy();
    await waitForElement(() => getByTestId('manage-supplier--error'));
    expect(getByTestId('manage-supplier--error').textContent).toBe(
      'Error occurred: Network error: Mock error'
    );
  });

  test('should render with loading then 2 list items', async () => {
    const mocks: MockedResponse = {
      request: { query: LIST_SUPPLIER as DocumentNode },
      result: {
        data: {
          supplierList: [
            {
              email: 'mock email',
              id: 'mock id',
              name: 'mock name',
              phoneNumber: 'mock unit'
            },
            {
              email: 'mock email2',
              id: 'mock id2',
              name: 'mock name2',
              phoneNumber: 'mock phoneNumber2'
            }
          ]
        }
      }
    };
    const { getAllByTestId, getByTestId } = render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <ManageSupplierPage />
      </MockedProvider>
    );
    expect(getByTestId('manage-supplier--loading')).toBeTruthy();
    await waitForElement(() => getByTestId('manage-supplier--list-item'));
    expect(getAllByTestId('manage-supplier--list-item').length).toEqual(2);
  });

  test('should not raise errors', async () => {
    // tslint:disable-next-line:no-console
    expect(console.error).not.toBeCalled();
  });
});
