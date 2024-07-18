import {AuthUserDto} from '../user/dto/auth-user.dto.js';
import {UserEntity} from '../user/index.js';

export interface AuthService {
  authenticate(user: UserEntity): Promise<string>;
  verify(dto: AuthUserDto): Promise<UserEntity>;
}
