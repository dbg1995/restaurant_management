import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, EntityManager, Repository, Transaction } from 'typeorm';

import { PagyService } from 'src/pagy/pagy.service';
import { ReqPagyDTO } from 'src/pagy/dtos/req-pagy.dto';
import { Pagy } from 'src/pagy/pagy.type';

import { CreateRestaurantDTO } from './dtos/create-restaurant.dto';
import { RestaurantEntity } from './restaurant.entity';
import { CategoryEntity } from 'src/categories/category.entity';
import { RestaurantCategoryEntity } from 'src/restaurant_categories/restaurant_category.entity';
import { UpdateRestaurantDTO } from './dtos/update-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    private connection: Connection,
    @InjectRepository(RestaurantEntity)
    private restaurantRepo: Repository<RestaurantEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
    private pagyService: PagyService<RestaurantEntity>,
  ) {}

  async findMany(reqPagyDTO: ReqPagyDTO): Promise<Pagy<RestaurantEntity>> {
    const queryBuilder = await this.restaurantRepo
      .createQueryBuilder()
      .leftJoinAndSelect(
        'RestaurantEntity.restaurantCategories',
        'RestaurantCategoryEntity',
      )
      .leftJoinAndSelect('RestaurantCategoryEntity.category', 'CategoryEntity');
    return await this.pagyService.paginate(reqPagyDTO, queryBuilder);
  }

  async create(
    createRestaurantDTO: CreateRestaurantDTO,
  ): Promise<RestaurantEntity> {
    const restaurant = this.restaurantRepo.create(createRestaurantDTO);
    let categories: CategoryEntity[] = [];
    if (createRestaurantDTO.categoryIds?.length) {
      categories = await this.categoryRepo.findByIds(
        createRestaurantDTO.categoryIds,
      );
    }
    await this.restaurantRepo.save(restaurant);

    await this.connection.transaction(async (manager: EntityManager) => {
      await manager.save(restaurant);
      if (categories.length) {
        const restaurantCategories = categories.map((category) => {
          return {
            restaurantId: restaurant.id,
            categoryId: category.id,
          };
        });

        await manager.save(RestaurantCategoryEntity, restaurantCategories);
      }
    });

    return restaurant;
  }

  async update(
    id: string,
    updateRestaurantDTO: UpdateRestaurantDTO,
  ): Promise<RestaurantEntity> {
    const restaurant = await this.restaurantRepo.findOneOrFail(id);
    let categories: CategoryEntity[] = [];
    if (updateRestaurantDTO.categoryIds?.length) {
      categories = await this.categoryRepo.findByIds(
        updateRestaurantDTO.categoryIds,
      );
    }

    await this.connection.transaction(async (manager: EntityManager) => {
      await manager.update(RestaurantEntity, id, {
        name: updateRestaurantDTO.name,
        address: updateRestaurantDTO.address,
        description: updateRestaurantDTO.description,
      });
      await manager.delete(RestaurantCategoryEntity, {
        restaurantId: restaurant.id,
      });
      if (categories.length) {
        const restaurantCategories = categories.map((category) => {
          return {
            restaurantId: restaurant.id,
            categoryId: category.id,
          };
        });

        await manager.save(RestaurantCategoryEntity, restaurantCategories);
      }
    });

    return this.restaurantRepo.findOneOrFail(id);
  }
}
