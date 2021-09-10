import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { RootStackList } from '../../routes/routesScreens';

import { Container, Header, TotalCars, HeaderContent, CarList } from './styles';

type rootStackProps = NativeStackNavigationProp<RootStackList, 'Home'>;

export function Home() {
  const { navigate } = useNavigation<rootStackProps>();

  const carData = {
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'AO DIA',
      price: 120,
    },
    thumbnail:
      'https://e7.pngegg.com/pngimages/140/866/png-clipart-hyundai-creta-car-mini-sport-utility-vehicle-hyundai-compact-car-car.png',
  };

  function handleCarDetails() {
    navigate('CarDetails');
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      <CarList
        data={[1, 2, 3]}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => (
          <Car data={carData} onPress={handleCarDetails} />
        )}
      />
    </Container>
  );
}
