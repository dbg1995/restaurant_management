import { Entity, ManyToOne, JoinColumn, Index, Column } from 'typeorm';

import { BaseEntity } from 'src/common/entities/base.entity';
import { RestaurantEntity } from 'src/restaurants/restaurant.entity';
import { CategoryEntity } from 'src/categories/category.entity';

@Entity('restaurant_categories')
@Index(['restaurantId', 'categoryId'], { unique: true })
export class RestaurantCategoryEntity extends BaseEntity {
  @ManyToOne(
    () => RestaurantEntity,
    (restaurant) => restaurant.restaurantCategories,
    { nullable: false },
  )
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: RestaurantEntity;

  @Column({ name: 'restaurant_id', nullable: false })
  restaurantId: number;

  @ManyToOne(
    () => CategoryEntity,
    (category) => category.restaurantCategories,
    { nullable: false },
  )
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @Column({ name: 'category_id', nullable: false })
  categoryId: number;
}
