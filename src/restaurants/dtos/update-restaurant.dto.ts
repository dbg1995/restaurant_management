import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength, IsString } from 'class-validator';
import {
  LONG_LENGTH,
  SHORT_LENGTH,
} from 'src/common/constants/common.constant';

export class UpdateRestaurantDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(SHORT_LENGTH)
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(SHORT_LENGTH)
  readonly address: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(LONG_LENGTH)
  readonly description: string;

  @ApiProperty()
  @IsOptional()
  readonly categoryIds: string[];
}
