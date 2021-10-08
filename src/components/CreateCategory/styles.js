import styled from 'styled-components/native';

import { colors } from '../../styles/index';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const Input = styled.TextInput`
  background-color: ${colors.shadow};
  border-width: 0.5px;
  border-bottom-color: #0a0a0a;
  margin-bottom: 20px;
`;

export const Button = styled.TouchableOpacity`
  width: 95%;
  height: 60px;
  background-color: ${({ disableStatus }) => {
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

export const Label = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;
