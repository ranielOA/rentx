import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { useTheme } from 'styled-components';

import { Acessory } from '../../components/Acessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDetailsScreenProps } from '../../routes/routesScreens';

import { CarDTO } from '../../dtos/CarDTO';

import {
  Container,
  Header,
  CarImages,
  Description,
  Rent,
  Details,
  Brand,
  Name,
  Period,
  Price,
  About,
  Accessories,
  Footer,
  OfflineInfo,
} from './styles';
import { getCarUpdate } from '../../services/CarService';

export function CarDetails() {
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

  const netInfo = useNetInfo();
  const { navigate, goBack } = useNavigation();
  const route = useRoute();
  const { car } = route.params as CarDetailsScreenProps;

  const theme = useTheme();

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => ({
    height: interpolate(scrollY.value, [0, 200], [200, 70], Extrapolate.CLAMP),
  }));

  const sliderCarsStyleAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 150], [1, 0]),
  }));

  function handleConfirmRental() {
    navigate('Scheduling', { car });
  }

  function handleBack() {
    goBack();
  }

  useEffect(() => {
    async function fetchCarUpdated() {
      try {
        const carUpdated = await getCarUpdate(car.id!);

        setCarUpdated(carUpdated);
      } catch (error) {
        console.log(error);
      }
    }

    if (netInfo.isConnected === true) {
      fetchCarUpdated();
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          { backgroundColor: theme.colors.background_secondary },
        ]}
      >
        <Header>
          <BackButton onPress={handleBack} />
        </Header>

        <Animated.View style={[sliderCarsStyleAnimation]}>
          <CarImages>
            <ImageSlider
              imagesUrl={
                !!carUpdated.photos
                  ? carUpdated.photos
                  : [{ id: car.thumbnail, photo: car.thumbnail }]
              }
            />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {netInfo.isConnected === true ? car.price : '...'}</Price>
          </Rent>
        </Details>

        {carUpdated.accessories && (
          <Accessories>
            {carUpdated.accessories?.map((accessory) => (
              <Acessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))}
          </Accessories>
        )}

        <About>{car.about}</About>
      </Animated.ScrollView>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
          enabled={netInfo.isConnected === true}
        />

        {netInfo.isConnected === false && (
          <OfflineInfo>
            Conecte-se a internet para ver mais detalhes e agendar seu carro.
          </OfflineInfo>
        )}
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  },
});
