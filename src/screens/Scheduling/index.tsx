import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { format } from 'date-fns';
import { useTheme } from 'styled-components';
import { getPlatformDate } from '../../utils/getPlatformDate';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  RootStackList,
  SchedulingScreenProps,
} from '../../routes/routesScreens';
import { useNavigation, useRoute } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import {
  Calendar,
  DayProps,
  generateInterval,
  MarkedDateProps,
} from '../../components/Calendar';

import ArrowSvg from '../../assets/arrow.svg';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';

type rootStackProps = NativeStackNavigationProp<RootStackList, 'Scheduling'>;

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const { navigate, goBack } = useNavigation<rootStackProps>();
  const theme = useTheme();
  const route = useRoute();
  const { car } = route.params as SchedulingScreenProps;

  function handleConfirmRental() {
    navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates),
    });
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(
        getPlatformDate(new Date(firstDate)),
        'dd/MM/yyyy'
      ),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    });
  }

  function handleBack() {
    goBack();
  }

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle={'light-content'}
          translucent
          backgroundColor="transparent"
        />

        <BackButton onPress={handleBack} color={theme.colors.shape} />

        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÈ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button
          enabled={!!rentalPeriod.endFormatted}
          title="Confirmar"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}
