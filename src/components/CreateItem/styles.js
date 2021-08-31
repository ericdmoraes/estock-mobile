import styled from 'styled-components/native';

import {colors} from '../../styles/index';

export const Container = styled.ScrollView.attrs({
  // contentContainerStyle: {marginBottom: 100},
})`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  background-color: ${colors.secondary};
`;

export const Input = styled.TextInput`
  background-color: ${colors.shadow};
  border-width: 0.5px;
  border-color: silver;
  margin-bottom: 25px;
  border-radius: 1px;
`;

export const HorizontalContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Label = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

export const ImageContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 100px;
  /* background-color: blue; */
`;

export const Img = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  /* resize-mode: ; */
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

export const FieldContainer = styled.View``;
