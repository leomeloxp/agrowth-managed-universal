import React from 'react';
// tslint:disable-next-line:no-implicit-dependencies
import { render } from 'react-testing-library';
// tslint:disable-next-line:import-name
import SettingsPage from '../../../src/pages/settings/index';

// tslint:disable-next-line:no-console
console.error = jest.fn();

jest.mock('next/router', () => ({
  withRouter: jest.fn(() => () => (
    <h1 data-testid='withRouter'>Mocked withRouter</h1>
  ))
}));

describe('<SettingsPage/>', () => {
  test('should render', () => {
    const { queryByTestId } = render(<SettingsPage />);
    expect(queryByTestId('link-to-manage-produce')).toBeTruthy();
  });

  test('should not raise errors', () => {
    // tslint:disable-next-line:no-console
    expect(console.error).not.toBeCalled();
  });

  test('should match snapshot', () => {
    const { container } = render(<SettingsPage />);
    expect(container).toMatchSnapshot();
  });
});
