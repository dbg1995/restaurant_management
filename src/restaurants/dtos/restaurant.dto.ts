import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude, Type, Transform } from 'class-transformer';
import { CategoryDTO } from 'src/categories/dtos/category.dto';
import { Default } from 'src/common/decorators/default.decorator';

import { BaseDTO } from 'src/common/dtos/base.dto';

@Exclude()
export class RestaurantDTO extends BaseDTO {
  @Expose()
  @ApiProperty()
  readonly name: string;

  @Expose()
  @ApiProperty()
  readonly address: string;

  @Expose()
  @ApiProperty()
  readonly description: string;

  @Expose()
  @ApiProperty({ type: CategoryDTO, isArray: true })
  @Type(() => CategoryDTO)
  @Transform(({ obj }) => {
    if (obj?.restaurantCategories?.length) {
      const categories = [];
      for (const restaurantCategory of obj.restaurantCategories) {
        categories.push(restaurantCategory.category);
      }

      return categories;
    }
  })
  @Default([])
  readonly categories: CategoryDTO[];
}
