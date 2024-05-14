import { Exclude } from 'class-transformer';

export class DefaultFields {
  @Exclude()
  id: string;
  @Exclude()
  uuid: string;
  @Exclude()
  createdAt: string;
  @Exclude()
  isDeleted: boolean;
}
