import styled from 'styled-components';

const StyledInputBlock = styled.label`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 1rem 0;
  input {
    margin-top: 0.5rem;
    padding: 1rem 0.5rem;
    width: 100%;
  }
  label {
    align-self: flex-start;
  }
`;

export default StyledInputBlock;
