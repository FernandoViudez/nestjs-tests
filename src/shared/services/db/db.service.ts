import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto } from 'src/user/dto/user.dto';

@Injectable()
export class DbService {
  private users: UserDto[] = [];
  addNewUser(user: UserDto) {
    const userAlreadyExists = this.users.find(
      (_user) => _user.email == user.email,
    );

    if (!userAlreadyExists) {
      this.users.push(user);
      return user;
    } else {
      throw new BadRequestException();
    }
  }

  getAllUsers() {
    return this.users;
  }
}
