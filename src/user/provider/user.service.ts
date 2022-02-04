import { Injectable } from '@nestjs/common';
import { DbService } from '../../shared/services/db/db.service';
import { UserDto } from '../dto/user.dto';
import { BcryptService } from '../../shared/services/bcrypt/bcrypt.service';

@Injectable()
export class UserService {
  constructor(
    private readonly db: DbService,
    private readonly bcryptService: BcryptService,
  ) {}

  async getAll() {
    return this.db.getAllUsers();
  }

  async createUser(user: UserDto) {
    const newUser = this.db.addNewUser({
      email: user.email,
      password: await this.bcryptService.encodePassword(user.password),
    });

    return newUser;
  }
}
