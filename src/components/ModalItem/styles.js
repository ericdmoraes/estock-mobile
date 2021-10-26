import styled from 'styled-components';
import { colors } from '../../styles';

export const ModalView = styled.Modal`
`;

export const ModalContainer = styled.View`
  background-color: ${colors.secondary};
  height: 100%;
  width: 100%;
  padding: 12px;
  align-items: center;
`;

export const CloseButtonContainer = styled.TouchableOpacity`
`;

export const Head = styled.View`
  width: 100%;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PriceItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const FormContainer = styled.View`
  width: 100%;
  padding: 5px;
`;

export const Input = styled.TextInput`
  background-color: ${colors.shadow};
  border-width: 0.5px;
  border-color: silver;
  margin-bottom: 25px;
  border-radius: 1px;
`;

export const Label = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 20px;
`;

export const ImageContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 100px;
  margin-bottom: 25px;
`;

export const Img = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 100px;
`;

export const Button = styled.TouchableOpacity`
  width: 95%;
  height: 50px;
  margin-bottom: 15px;
  background-color: ${({disableStatus}) => {
    if (disableStatus) {
      return 'silver';
    }
    return colors.main;
  }};
  justify-content: center;
  align-items: center;
  align-self: center;
  border-width: 0.5px;
  border-color: ${colors.main};
  border-radius: 8px;
`;