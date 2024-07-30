import { UserDto } from '../user/user-dto';

export class CommentRdo {
  public id!: string;
  public comment!: string;
  public date!: string;
  public rating!: number;
  public user!: UserDto;
}
