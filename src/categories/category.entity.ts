import { Entity, Column, OneToMany } from 'typeorm';

import { BaseEntity } from 'src/common/entities/base.entity';
import { SHORT_LENGTH } from 'src/common/constants/common.constant';
import { RestaurantCategoryEntity } from 'src/restaurant_categories/restaurant_category.entity';

@Entity('categories')
export class CategoryEntity extends BaseEntity {
  @OneToMany(
    () => RestaurantCategoryEntity,
    (restaurantCategory) => restaurantCategory.category,
  )
  restaurantCategories: RestaurantCategoryEntity[];

  @Column({ type: 'varchar', length: SHORT_LENGTH, unique: true })
  name: string;
}
