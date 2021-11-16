import { Entity, Column, OneToMany } from 'typeorm';

import { BaseEntity } from 'src/common/entities/base.entity';
import { SHORT_LENGTH } from 'src/common/constants/common.constant';
import { RestaurantCategoryEntity } from 'src/restaurant_categories/restaurant_category.entity';
import { CategoryEntity } from 'src/categories/category.entity';

@Entity('restaurants')
export class RestaurantEntity extends BaseEntity {
  @OneToMany(
    () => RestaurantCategoryEntity,
    (restaurantCategory) => restaurantCategory.restaurant,
  )
  restaurantCategories: RestaurantCategoryEntity[];

  @Column({ type: 'varchar', length: SHORT_LENGTH })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: SHORT_LENGTH })
  address: string;

  categories: CategoryEntity[];
}
