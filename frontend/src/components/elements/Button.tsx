import styled, { css } from 'styled-components';

export interface IButtonProps {
  alert?: boolean;
  primary?: boolean;
}

const Button = styled.button<IButtonProps>`
  align-items: center;
  background-color: ${({ theme }) => theme.colours.gray};
  border: none;
  color: ${({ theme }) => theme.colours.black};
  display: inline-flex;
  font-size: 0.875rem;
  font-weight: normal;
  height: 3rem;
  justify-content: center;
  line-height: 2.25rem;
  min-width: 64px;
  text-transform: uppercase;
  ${({ primary, theme }) =>
    primary &&
    css`
      background-color: ${theme.colours.primaryDark};
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
