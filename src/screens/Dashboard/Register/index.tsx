import React, { useState } from "react";
import { 
    Modal, 
    Keyboard,
    Alert
} from "react-native";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from "react-hook-form"

import { InputForm } from "../../../Components/Forms/InputForm"
import { Button } from "../../../Components/Forms/Button";
import { TransactionTypeButton } from "../../../Components/Forms/TransactionTypeButton";
import { CategorySelectButton } from "../../../Components/Forms/CategorySelectButton";
import { GestureHandlerRootView } from 'react-native-gesture-handler';


import { CategorySelect } from '../../CategorySelect'

import {
    Container,
    Header,
    Title,
    Filds,
    Form,
    TransactionTypes,
} from './styles';
interface FormData {
    name:string;
    amount:string;
}

const  schema = Yup.object().shape({
    name: Yup.
    string().
    required('Nome é Obrigatorio'),
    amount: Yup.
    number().
    typeError('Informe Um valor numerico').
    positive('O valor não pode ser  negativo').
    required(' O valor é obrigatoiro ')
}); 

export function Register(){
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    })
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    function handleTransactionTypesSelect(type: 'up' | 'down'){
        setTransactionType(type);
    }
    function handleOpenSelctCategoryModal(){
        setCategoryModalOpen(true)
    }
    function handleCloseSelctCategoryModal(){
        setCategoryModalOpen(false)
    }
    function handleRegister(form: FormData){
        if(!transactionType)
        return Alert.alert('Selecione o tipo  da transação');

        if(category.key === 'category')
        return Alert.alert('Selecione a categoria');


        const data = {
            name: form.name,    
            amount: form.amount,
            transactionType,
            category: category.key
        }
        console.log(data)
    }
    return(
        <GestureHandlerRootView style={{flex:1}}>
    <TouchableWithoutFeedback 
    onPress={Keyboard.dismiss}
    containerStyle={{flex: 1}}
    style={{flex: 1}}
    >
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
             <Filds>
                <InputForm 
                name="name"
                control={control}
                placeholder="Name"
                autoCapitalize="sentences"
                autoCorrect={false}
                error={errors.name && errors.name.message}
                />
                <InputForm 
                 name="amount"
                control={control}
                placeholder="Preço"
                keyboardType="numeric"
                error={errors.amount && errors.amount.message}
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
                <CategorySelectButton 
                title={category.name}
                onPress={handleOpenSelctCategoryModal}
                />
             </Filds>  
            <Button  
            title="Enviar"
            onPress={handleSubmit(handleRegister)}
            />
            </Form>
            <Modal visible={categoryModalOpen}>
                <CategorySelect 
                category={category}
                setCategory={setCategory}
                closeSelctCategory={handleCloseSelctCategoryModal}
                />
            </Modal>
        </Container>
    </TouchableWithoutFeedback>
    </GestureHandlerRootView>
    );
}