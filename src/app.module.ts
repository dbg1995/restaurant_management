import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core.module';
import { RestaurantModule } from './restaurants/restaurant.module';

@Module({
  imports: [TypeOrmModule.forRoot(), RestaurantModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
