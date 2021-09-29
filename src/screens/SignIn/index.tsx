import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Footer,
  ButtonStyle,
} from './styles';

export function SignIn() {
  const theme = useTheme();

  function handleSignIn() {}

  function handleNewAccount() {}

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <Title>Estamos{'\n'}quase lá.</Title>
        <SubTitle>
          Faça seu login para começar{'\n'}
          uma experiência incrível.
        </SubTitle>
      </Header>

      <Input iconName="mail" />

      <Footer>
        <Button
          title="Login"
          onPress={handleSignIn}
          enabled={true}
          loading={false}
          buttonStyle={ButtonStyle}
        />

        <Button
          title="Criar conta gratuita"
          color={theme.colors.background_secondary}
          light
          onPress={handleNewAccount}
          enabled={true}
          loading={false}
        />
      </Footer>
    </Container>
  );
}
