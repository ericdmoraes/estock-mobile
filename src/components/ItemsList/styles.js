import styled from 'styled-components/native';

import {colors} from '../../styles/index';

export const Container = styled.TouchableOpacity`
  width: 95%;
  align-self: center;
  background-color: ${colors.shadow};
  margin-bottom: 15px;
  padding: 8px;
  border-width: 0.5px;
  border-color: silver;
  border-radius: 5px;
  flex-direction: row;
`;

export const TextContainer = styled.View`
  flex-direction: column;
  margin-left: 10px;
  /* justify-content: space-around; */
  width: 50%;
  flex-grow: 1;
  /* background-color: blue; */
`;

export const ItemContainer = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

export const Img = styled.Image`
  width: 75px;
  height: 75px;
  border-radius: 75px;
`;

export const Label = styled.Text`
  font-weight: bold;
  font-size: 15px;
`;

export const Imgcontainer = styled.View`
  justify-content: center;
  align-items: center;
  /* background-color: green; */
`;

export const SellingContainer = styled.View`
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex-grow: 1;
  /* background-color: deepskyblue; */
`;

export const SellButton = styled.Text`
  /* text-align: right; */
  font-weight: 100;
  font-size: 15px;
`;

export const CustomButton = styled.TouchableOpacity`
  border: 0.3px;
  color: silver;
  border-radius: 5px;
  width: 80%;
  /* align-self: flex-end; */
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

export const EmptyListContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.secondary};
`;
