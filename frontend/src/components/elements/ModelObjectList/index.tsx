import styled from 'styled-components';

export const ModelObjectList = styled.ul`
  padding-left: 0;
  margin-left: 0;
  list-style: none;
`;

export const ModelObjectListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  &:nth-child(odd) {
    background-color: ${({ theme }) => `${theme.colours.grayLight}`};
  }
`;

export const ModelObjectListItemWrapper = styled.div`
  width: 100%;
`;

export const ModelObjectListItemTitle = styled.div`
  color: ${({ theme }) => theme.colours.black};
  width: 100%;
  padding: 0.3rem;
`;

export const ModelObjectListItemDetails = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colours.grayDark};
  font-size: 0.85rem;
`;
