import Link from 'next/link';
import React, { Component } from 'react';
import Header from '../../components/Header';
export default class SetttingsPage extends Component {
  public render() {
    return (
      <React.Fragment>
        <Header pageTitle='Settings' />
        <main>
          <ul>
            <li>
              <Link href='/settings/manage-produce'>
                <a data-testid='link-to-manage-produce'>Manage Produce</a>
              </Link>
            </li>
            <li>
              <Link href='/settings/manage-buyer'>
                <a data-testid='link-to-manage-buyer'>Manage Buyers</a>
              </Link>
            </li>
            <li>
              <Link href='/settings/manage-supplier'>
                <a data-testid='link-to-manage-supplier'>Manage Suppliers</a>
              </Link>
            </li>
          </ul>
        </main>
      </React.Fragment>
    );
  }
}
