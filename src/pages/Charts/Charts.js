import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';

// Services
import getRealm from '../../services/realm';

// Charts
import { PieChart, BarChart, LineChart } from 'react-native-chart-kit';

import SellingInformationCard from '../../components/SellingInformationCard/SellingInformationCard';
import { chartConfigs } from "./chartConfigs";

// Styles
import {
  Title,
  TitleContainer,
  Container,
  DataLabel,
  NoItemsContainer,
} from './styles';

import { colors } from '../../styles';

const Charts = () => {
  const [items, setItems] = useState();
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const realm = await getRealm();
      const itemsData = await realm.objects('Item').sorted('selled', true);
      const limitedItems = await itemsData.filtered('selled > 0 LIMIT(5)');
      setInsights(limitedItems);
      let a = {
        labels: [],
        datasets: [
          {
            data: []
          }
        ]
      }
      limitedItems.map((item, index) => {
        a.labels[index] = item.name
        a.datasets[0].data[index] = item.selled
      }),
      setItems(a)     
      realm.addListener('change', fetchData);
    }
    fetchData();
  }, []);

  const Head = () => (
    <TitleContainer>
      <Title>Itens mais vendidos</Title>
      <Text>{insights.length} mais vendidos</Text>
    </TitleContainer>
  )

  const Chart = () => (
    <>
      {items && ( 
        <>
          <LineChart
            data={items}
            height={320}
            width={Dimensions.get('window').width - 20}
            hidePointsAtIndex={1}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={chartConfigs}
            style={{
              borderRadius: 10
            }}
          />
        </>
      )}
    </>
  )

  const InsightCard = () => (
    <>
      <DataLabel>Mais informações</DataLabel>
      <ScrollView style={{ flexGrow: 1 }}>
        {insights.map((item, index) =>  (
          <SellingInformationCard item={item} index={index} />
        ))}
      </ScrollView>
    </>
  )

  return (
    <Container>
      {insights.length > 0 ? (
        <>
          <Head />
          <Chart />
          <InsightCard />
        </>
      ) : (
        <NoItemsContainer>
          <Title>Você ainda não efetuou uma venda.</Title>
        </NoItemsContainer>
      )}
    </Container>
  );
};

export default Charts;
