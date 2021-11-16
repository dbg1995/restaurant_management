import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class ResPagyDTO {
  @Expose()
  readonly count;

  @Expose()
  readonly total;

  @Expose()
  readonly page;

  @Expose()
  readonly pageCount;
}
