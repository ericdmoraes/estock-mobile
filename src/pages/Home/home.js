import React, {useEffect, useState} from 'react';

// navigation
import {useNavigation} from '@react-navigation/native';

import {Text, View} from 'react-native';

// Services
import getRealm from '../../services/realm';

// Styles
import {
  Container,
  CategoryList as List,
  Title,
  TitleContainer,
  Button,
  ItemsContainer,
  EmptyListView,
  Label,
} from './styles';

// Components
import CategoryList from '../../components/CategoryList/CategoryList';
import Icon from 'react-native-vector-icons/Ionicons';

const Home = () => {
  const navigation = useNavigation();

  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const realm = await getRealm();
      const categoriesData = realm.objects('Category').sorted('name');
      const itemsData = realm.objects('Item').sorted('createdAt', true);

      setItems(itemsData || []);
      setCategories(categoriesData || []);
      realm.addListener('change', fetchData);
    }

    fetchData();
  }, []);

  const EmptyList = () => {
    return (
      <EmptyListView>
        <Label>Você ainda não criou uma categoria!</Label>
      </EmptyListView>
    );
  };

  return (
    <Container>
      <TitleContainer>
        <Title>Categorias</Title>
        <Button onPress={() => navigation.navigate('CreateProductCategory')}>
          <Icon name="add" color="#fff" size={42} />
        </Button>
      </TitleContainer>
      {categories.length > 0 ? (
        <List
          data={categories}
          renderItem={({item}) => <CategoryList data={item} />}
          keyExtractor={(item) => String(item.id)}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <EmptyList />
      )}
      <ItemsContainer>
        <Title>Gráficos das vendas do mês</Title>
        {/* <View>
          <Text>Em construção</Text>
        </View> */}
        {/* {items.map((i) => {
          var date = new Date(i.createdAt);
          var day = date.getDay();
          var month = date.getMonth();
          var hours = date.getHours();
          var minutes = date.getMinutes();
          var seconds = date.getSeconds();
          // console.log(hours, minutes, seconds, i.category);
          return (
            <Text key={i.id}>
              {i.name} - {day}/{month}, {hours}:{minutes}:{seconds}
            </Text>
          );
        })} */}
      </ItemsContainer>
    </Container>
  );
};

export default Home;
