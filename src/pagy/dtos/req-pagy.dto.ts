import { IsInt, Min, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiParam } from '@nestjs/swagger';

import {
  APP_DEFAULT_PAGY_COUNT,
  APP_DEFAULT_PAGY_PAGE,
} from 'src/common/constants/app.constant';

export class ReqPagyDTO {
  @IsOptional()
  @Transform((params) => parseInt(params['value']))
  @IsInt()
  @Min(1)
  readonly page = APP_DEFAULT_PAGY_PAGE;

  @IsOptional()
  @Transform((params) => parseInt(params['value']))
  @IsInt()
  @Min(1)
  readonly count = APP_DEFAULT_PAGY_COUNT;
}
