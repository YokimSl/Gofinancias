import React from "react";
import { HighlightCard } from "../../Components/HighlightCard";
import { TransactionCard, TransactionCardProps} from "../../Components/TransacitonCard"

import { 
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionList,
       } from "./styles";

export interface DataListProps extends TransactionCardProps{
    id: string;
}

export function Dashboard(){

const data: DataListProps[] = [
    {
    id:'1',
    type: 'positive',
    title: "Desenvolvimento de site",
    amount: "R$ 12.000,00",
    category: {
        name:"Vendas",
        icon: 'dollar-sign'
    },
    date: "10/02/2022"
},
{
    id:'2',
    type: 'negative',
    title: "MathsBurgue ",
    amount: "R$ 59,00",
    category: {
        name:"Alimentação",
        icon: 'coffee'
    },
    date: "10/02/2022"
},
{
    id:'3',
    type:'negative',
    title: "Aluguel casa",
    amount: "R$ 1.200,00",
    category: {
        name:"Casa",
        icon: 'home'
    },
    date: "10/02/2022"
}
]; 
    return(
    <Container>
        <Header>
         <UserWrapper>
            <UserInfo>
                <Photo 
                source={{ uri: 'https://avatars.githubusercontent.com/u/49276851?v=4'}}
                />
                    <User>
                        <UserGreeting>Olá,</UserGreeting>
                        <UserName>Jhonnata</UserName>
                    </User>
            </UserInfo>
            <Icon name="power"/>
         </UserWrapper>
        </Header>
        <HighlightCards>
            <HighlightCard 
            type='up'
            title="Entradas"
            amount="R$ 17.400,00"
            lastTransaction="Ultima entrada dia 13 de abril"
            />
            <HighlightCard 
            type="down"
            title="Saídas"
            amount="R$ 1.259,00"
            lastTransaction="Ultima saída 03 abril"
            />
            <HighlightCard 
            type="total"
            title="Total"
            amount="R$ 16.141,00"
            lastTransaction="01 a 16 de abril"
            />

        </HighlightCards>

        <Transactions>
            <Title>Listagem</Title>
            <TransactionList    
            data={data}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>  <TransactionCard data={item}/>}
            />
        </Transactions>
    </Container>
    );
}