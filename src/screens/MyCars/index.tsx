import React, { useState, useEffect } from 'react';
import { CarDTO } from '../../dtos/CarDTO';
import { SchedulesByUserDTO } from '../../dtos/SchedulesDTO';
import { api } from '../../services/api';

import { Container } from './styles';

export function MyCars() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

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

  return <Container></Container>;
}
