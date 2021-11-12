import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { synchronize } from '@nozbe/watermelondb/sync';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import { Container, Header, TotalCars, HeaderContent, CarList } from './styles';

import { getCarsSync } from '../../services/CarService';
import { database } from '../../database';
import { sendUsersSync } from '../../services/UserService';
import { getAllCars } from '../../database/dao/CarDAO';
import { ICarModel } from '../../database/model/Car';
import { CarDTO } from '../../dtos/CarDTO';

export function Home() {
  const [cars, setCars] = useState<ICarModel[]>([]);
  const [loading, setLoading] = useState(true);

  const netInfo = useNetInfo();
  const { navigate } = useNavigation();

  const handleCarDetails = (car: CarDTO) => () => {
    navigate('CarDetails', { car });
  };

  async function offlineSynchronize() {
    try {
      await synchronize({
        database,
        pullChanges: async ({ lastPulledAt }) => {
          const { changes, latestVersion } = await getCarsSync(lastPulledAt);

          // console.log('BACKEND PARA O APP');
          // console.log(JSON.stringify(changes));
          // console.log(latestVersion);

          return { changes, timestamp: latestVersion };
        },
        pushChanges: async ({ changes }) => {
          // console.log('APP PARA O BACKEND');
          // console.log(JSON.stringify(changes));

          const user = changes.users;

          if (user.updated.length > 0) {
            await sendUsersSync(user);
          }
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const cars = await getAllCars();

        // console.log(cars);

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
    if (netInfo.isConnected === true) {
      offlineSynchronize();
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
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => <Car data={item} onPress={handleCarDetails(item)} />}
        />
      )}
    </Container>
  );
}
