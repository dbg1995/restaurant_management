import { Global, Module } from '@nestjs/common';
import { PagyModule } from './pagy/pagy.module';

@Global()
@Module({
  imports: [PagyModule],
  exports: [PagyModule],
})
export class CoreModule {}
