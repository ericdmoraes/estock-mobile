import styled from 'styled-components/native';

import { colors } from '../../styles/index';
import LinearGradient from 'react-native-linear-gradient';

export const CardBackground = styled.TouchableOpacity`
  width: 95%;
  height: 350px;
  align-self: center;
  background-color: ${colors.shadow};
  margin-bottom: 15px;
  border-width: 0.5px;
  border-color: silver;
  border-radius: 5px;
`;

export const TextContainer = styled.View`
  flex-direction: column;
  margin-left: 10px;
  width: 50%;
  flex-grow: 1;
`;

export const ItemContainer = styled.View`
  flex-direction: column;
  justify-content: space-between;
`;

export const QtdContainer = styled.View`
  flex-direction: row;
  height: auto;
`;

export const SmallText = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;

export const Label = styled.Text`
  font-size: 16px;
  font-weight: 100;
  margin-left: 5px;
`;

export const LabelContainer = styled.View`
  flex-direction: row;
`;

export const Img = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
`;

export const Imgcontainer = styled.View`
  width: 100%;
  height: 45%;
  border-radius: 5px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
`;

export const Container = styled.View`
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  padding: 5px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-radius: 5px;
  background-color: ${colors.shadow};
`;

export const SellingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
  justify-content: space-around;
`;

export const SellingContainerView = styled.View``;

export const ItemNameView = styled.View`
  flex-direction: row;
`;

export const SellButton = styled.Text`
  font-weight: bold;
  font-size: 15px;
`;

export const CustomButton = styled.TouchableOpacity`
  border: 0.3px;
  margin: 3px;
  flex-grow: 1;
  background-color: white;
  border-radius: 5px;
  max-height: 100%;
  align-items: center;
  padding: 5px;
`;

export const EmptyListContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.secondary};
`;

export const Hr = styled.View`
  width: 100%;
  height: 1px;
  background-color: silver;
`;

export const ModalContainer = styled.View`
  background-color: ${colors.shadow};
  border-radius: 20px;
  height: 100%;
  width: 100%;
  padding: 35px;
  align-items: center;
`;

export const ModalView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;
