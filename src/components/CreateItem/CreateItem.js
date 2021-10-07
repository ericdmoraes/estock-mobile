import React, { useState } from 'react';

import { View, Button, Alert } from 'react-native';

import getRealm from '../../services/realm';

import { useNavigation } from '@react-navigation/native';

import CameraModal from '../../components/CameraModal/CameraModal';

// import notFoundImg from '../../assets/notFoundImg';

import {
  Container,
  Input,
  HorizontalContainer,
  Label,
  ImageContainer,
  Img,
  Button as Btn,
  FieldContainer,
} from './styles';

const CreateItem = ({ route }) => {
  const data = route.params.data;
  // const item = route.params.item;

  const { goBack } = useNavigation();

  const [name, setName] = useState('');
  const [qtd, setQtd] = useState(0);
  const [pic, setPic] = useState('');
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState('');
  const [sell, setSell] = useState(0);
  const [buy, setBuy] = useState(0);

  const [disable, setDisable] = useState(false);

  const saveCategory = async () => {
    setDisable(true);

    const realm = await getRealm();
    try {
      if (name.length > 0 && desc.length > 0) {
        realm.write(() => {
          realm.create('Item', {
            id: Math.floor(Math.random() * 100000) + 1,
            name: name,
            qtd: parseInt(qtd),
            selled: 0,
            price_to_sell: parseInt(sell),
            acquired: parseInt(qtd),
            price_to_buy: parseInt(buy),
            picture: pic,
            category: data.name,
            description: desc,
            createdAt: Date.now(),
          });
        });
        goBack();
        setDisable(false);
      } else {
        Alert.alert(
          'Preencha todos os campos.',
          'Por favor, preencha todos os campos!',
        );
        setDisable(false);
      }
    } catch (error) {
      setDisable(false);
      console.log('err', error);
    }
  };

  return (
    <>
      {open && <CameraModal setImage={setPic} close={setOpen} />}

      <Container>
        <FieldContainer>
          <Label>Nome:</Label>
          <Input onChangeText={setName} />
        </FieldContainer>

        <HorizontalContainer>
          <View style={{ justifyContent: 'center' }}>
            <Label>Quatidade: </Label>
            <Input
              placeholder="Padrão 0 "
              keyboardType="decimal-pad"
              onChangeText={setQtd}
            />
          </View>

          <View style={{ width: 150 }}>
            <Label>Foto:</Label>
            {pic.length > 0 ? (
              <ImageContainer onPress={() => setOpen(!open)}>
                <Img source={{ uri: pic }} />
              </ImageContainer>
            ) : (
              <Button
                onPress={() => setOpen(!open)}
                color="#000"
                title="Take"
              />
            )}
          </View>
        </HorizontalContainer>

        <Label>Descrição: </Label>
        <Input
          maxLength={100}
          multiline
          placeholder="Maxímo de 100 caracteres"
          numberOfLines={4}
          onChangeText={setDesc}
        />

        <HorizontalContainer>
          <View>
            <Label>Preço de custo:</Label>
            <Input
              placeholder="R$"
              keyboardType="decimal-pad"
              onChangeText={setBuy}
            />
          </View>

          <View>
            <Label>Preço de venda:</Label>
            <Input
              placeholder="R$"
              keyboardType="decimal-pad"
              onChangeText={setSell}
            />
          </View>
        </HorizontalContainer>

        <Btn disableStatus={disable} disabled={disable} onPress={saveCategory}>
          <Label style={{ color: 'white', fontSize: 18 }}>Criar</Label>
        </Btn>
      </Container>
    </>
  );
};

export default CreateItem;
