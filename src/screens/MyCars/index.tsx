import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BackButton } from '../../components/BackButton';
import { CarDTO } from '../../dtos/CarDTO';
import { SchedulesByUserDTO } from '../../dtos/SchedulesDTO';
import { api } from '../../services/api';

import {
  Appointments,
  AppointmentsQuantity,
  AppointmentsTitle,
  Container,
  Content,
  Header,
  SubTitle,
  Title,
} from './styles';

import { useTheme } from 'styled-components';
import { Car } from '../../components/Car';

export function MyCars() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const { goBack } = useNavigation();
  const theme = useTheme();

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('schedules_byuser?user_id=1');
        const schedulesByUser: SchedulesByUserDTO[] = response.data;

        setCars(schedulesByUser.map((sc) => sc.car));
      } catch (error) {}
    }

    fetchCars();
  }, []);

  function handleBack() {
    goBack();
  }

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton onPress={handleBack} color={theme.colors.shape} />

        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <SubTitle>Conforto, segurança e praticidade</SubTitle>
      </Header>

      <Content>
        <Appointments>
          <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
          <AppointmentsQuantity>05</AppointmentsQuantity>
        </Appointments>

        <FlatList
          data={cars}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <Car data={item} />}
        />
      </Content>
    </Container>
  );
}
