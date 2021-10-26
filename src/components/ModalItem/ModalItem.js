import React, { useEffect, useState } from 'react';
import { View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

import getRealm from '../../services/realm';

import CameraModal from '../../components/CameraModal/CameraModal';

import { ModalContainer, ModalView, 
  CloseButtonContainer, Input, Label, FormContainer, Head, 
  PriceItemContainer, ImageContainer, Button as Btn, Img, Title } from './styles';

import { colors } from '../../styles';

const CloseModal = ({ close }) => (
    <CloseButtonContainer
      onPress={() => close(false)}>
        <Icon
          name="close"
          size={40}
        />
    </CloseButtonContainer>
)

const ModalItem = ({ item, status, onClose }) => {
  const [buy, setBuy] = useState('');
  const [name, setName] = useState('');
  const [sell, setSell] = useState('');
  const [open, setOpen] = useState(false); 
  const [picture, setPicture] = useState();
  const [disable, setDisable] = useState(false);
  const [description, setDescription] = useState('');

  const updateItem = async () => {
    setDisable(true)
    const realm = await getRealm()
    realm.write(() => {[
      item.name = name || item.name,
      item.picture = picture || item.picture,
      item.description = description || item.description,
      item.price_to_buy = parseFloat(buy) || item.price_to_buy,
      item.price_to_sell = parseFloat(sell) || item.price_to_sell,
    ]})
    onClose(false)
    setDisable(false)
  }

  const ImageEditField = () => (
    <>
    <Label>Foto:</Label>
      {item.picture.length > 0 ? (
        <ImageContainer onPress={() => setOpen(!open)}>
          <Img source={{ uri: picture || item.picture }} />
        </ImageContainer>
      ) : (
        <Btn onPress={() => setOpen(!open)} color={colors.main}>
          <Label style={{ color: 'white', fontSize: 18 }}>Capturar</Label>
        </Btn>
      )}
    </>
  )

  return (
    <>
      {open && <CameraModal setImage={setPicture} close={setOpen} status={open} />}
      <ModalView animationType="slide" transparent={true} visible={status}>
        <ModalContainer>
          <Head>
            <Title>
              Editar
            </Title>
            <CloseModal close={onClose} />
          </Head>
          <FormContainer>
            <Label>Nome:</Label>
            <Input onChangeText={setName} defaultValue={item.name}/>
            <Label>Descrição do produto:</Label>
            <Input 
              onChangeText={setDescription} 
              defaultValue={item.description}
              maxLength={100}
              numberOfLines={4}
              multiline />
            <ImageEditField />
            <PriceItemContainer>
              <View>
                <Label>Valor de compra:(R$)</Label>
                <Input 
                  onChangeText={setBuy}
                  keyboardType="decimal-pad"
                  defaultValue={`${item.price_to_buy}`} />
              </View>
              <View>
                <Label>Valor de venda: (R$)</Label>
                <Input 
                  onChangeText={setSell} 
                  keyboardType="decimal-pad" 
                  defaultValue={`${item.price_to_sell}`} />
              </View>
            </PriceItemContainer>
          </FormContainer>
          <Btn disableStatus={disable} disabled={disable} onPress={updateItem}>
            <Label style={{ color: 'white', fontSize: 18 }}>Salvar</Label>
          </Btn>
        </ModalContainer>
      </ModalView>
    </>
  );
}

export default ModalItem;
