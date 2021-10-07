import styled from 'styled-components/native';

import { colors } from '../../styles/index';

export const Container = styled.View``;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 22px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export const SmallText = styled.Text`
  font-size: 10px;
  font-weight: 100;
`;

export const ItemsContainer = styled.View`
  align-items: center;
  padding: 10px;
`;

export const Button = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: ${colors.main};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

export const CategoryList = styled.FlatList`
  border-top-width: 0.5px;
  border-bottom-width: 0.5px;
  border-top-color: silver;
  border-bottom-color: silver;
  background-color: ${colors.shadow};
`;

export const EmptyListView = styled.View`
  width: 100%;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.shadow};
`;

export const Label = styled.Text`
  font-size: 16px;
`;
