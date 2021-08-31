import React from 'react';
import {Text, FlatList, Alert, View, TouchableOpacity} from 'react-native';

import {
  Container,
  TextContainer,
  Img,
  Label,
  ItemContainer,
  Imgcontainer,
  SellingContainer,
  SellButton,
  CustomButton,
  EmptyListContainer,
} from './styles';

import {useNavigation} from '@react-navigation/native';

import getRealm from '../../services/realm';

import {colors} from '../../styles/index';

const ItemsList = ({items}) => {
  const {navigate} = useNavigation();

  const deleteCategory = async (data) => {
    const realm = await getRealm();

    Alert.alert('Deletar?', `Deseja realmente deletar ${data.name}?`, [
      {
        text: 'Sim',
        onPress: () => {
          realm.write(() => {
            realm.delete(data);
          });
        },
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ]);
  };

  const setQuantity = async (item, operation, value = 1) => {
    const realm = await getRealm();

    let selled = item.selled;

    if (operation === 1) {
      var total = item.qtd + 1;
    } else {
      var total = item.qtd - 1;
      selled = selled + 1;
    }

    console.log(selled);
    realm.write(() => {
      realm.create('Item', {id: item.id, qtd: total}, 'modified');
    });
  };

  const renderItem = ({item}) => {
    return (
      <Container
        onLongPress={() => deleteCategory(item)}
        // onPress={() => navigate('CreateItem', {item})}
      >
        <Imgcontainer>
          <Img source={{uri: `${item.picture}`}} />
        </Imgcontainer>
        <TextContainer>
          <ItemContainer>
            <Label>Nome:</Label>
            <Text> {item.name}</Text>
          </ItemContainer>
          <ItemContainer style={{minHeight: 40, maxWidth: 150}}>
            <Label>Descrição:</Label>
            <Text> {item.description}</Text>
          </ItemContainer>
        </TextContainer>
        <SellingContainer>
          <ItemContainer>
            <Label>Quantidade:</Label>
            <Text> {item.qtd}</Text>
          </ItemContainer>
          <CustomButton
            style={{marginBottom: 3}}
            onPress={() => setQuantity(item, 2)}>
            <SellButton style={{color: 'red'}}>Vender</SellButton>
          </CustomButton>
          <CustomButton onPress={() => setQuantity(item, 1)}>
            <SellButton style={{color: 'green'}}>Repor</SellButton>
          </CustomButton>
        </SellingContainer>
      </Container>
    );
  };

  return (
    <>
      {items.length > 0 ? (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
        />
      ) : (
        <EmptyListContainer>
          <Text>Você ainda não criou produtos.</Text>
        </EmptyListContainer>
      )}
    </>
  );
};

export default ItemsList;
