import styled from 'styled-components/native';

import { colors } from '../../styles/index';

export const Title = styled.Text`
  font-weight: bold;
  font-size: 22px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const Container = styled.View`
  padding: 10px;
  height: 100%;
  flex: 1;
`;

export const ItemsDataContainer = styled.View``;

export const DataLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
