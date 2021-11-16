import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RestaurantEntity } from './restaurant.entity';
import { RestaurantController } from 'src/restaurants/restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { CategoryEntity } from 'src/categories/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantEntity, CategoryEntity])],
  controllers: [RestaurantController],
  providers: [RestaurantService],
  exports: [RestaurantService],
})
export class RestaurantModule {}
