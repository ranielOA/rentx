import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { ConfirmationScreen } from '../../routes/routesScreens';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { Container, Content, Footer, Message, Title } from './styles';
import { ConfirmButton } from '../../components/ConfirmButton';

export function Confirmation() {
  const { navigate } = useNavigation();
  const { width } = useWindowDimensions();

  const route = useRoute();
  const { title, message, nextScreenRoute } =
    route.params as ConfirmationScreen;

  function handleConfirm() {
    navigate(nextScreenRoute);
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
        <Title>{title}</Title>

        <Message>{message}</Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleConfirm} />
      </Footer>
    </Container>
  );
}
