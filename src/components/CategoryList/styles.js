import styled from 'styled-components/native';

import LinearGradient from 'react-native-linear-gradient';

import {colors} from '../../styles/index';

export const Container = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const Label = styled.Text`
  font-weight: bold;
`;

export const ImageContainer = styled(LinearGradient).attrs({
  colors: [colors.main, colors.main, colors.main],
  start: {x: 1.0, y: 0.0},
  end: {x: 0.0, y: 1.0},
})`
  width: 98px;
  height: 98px;
  background-color: black;
  border-radius: 98px;
  justify-content: center;
  align-items: center;
`;

export const ImageCategory = styled.Image`
  width: 92px;
  height: 92px;
  border-radius: 53px;
  background-color: white;
`;
