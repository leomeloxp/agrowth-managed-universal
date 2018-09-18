import React from 'react';
import { injectGlobal, ThemeProvider } from 'styled-components';
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
  }

  body {
    font-family: 'Roboto', sans-serif;
    line-height: 2;
  }
`;

const Layout: React.SFC = ({ children }) => (
  <ThemeProvider
    theme={{
      colours,
      elevation,
      gradients
    }}
  >
    {children}
  </ThemeProvider>
);

export default Layout;
