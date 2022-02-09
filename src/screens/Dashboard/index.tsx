import React from "react";
import { HighlightCard } from "../../HighlightCard";


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
       } from "./styles";
export function Dashboard(){
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
        <HighlightCard />
    </Container>
    );
}