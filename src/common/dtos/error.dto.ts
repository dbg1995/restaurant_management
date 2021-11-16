import { Exclude, Expose, Type } from 'class-transformer';

import { Default } from '../decorators/default.decorator';

@Exclude()
export class ErrorDTO {
  @Expose()
  readonly code: number;

  @Expose()
  readonly message: string;

  @Expose()
  @Default(null)
  readonly property: string;

  @Expose()
  @Type(() => ErrorDTO)
  @Default([])
  readonly errors: ErrorDTO[];
}
