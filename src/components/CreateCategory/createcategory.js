import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

// Services
import getRealm from '../../services/realm';

import { Container, Input, Button, Label } from './styles';

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [disable, setDisable] = useState(false);

  const { goBack } = useNavigation();

  const saveCategory = async () => {
    setDisable(true);
    const realm = await getRealm();
    try {
      if (categoryName.length > 0) {
        const categoriesData = realm.objects('Category').sorted('name');
        const cat = categoriesData.map(item => item.name);
        const exists = cat.indexOf(categoryName);
        console.log(`Categorias: ${cat}, existe: ${exists}`);
        if (exists === -1) {
          realm.write(() => {
            realm.create('Category', {
              id: Math.floor(Math.random() * 100000) + 1,
              name: categoryName,
            });
          });
          return goBack();
        } else {
          Alert.alert(
            'Esta categoria já existe.',
            'Por favor, insira outro nome para categoria',
          );
          setDisable(false);
        }
      } else {
        Alert.alert(
          'Preencha todos os campos.',
          'Por favor, preencha todos os campos!',
        );
      }
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
        <Label style={{ color: 'white', fontWeight: 'bold' }}>Salvar</Label>
      </Button>
    </Container>
  );
};

export default CreateCategory;
