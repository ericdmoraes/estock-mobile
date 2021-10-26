import React from 'react';
import { View } from 'react-native';

import { CardContainer, InsightLabel, Label, LabelContainer } from './styles';

const SellingInformationCard = ({ item, index }) => {

    const Header = () => (
        <LabelContainer>
            <InsightLabel>Item:</InsightLabel> 
            <Label>{item.name}</Label>
        </LabelContainer>
    )

    const SellData = () => (
        <View style={{ margin: 5 }}>
            <LabelContainer>
                <InsightLabel>Preço para vender: </InsightLabel> 
                <Label>R$ {item.price_to_sell}</Label>
            </LabelContainer>
            <LabelContainer>
                <InsightLabel>Vendidos:</InsightLabel> 
                <Label>{item.selled}</Label>
            </LabelContainer>
            <LabelContainer>
                <InsightLabel>Valor vendido total: </InsightLabel> 
                <Label>R$ {item.selled * item.price_to_sell}</Label>
            </LabelContainer>
        </View>
    )

    const BuyData = () => (
        <View style={{ margin: 5 }}>
            <LabelContainer>
                <InsightLabel>Preço para comprar: </InsightLabel> 
                <Label>R$ {item.price_to_buy}</Label>
            </LabelContainer>
            <LabelContainer>
                <InsightLabel>Comprados:</InsightLabel> 
                <Label>{item.acquired}</Label>
            </LabelContainer>
            <LabelContainer>
                <InsightLabel>Valor gasto total:</InsightLabel> 
                <Label>R$ {item.acquired * item.price_to_buy}</Label>
            </LabelContainer>       
        </View>
    )

    const Footer = () => (
        <>
            <LabelContainer>
                <InsightLabel>Estoque:</InsightLabel> 
                <Label>{item.qtd}</Label>
            </LabelContainer>
            <LabelContainer>
                <View style={{ flexDirection: 'column', marginBottom: 0}} >
                    <InsightLabel style={{ marginBottom: 0}}>Valor em estoque</InsightLabel>
                    <Label style={{ marginBottom: 0}}> - Comprado: R$ {item.qtd * item.price_to_buy}</Label>  
                    <Label> - Vender: R$ {item.qtd * item.price_to_sell}</Label>
                </View>
            </LabelContainer>
        </>
    )

    return (
        <CardContainer key={index}>
            <Header />
            <SellData />
            <BuyData />
            <Footer />
        </CardContainer>
  );
}

export default SellingInformationCard;