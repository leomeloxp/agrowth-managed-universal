import React from 'react';
import ReactDOM from 'react-dom';

export interface IPortalComponentProps {
  selector: string;
}
/**
 * Portal is a wrapper component that will allow us to make use of
 * [React Portals](https://reactjs.org/docs/portals.html) which in summary allows
 * us to render React components into a different DOM node (in our case to allow
 * us to create modals).
 *
 * It takes a `selector` string and renders the `children` of the component
 * into the HTMLElement found by querying the DOM for the selector string passed.
 *
 * @prop {string} selector  A string to be used by `document.querySelector`
 * @extends {React.Component<IPortalComponentProps>}
 */
export default class Portal extends React.Component<IPortalComponentProps> {
  public state: {
    element?: HTMLElement;
  } = {
    element: undefined
  };
  public componentDidMount() {
    this.setState({
      element: document.querySelector(this.props.selector)
    });
  }

  public render() {
    return this.state.element
      ? ReactDOM.createPortal(this.props.children, this.state.element)
      : null;
  }
}
