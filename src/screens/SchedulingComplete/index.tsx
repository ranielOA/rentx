import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackList } from '../../routes/routesScreens';
import { useNavigation } from '@react-navigation/core';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { Container, Content, Footer, Message, Title } from './styles';
import { ConfirmButton } from '../../components/ConfirmButton';

type rootStackProps = NativeStackNavigationProp<
  RootStackList,
  'SchedulingComplete'
>;

export function SchedulingComplete() {
  const { navigate } = useNavigation<rootStackProps>();
  const { width } = useWindowDimensions();

  function handleConfirm() {
    navigate('Home');
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado!</Title>

        <Message>
          Agora você só precisa ir {'\n'}
          até a concessionária da RENX {'\n'}
          pegar o seu automóvel
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleConfirm} />
      </Footer>
    </Container>
  );
}
