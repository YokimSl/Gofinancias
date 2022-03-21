import React, { useState } from 'react';
import { 
    Modal, 
    Keyboard,
    Alert
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'

import { useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../../hooks/auth';

import { InputForm } from '../../../Components/Forms/InputForm'
import { Button } from '../../../Components/Forms/Button';
import { TransactionTypeButton } from '../../../Components/Forms/TransactionTypeButton';
import { CategorySelectButton } from '../../../Components/Forms/CategorySelectButton';
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

type NavigationProps = {
    navigate:(screens:string) => void;
 }

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
    const { user } = useAuth();

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    })
    const  navigation = useNavigation<NavigationProps>();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    function handleTransactionTypesSelect(type: 'positive' | 'negative'){
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
            id: String(uuid.v4()),
            name: form.name,    
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date()
        }
        try {
            const dataKey = `@gofinances:transactions_user:${user.id}`;

            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];

            const  dataFormatted = [
                ...currentData,
                newTransaction
        ];
            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
            reset();
            setTransactionType('');
            setCategory({
                key: 'category',
                name: 'Categoria'
            });

            navigation.navigate('Listagem');

        } catch (error){
          console.log(error);
          Alert.alert('Não foi possivel salvar');
        }
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
                    name='name'
                    control={control}
                    placeholder='Name'
                    autoCapitalize='sentences'
                    autoCorrect={false}
                    error={errors.name && errors.name.message}
                    />
                    <InputForm 
                    name='amount'
                    control={control}
                    placeholder='Preço'
                    keyboardType='numeric'
                    error={errors.amount && errors.amount.message}
                    />
                    <TransactionTypes>
                        <TransactionTypeButton 
                        type='up'
                        title='Entrada'
                        onPress={() => handleTransactionTypesSelect('positive')}
                        isActive={transactionType === 'positive'}
                        />
                        <TransactionTypeButton 
                        type='down'
                        title='Saida'
                        onPress={() => handleTransactionTypesSelect('negative')}
                        isActive={transactionType === 'negative'}

                        />
                    </TransactionTypes>  
                    <CategorySelectButton 
                    title={category.name}
                    onPress={handleOpenSelctCategoryModal}
                    />
                </Filds>  
                <Button  
                title='Enviar'
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