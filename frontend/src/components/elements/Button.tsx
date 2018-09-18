import styled, { css } from 'styled-components';

export interface IButtonProps {
  alert?: boolean;
  primary?: boolean;
}

const Button = styled.button<IButtonProps>`
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 64px;
  height: 3rem;
  border: none;
  outline: none;
  font-size: 0.875rem;
  line-height: 2.25rem;
  font-weight: normal;
  text-decoration: none;
  text-transform: uppercase;
  ${({ primary, theme }) =>
    primary &&
    css`
      background-color: ${theme.colours.primary};
      color: ${theme.colours.white};
    `};
  ${({ alert, theme }) =>
    alert &&
    css`
      background: ${theme.colours.alert};
      color: ${theme.colours.white};
    `};
`;

export default Button;
