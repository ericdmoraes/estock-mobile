import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';

// Services
import getRealm from '../../services/realm';

// Charts
import { PieChart } from 'react-native-chart-kit';

// Styles
import {
  Title,
  TitleContainer,
  Container,
  ItemsDataContainer,
  DataLabel,
} from './styles';
import { colors } from '../../styles';

const Charts = () => {
  const [items, setItems] = useState([]);
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const realm = await getRealm();
      const itemsData = await realm.objects('Item').sorted('selled', true);
      const limitedItems = await itemsData.filtered('selled > 0 LIMIT(5)');
      setInsights(limitedItems);
      setItems(
        limitedItems.map((item, index) => {
          return {
            name: item.name,
            color: colors.graphColors[index],
            selled: item.selled,
            legendFontColor: '#000',
            legendFontSize: 15,
          };
        }),
      );
      realm.addListener('change', fetchData);
    }
    fetchData();
  }, []);

  const chartConfigs = [
    {
      backgroundColor: '#000000',
      backgroundGradientFrom: '#1E2923',
      backgroundGradientTo: '#08130D',
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      style: {
        borderRadius: 16,
        backgroundColor: colors.shadow,
        borderWidth: 0.5,
        borderTopColor: 'silver',
        borderStartColor: 'silver',
        borderEndColor: 'silver',
        borderBottomColor: 'silver',
        marginBottom: 10,
      },
    },
  ];

  return (
    <Container>
      {insights.length > 0 ? (
        <>
          <TitleContainer>
            <Title>Itens mais vendidos</Title>
            <Text>{items.length} mais vendidos</Text>
          </TitleContainer>
          <PieChart
            data={items}
            height={220}
            width={Dimensions.get('window').width - 20}
            chartConfig={chartConfigs[0]}
            accessor="selled"
            style={chartConfigs[0].style}
            absolute
          />
          <ItemsDataContainer>
            <DataLabel>Mais informações</DataLabel>
            <ScrollView style={{ height: '57%' }}>
              {insights.map((item, index) => {
                return (
                  <View key={index} style={{ margin: 10 }}>
                    <Text>Nome: {item.name}</Text>
                    <Text>Preço de venda: R$ {item.price_to_sell}</Text>
                    <Text>Preço de compra: R$ {item.price_to_buy}</Text>
                    <Text>
                      Valor vendido: R$ {item.selled * item.price_to_sell}
                    </Text>
                    <Text>
                      Valor comprado: R$ {item.acquired * item.price_to_buy}
                    </Text>
                    <Text>
                      Valor em estoque (compra/venda): R${' '}
                      {item.qtd * item.price_to_buy} / R${' '}
                      {item.qtd * item.price_to_sell}
                    </Text>
                    <Text>Vendidos: {item.selled}</Text>
                    <Text>Estoque: {item.qtd}</Text>
                    <Text>Comprados: {item.acquired}</Text>
                    <Text>Categoria: {item.category}</Text>
                  </View>
                );
              })}
            </ScrollView>
          </ItemsDataContainer>
        </>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}>
          <Title>Você ainda não efetuou uma venda.</Title>
        </View>
      )}
    </Container>
  );
};

export default Charts;
