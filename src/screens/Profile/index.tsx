import React from 'react';
import { Feather } from '@expo/vector-icons';
import { BackButton } from '../../components/BackButton';

import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/core';

import {
  Container,
  Header,
  HeaderTitle,
  HeaderTop,
  LogoutButton,
  Photo,
  PhotoButton,
  PhotoContainer,
} from './styles';

export function Profile() {
  const theme = useTheme();
  const { goBack } = useNavigation();

  function handleBack() {
    goBack();
  }

  function handleSignOut() {}

  return (
    <Container>
      <Header>
        <HeaderTop>
          <BackButton color={theme.colors.shape} onPress={handleBack} />

          <HeaderTitle>Editar Perfil</HeaderTitle>

          <LogoutButton onPress={handleSignOut}>
            <Feather name="power" size={24} color={theme.colors.shape} />
          </LogoutButton>
        </HeaderTop>

        <PhotoContainer>
          <Photo source={{ uri: 'https://github.com/ranielOA.png' }} />

          <PhotoButton onPress={() => {}}>
            <Feather name="camera" size={24} color={theme.colors.shape} />
          </PhotoButton>
        </PhotoContainer>
      </Header>
    </Container>
  );
}
