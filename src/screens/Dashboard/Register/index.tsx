import React, { useState } from "react";
import { Input } from "../../../Components/Forms/Input";
import { Button } from "../../../Components/Forms/Button";
import { TransactionTypeButton } from "../../../Components/Forms/TransactionTypeButton";
import { CategorySelect } from "../../../Components/Forms/CategorySelect";

import {
    Container,
    Header,
    Title,
    Filds,
    Form,
    TransactionTypes,
} from './styles';

export function Register(){
    const [transactionType, setTransactionType] = useState('');

    function handleTransactionTypesSelect(type: 'up' | 'down'){
        setTransactionType(type);
    }
    return(
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
             <Filds>
                <Input 
                placeholder="Name"
                />
                <Input 
                placeholder="Preço"
                />
                 <TransactionTypes>
                    <TransactionTypeButton 
                    type="up"
                    title="Entrada"
                    onPress={() => handleTransactionTypesSelect('up')}
                    isActive={transactionType === 'up'}
                    />
                    <TransactionTypeButton 
                    type="down"
                    title="Saida"
                    onPress={() => handleTransactionTypesSelect('down')}
                    isActive={transactionType === 'down'}

                    />
                </TransactionTypes>  
                <CategorySelect title="Categoria" />
             </Filds>  
            <Button  title="Enviar"/>
            </Form>
        </Container>
    );
}