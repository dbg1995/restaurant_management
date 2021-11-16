import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export abstract class BaseDTO {
  @Expose()
  @ApiProperty()
  readonly id: number;

  @Expose()
  @ApiProperty()
  readonly createdAt: Date;

  @Expose()
  @ApiProperty()
  readonly updatedAt: Date;
}
