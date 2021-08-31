import styled from 'styled-components/native';

import {colors} from '../../styles/index';

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 22px;
`;

export const Button = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: ${colors.main};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;
