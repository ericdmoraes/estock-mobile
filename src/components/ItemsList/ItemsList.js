import React from 'react';
import { Text, FlatList, Alert, TouchableOpacity } from 'react-native';

import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  CardBackground,
  SellingContainerView,
  QtdContainer,
  Container,
  Img,
  Label,
  ItemContainer,
  SmallText,
  Imgcontainer,
  SellingContainer,
  SellButton,
  CustomButton,
  EmptyListContainer,
  Hr,
} from './styles';

import { useNavigation } from '@react-navigation/native';

import getRealm from '../../services/realm';

import { colors } from '../../styles/index';

const ItemsList = ({ items }) => {
  const { navigate } = useNavigation();

  const onSharePress = async item => {
    return await Share.open({
      message: `${item.description}`, // Note that according to the documentation at least one of "message" or "url" fields is required
      url: `${item.picture}`,
    });
  };

  const deleteCategory = async data => {
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
      var acquired = item.acquired + 1;
    } else {
      var total = item.qtd - 1;
      selled = selled + 1;
    }

    realm.write(() => {
      realm.create(
        'Item',
        { id: item.id, qtd: total, selled: selled, acquired: acquired },
        'modified',
      );
    });
  };

  const ItemImgView = ({ picture }) => (
    <Imgcontainer>
      <Img source={{ uri: `${picture}` }} />
    </Imgcontainer>
  );

  const SellItemView = ({ item }) => (
    <>
      <SellingContainerView>
        <SmallText>Ações:</SmallText>
        <SellingContainer>
          <CustomButton onPress={() => setQuantity(item, 2)}>
            <SellButton style={{ color: 'green' }}>$ Vender</SellButton>
          </CustomButton>
          <CustomButton onPress={() => setQuantity(item, 1)}>
            <SellButton style={{ color: 'blue' }}>+ Repor</SellButton>
          </CustomButton>
          <TouchableOpacity onPress={() => onSharePress(item)}>
            <Icon
              style={{ marginStart: 10 }}
              name="share-alt"
              color={colors.main}
              size={32}
            />
          </TouchableOpacity>
        </SellingContainer>
      </SellingContainerView>
    </>
  );

  const ItemNameView = ({ name, item, qtd }) => (
    <Container>
      <ItemContainer>
        <QtdContainer>
          <SmallText>Nome: </SmallText>
          <Label>{name}</Label>
        </QtdContainer>
        <QtdContainer>
          <SmallText>
            Estoque: <Label>{qtd}</Label>
          </SmallText>
          <SmallText>
            {' '}
            / Vendido: <Label>{item.selled}</Label>
          </SmallText>
          <SmallText>
            {' '}
            / Total: <Label>{item.acquired}</Label>
          </SmallText>
        </QtdContainer>
      </ItemContainer>
      <SmallText>
        Descrição: <Label>{item.description}</Label>
      </SmallText>
      <SellItemView item={item} />
    </Container>
  );

  const renderItem = ({ item }) => {
    return (
      <CardBackground
        activeOpacity={1}
        onLongPress={() => deleteCategory(item)}>
        <ItemImgView picture={item.picture} />
        <ItemNameView item={item} name={item.name} qtd={item.qtd} />
      </CardBackground>
    );
  };

  return (
    <>
      {items.length > 0 ? (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={item => String(item.id)}
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
