import { Exclude, Expose, Type } from 'class-transformer';

import { ResPagyDTO } from 'src/pagy/dtos/res-pagy.dto';

import { RestaurantDTO } from './restaurant.dto';

@Exclude()
export class RestaurantsDTO {
  @Expose()
  @Type(() => RestaurantDTO)
  readonly restaurants: RestaurantDTO[];

  @Expose()
  @Type(() => ResPagyDTO)
  readonly pagyInfo: ResPagyDTO;
}
