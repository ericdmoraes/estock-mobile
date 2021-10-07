import React, { useEffect, useState } from 'react';

// navigation
import { useNavigation } from '@react-navigation/native';

// Components
import { Text, View, ScrollView } from 'react-native';

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
  SmallText,
} from './styles';

// Components
import CategoryList from '../../components/CategoryList/CategoryList';
import Icon from 'react-native-vector-icons/Ionicons';
import ItemList from '../../components/ItemsList/ItemsList';

const Home = () => {
  const navigation = useNavigation();

  const [categories, setCategories] = useState([]);
  const [categoriesLength, setCategoriesLength] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const realm = await getRealm();
      const categoriesData = realm.objects('Category').sorted('name');
      const itemsData = realm.objects('Item').sorted('createdAt', true);

      setCategoriesLength(categoriesData.length);
      setItems(itemsData || []);
      setCategories(categoriesData || []);
      realm.addListener('change', fetchData);
    }

    fetchData();
  }, []);

  const EmptyList = () => (
    <EmptyListView>
      <Label>Você ainda não criou uma categoria!</Label>
    </EmptyListView>
  );

  const CategoriesList = () =>
    categoriesLength > 0 ? (
      <View style={{ height: '22%' }}>
        <List
          data={categories}
          renderItem={({ item }) => <CategoryList data={item} />}
          keyExtractor={item => String(item.id)}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    ) : (
      <EmptyList />
    );

  const CategoriesHeader = () => (
    <>
      <TitleContainer>
        <Title>Categorias</Title>
        <Button onPress={() => navigation.navigate('CreateProductCategory')}>
          <Icon name="add" color="#fff" size={42} />
        </Button>
      </TitleContainer>
      <CategoriesList />
    </>
  );

  const AllProductsSection = () => (
    <>
      <TitleContainer>
        <Title>Todos os produtos</Title>
        <SmallText>Ordenado por data</SmallText>
      </TitleContainer>
      <ItemList items={items} />
    </>
  );

  return (
    <>
      <CategoriesHeader />
      <AllProductsSection />
    </>
  );
};

export default Home;
