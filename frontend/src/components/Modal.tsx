import React from 'react';
import styled from 'styled-components';
import Portal from './Portal';

const StyledOverlay = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`;

const ModalBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: -1;
`;

const StyledModal = styled.div`
  background-color: white;
  border-radius: 2px;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 25px 1fr;
  max-width: 30rem;
  width: calc(100% - 2rem);
  ${({ theme }) => theme.elevation(23)};
  .content {
    grid-row: 2 / -1;
    grid-column: 1 / -1;
  }
`;

const CloseButton = styled.button`
  align-self: start;
  justify-self: end;
  background: none;
  appearance: none;
  border: none;
  font-size: 2rem;
  grid-row: 1 / 2;
  grid-column: 1 / 2;
`;

/**
 * Renders the `children` of this component into a styled modal pop-up.
 * @requires Portal
 * @extends {React.Component}
 */
export default class Modal extends React.Component<{ close: () => void }> {
  public render() {
    return (
      <Portal selector='.react-portal-holder'>
        <StyledOverlay>
          <StyledModal>
            <CloseButton onClick={this.props.close} aria-label='close modal'>
              &times;
            </CloseButton>
            <div className='content'>{this.props.children}</div>
          </StyledModal>
          <ModalBackground onClick={this.props.close} />
        </StyledOverlay>
      </Portal>
    );
  }
}
