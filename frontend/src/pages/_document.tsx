import Document, {
  Head,
  Main,
  NextDocumentContext,
  NextScript
} from 'next/document';
import 'normalize.css';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  public static getInitialProps({ renderPage }: NextDocumentContext) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  public render() {
    /**
     * @todo make the lang atribute dynamic based on the chosen language
     */
    return (
      <html lang='en-GB'>
        <Head>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
          <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
          <title>My page</title>
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:400,700'
          />
          <link rel='stylesheet' href='/_next/static/style.css' />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          {/* 
            The div below will be used to render Portals, see the Portal
            component for detailed documentation 
          */}
          <div className='react-portal-holder' />
          <NextScript />
        </body>
      </html>
    );
  }
}
