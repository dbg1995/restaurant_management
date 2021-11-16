import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude } from 'class-transformer';

import { BaseDTO } from 'src/common/dtos/base.dto';

@Exclude()
export class CategoryDTO extends BaseDTO {
  @Expose()
  @ApiProperty()
  readonly name: string;
}
