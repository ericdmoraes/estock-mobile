import React, {useState} from 'react';
import {Alert, Text, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';

// Services
import getRealm from '../../services/realm';

import {Container, Input, Button, Label} from './styles';

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [disable, setDisable] = useState(false);

  const {goBack} = useNavigation();

  const saveCategory = async () => {
    setDisable(true);
    const realm = await getRealm();
    try {
      if (categoryName.length > 0) {
        realm.write(() => {
          realm.create('Category', {
            id: Math.floor(Math.random() * 100000) + 1,
            name: categoryName,
          });
        });
        return goBack();
      }
      Alert.alert(
        'Preencha todos os campos.',
        'Por favor, preencha todos os campos!',
      );
      setDisable(false);
    } catch (error) {
      console.log('err', error);
    }
  };

  return (
    <Container>
      <Label>Nome da categoria: </Label>
      <Input onChangeText={setCategoryName} />
      <Button disableStatus={disable} disabled={disable} onPress={saveCategory}>
        <Label style={{color: 'white', fontWeight: 'bold'}}>Salvar</Label>
      </Button>
    </Container>
  );
};

export default CreateCategory;
