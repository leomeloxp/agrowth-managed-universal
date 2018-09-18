import { withRouter } from 'next/router';
import React from 'react';
// tslint:disable-next-line:no-implicit-dependencies
import { render } from 'react-testing-library';
// tslint:disable-next-line:import-name
import HomePage from '../../src/pages/index';

// tslint:disable-next-line:no-console
console.error = jest.fn();

jest.mock('next/router', () => ({
  withRouter: jest.fn(() => () => (
    <h1 data-testid='withRouter'>Mocked withRouter</h1>
  ))
}));

describe('<HomePage/>', () => {
  test('should render', () => {
    const { queryByText, queryByTestId } = render(<HomePage />);
    expect(queryByText('Hello world')).toBeTruthy();
    expect(queryByTestId('withRouter')).toBeTruthy();
  });

  test('should call withRouter', () => {
    expect(withRouter).toHaveBeenCalledTimes(1);
  });

  test('should not raise errors', () => {
    // tslint:disable-next-line:no-console
    expect(console.error).not.toBeCalled();
  });

  test('should match snapshot', () => {
    const { container } = render(<HomePage />);
    expect(container).toMatchSnapshot();
  });
});
