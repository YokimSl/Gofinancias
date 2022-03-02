import React, { useState, useEffect } from "react";
import { 
    Modal, 
    Keyboard,
    Alert
} from "react-native";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
export interface FormData {
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

    const dataKey = '@gofinances:transactions';
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
    async function handleRegister(form: FormData){
        if(!transactionType)
        return Alert.alert('Selecione o tipo  da transação');

        if(category.key === 'category')
        return Alert.alert('Selecione a categoria');


        const newTransaction = {
            name: form.name,    
            amount: form.amount,
            transactionType,
            category: category.key
        }
        try {
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];

            const  dataFormatted = [
                ...currentData,
                newTransaction
        ];
            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

        } catch (error){
          console.log(error);
          Alert.alert("Não foi possivel salvar");
        }
    }
    useEffect(() => {
        async function loadData(){
            const data = await AsyncStorage.getItem(dataKey)
            console.log(JSON.parse(data!))
        }
        loadData();
        // async function removeAll(){
        //     await AsyncStorage.removeItem(dataKey);
        // }
        // removeAll();

    }, [])
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