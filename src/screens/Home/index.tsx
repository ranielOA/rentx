import React, { useEffect, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import { Container, Header, TotalCars, HeaderContent, CarList } from './styles';

import { CarDTO } from '../../dtos/CarDTO';
import { getCars } from '../../services/CarService';

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const netInfo = useNetInfo();
  const { navigate } = useNavigation();

  const handleCarDetails = (car: CarDTO) => () => {
    navigate('CarDetails', { car });
  };

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const cars = await getCars();

        if (isMounted) {
          setCars(cars);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCars();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (netInfo.isConnected) {
      Alert.alert('Você está On-Line');
    } else {
      Alert.alert('Você está Off-Line');
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Car data={item} onPress={handleCarDetails(item)} />}
        />
      )}
    </Container>
  );
}
