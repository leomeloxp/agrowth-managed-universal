import React from 'react';
import { css, injectGlobal, ThemeProvider } from 'styled-components';
import { colours, gradients } from '../utils/colours';
import { elevation } from '../utils/elevation';

// tslint:disable-next-line:no-unused-expression
injectGlobal`
  html {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
    outline-color: inherit;
  }

  body {
    font-family: 'Roboto', sans-serif;
    color: ${colours.black};
    outline-color: ${colours.primary}
    line-height: 2;
  }
`;

const Layout: React.SFC = ({ children }) => (
  <ThemeProvider
    theme={{
      colours,
      elevation,
      gradients,
      transition: (property = 'all', duration = 0.4) => css`
        will-change: ${property};
        transition: ${property} ${duration}s;
      `
    }}
  >
    {children}
  </ThemeProvider>
);

export default Layout;
