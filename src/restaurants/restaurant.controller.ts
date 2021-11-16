import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

import { ReqPagyDTO } from 'src/pagy/dtos/req-pagy.dto';
import { CreateRestaurantDTO } from './dtos/create-restaurant.dto';
import { RestaurantDTO } from './dtos/restaurant.dto';
import { RestaurantsDTO } from './dtos/restaurants.dto';

import { RestaurantService } from './restaurant.service';

@ApiTags('restaurants')
@Controller('api/restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  @ApiParam({ name: 'page', required: false, type: 'int' })
  @ApiParam({ name: 'count', required: false, type: 'int' })
  @ApiOkResponse({ type: RestaurantDTO, isArray: true })
  async index(@Query() reqPagyDTO: ReqPagyDTO): Promise<RestaurantsDTO> {
    const [restaurants, pagyInfo] = await this.restaurantService.findMany(
      reqPagyDTO,
    );
    return plainToClass(RestaurantsDTO, { restaurants, pagyInfo });
  }

  @Post()
  @ApiOkResponse({ type: RestaurantDTO })
  async create(
    @Body() createRestaurantDTO: CreateRestaurantDTO,
  ): Promise<RestaurantDTO> {
    const restaurant = await this.restaurantService.create(createRestaurantDTO);

    return plainToClass(RestaurantDTO, restaurant);
  }

  @Patch(':id')
  @ApiOkResponse({ type: RestaurantDTO })
  async update(
    @Param('id') id: string,
    @Body() createRestaurantDTO: CreateRestaurantDTO,
  ): Promise<RestaurantDTO> {
    const restaurant = await this.restaurantService.update(
      id,
      createRestaurantDTO,
    );

    return plainToClass(RestaurantDTO, restaurant);
  }
}
