import React, { useState } from 'react';
import { Text, FlatList, Alert, TouchableOpacity } from 'react-native';

import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/FontAwesome';

import ModalItem from '../ModalItem/ModalItem';

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
  LabelContainer,
} from './styles';

import getRealm from '../../services/realm';

import { colors } from '../../styles/index';

const ItemsList = ({ items }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [itemEdit, setItemEdit] = useState();

  const onSharePress = async item => {
    return await Share.open({
      message: `${item.description}`, // Note that according to the documentation at least one of "message" or "url" fields is required
      url: `${item.picture}`,
    });
  };

  const deleteCategory = async info => {
    const realm = await getRealm();
    Alert.alert(
      'O que deseja fazer?',
      `O que você deseja com o item ${info.name}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Deletar',
          onPress: () => {
            realm.write(() => {
              realm.delete(info);
            });
          },
          style: 'default',
        },
        {
          text: 'Editar',
          onPress: () => {
            setModalVisible(true);
            setItemEdit(info)
          },
          style: 'default',
        },
      ],
    );
  };

  const setQuantity = async (item, operation, value = 1) => {
    const realm = await getRealm();
    let selled = item.selled;

    if (operation === 1) {
      var total = item.qtd + 1;
      var acquired = item.acquired + 1;
    } else if (operation === 2) {
      if (item.qtd > 0) {
        var total = item.qtd - 1;
        selled = selled + 1;
      } else {
        Alert.alert(
          'Você não tem estoque para essa venda.',
          'Por favor, reponha o estoque para poder efetuar uma venda.',
        );
      }
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
          <TouchableOpacity onPress={() => deleteCategory(item)}>
            <Icon
              style={{ marginStart: 10 }}
              name="edit"
              color={colors.main}
              size={32}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSharePress(item)}>
            <Icon
              style={{ marginStart: 10 }}
              name="share-square-o"
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
        
        <QtdContainer >
          
            <SmallText>Estoque:</SmallText>
            <Label style={{ marginRight: 10 }}>{qtd}</Label>
          
            <SmallText> Vendido:</SmallText>
            <Label style={{ marginRight: 10 }}>{item.selled}</Label>
          
            <SmallText> Total:</SmallText>
            <Label style={{ marginRight: 10 }}>{item.acquired}</Label>
          
        </QtdContainer>

      </ItemContainer>
      <LabelContainer>
        <Label>{item.description}</Label>
      </LabelContainer>
      <SellItemView item={item} />
    </Container>
  );

  const renderItem = ({ item }) => {
    return (
      <CardBackground key={item.id} activeOpacity={1}>
        <ItemImgView picture={item.picture} />
        <ItemNameView item={item} name={item.name} qtd={item.qtd} />
      </CardBackground>
    );
  };

  return (
    <>
      {items.length > 0 ? (
        <>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={item => String(item.id)}
          />
          {itemEdit && (
            <ModalItem
              item={itemEdit}
              status={modalVisible}
              onClose={setModalVisible}
            />
          )}
        </>
      ) : (
        <EmptyListContainer>
          <Text>Você ainda não criou produtos.</Text>
        </EmptyListContainer>
      )}
    </>
  );
};

export default ItemsList;
