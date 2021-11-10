import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

interface ICarModel {
  id?: string;
  name: string;
  brand: string;
  about: string;
  fuel_type: string;
  period: string;
  price: number;
  thumbnail: string;
}

class Car extends Model {
  static table = 'cars';

  @field('name')
  name!: string;

  @field('brand')
  brand!: string;

  @field('about')
  about!: string;

  @field('fuel_type')
  fuel_type!: string;

  @field('period')
  period!: string;

  @field('price')
  price!: number;

  @field('thumbnail')
  thumbnail!: string;
}

export { ICarModel, Car };
