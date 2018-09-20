import styled from 'styled-components';

const StyledInputBlock = styled.label`
  background-color: ${({ theme }) => theme.colours.grayLight};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 1rem 0;
  input {
    background-color: ${({ theme }) => theme.colours.grayLight};
    border: none;
    border-bottom: 4px solid ${({ theme }) => theme.colours.gray};
    margin-top: 0.5rem;
    padding: 1rem 0.5rem;
    width: 100%;
    ${({ theme }) => theme.transition('border-bottom')};
    &:focus {
      border-bottom: 4px solid ${({ theme }) => theme.colours.primary};
      outline: none;
    }
  }
  span {
    align-self: flex-start;
    font-size: 0.8rem;
    line-height: 0.8;
    padding: 8px 0 0 8px;
  }
`;

export default StyledInputBlock;
