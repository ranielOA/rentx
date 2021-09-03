import React from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import { Container, Header, CarImages } from './styles';

export function CarDetails() {
  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={[
            'https://e7.pngegg.com/pngimages/140/866/png-clipart-hyundai-creta-car-mini-sport-utility-vehicle-hyundai-compact-car-car.png',
          ]}
        />
      </CarImages>
    </Container>
  );
}
