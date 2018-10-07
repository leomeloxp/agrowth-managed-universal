import { ArrowBack, Menu } from '@material-ui/icons';
import Link, { LinkState } from 'next/link';
// tslint:disable-next-line:import-name
import Router, { DefaultQuery, withRouter, WithRouterProps } from 'next/router';
// tslint:disable-next-line:import-name
import NProgress from 'nprogress';
import React from 'react';
import styled from 'styled-components';

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

export interface IHeaderProps extends LinkState {
  pageTitle: string;
}

const StyledHeader = styled.header`
  align-items: center;
  background-color: ${({ theme }) => theme.colours.primaryDark};
  color: ${({ theme }) => theme.colours.white};
  display: grid;
  grid-template-areas: "back title icons";
  grid-template-columns: minmax(0, min-content) 1fr min-content;
  margin-bottom: 25px;
  outline-color: ${({ theme }) => theme.colours.white};
  padding: 0 1rem;
`;

const Title = styled.a`
  grid-area: title;
  color: inherit;
  text-decoration: none;
`;

const HeaderIcons = styled.ul`
  grid-area: icons;
  align-content: center;
  list-style: none;
  padding-left: 0;
  margin-left: 0;
  li {
    a {
      color: ${({ theme }) => theme.colours.white};
    }
  }
`;

const StyledH1 = styled.h1`
  font-size: 1.5rem;
  font-weight: normal;
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colours.white};
`;

const Header: React.SFC<
  IHeaderProps & WithRouterProps<DefaultQuery & LinkState>
> = ({ router: { pathname }, pageTitle, href }) => {
  let length: number = 0;
  if (typeof window !== 'undefined') {
    length = window.history.length;
  }
  return (
    <StyledHeader>
      {length > 0 && pathname !== '/' ? (
        <BackButton
          onClick={window.history.back.bind(window.history)}
          title='Go to previous page'
        >
          <ArrowBack />
        </BackButton>
      ) : null}
      <Link prefetch passHref href={pathname}>
        <Title href={href as string}>
          <StyledH1>{pageTitle}</StyledH1>
        </Title>
      </Link>
      <HeaderIcons>
        <li>
          <Link prefetch href='/settings'>
            <a title='Settings page'>
              <Menu />
            </a>
          </Link>
        </li>
      </HeaderIcons>
    </StyledHeader>
  );
};
const HeaderWithRouter = withRouter(Header);

export default HeaderWithRouter;
