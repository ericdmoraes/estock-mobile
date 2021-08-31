import React, {useEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';

import ItemsList from '../../components/ItemsList/ItemsList';

// Services
import getRealm from '../../services/realm';

import {TitleContainer, Title, Button} from './styles';

const ItemsFromCategory = ({route}) => {
  const data = route.params.data;

  const {navigate} = useNavigation();

  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const realm = await getRealm();
      const res = realm.objects('Item').sorted('name');
      const categoryItems = res.filtered(`category = "${data.name}"`);
      realm.addListener('change', fetchData);
      return setItems(categoryItems);
    }
    fetchData();
  }, [data.name]);

  return (
    <>
      <TitleContainer>
        <Title>{data.name}</Title>
        <Button onPress={() => navigate('CreateItem', {data})}>
          <Icon name="add" color="#fff" size={42} />
        </Button>
      </TitleContainer>
      <ItemsList items={items} />
    </>
  );
};

export default ItemsFromCategory;
