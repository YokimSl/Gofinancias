import React, { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


import { HistoryCard } from "../../Components/HistoryCard";

import {
    Container,
    Header,
    Title
} from './styles'

export function Resume(){
    async function loadData (){
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        console.log(responseFormatted)
    }
    useEffect(() => {
        loadData();
    },[]);
    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>

            <HistoryCard 
            title="Compras"
            amount="R$ 150,50"
            color="red"
            />

        </Container>
    );
}