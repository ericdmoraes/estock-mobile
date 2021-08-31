import React, {useEffect, useState} from 'react';

import {Alert} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {Container, Label, ImageCategory, ImageContainer} from './styles';

import getRealm from '../../services/realm';

import notFoundImg from '../../assets/notFoundImg';

const CategoryList = ({data}) => {
  const {navigate} = useNavigation();

  const [catImg, setCatImg] = useState('');

  useEffect(() => {
    async function fetchData() {
      const realm = await getRealm();
      const res = realm.objects('Item');
      const filteredData = res.filtered(`category = "${data.name}"`);
      if (filteredData.length > 0) {
        setCatImg(filteredData[filteredData.length - 1].picture);
      }
    }

    fetchData();
  }, [data.name]);

  const deleteCategory = async () => {
    const realm = await getRealm();
    Alert.alert('Deletar?', `Deseja realmente deletar ${data.name}?`, [
      {
        text: 'Sim',
        onPress: () => {
          realm.write(() => {
            const res = realm.objects('Item').sorted('name');
            const categoryItems = res.filtered(`category = "${data.name}"`);
            realm.delete(categoryItems);
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

  return (
    <Container
      onLongPress={() => deleteCategory(data)}
      onPress={() => navigate('Items', {data})}>
      <ImageContainer>
        <ImageCategory
          source={{
            uri: catImg || notFoundImg,
          }}
        />
      </ImageContainer>
      <Label>{data.name}</Label>
    </Container>
  );
};

export default CategoryList;
