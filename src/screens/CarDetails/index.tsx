import React from 'react';
import { Acessory } from '../../components/Acessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDetailsScreenProps } from '../../routes/routesScreens';

import {
  Container,
  Header,
  CarImages,
  Description,
  Rent,
  Content,
  Details,
  Brand,
  Name,
  Period,
  Price,
  About,
  Accessories,
  Footer,
} from './styles';

export function CarDetails() {
  const { navigate, goBack } = useNavigation();
  const route = useRoute();
  const { car } = route.params as CarDetailsScreenProps;

  function handleConfirmRental() {
    navigate('Scheduling', { car });
  }

  function handleBack() {
    goBack();
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>

            <Rent>
              <Period>{car.rent.period}</Period>
              <Price>R$ {car.rent.price}</Price>
            </Rent>
          </Description>
        </Details>

        <Accessories>
          {car.accessories.map((accessory) => (
            <Acessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <About>{car.about}</About>
      </Content>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}
