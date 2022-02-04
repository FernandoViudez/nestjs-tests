import { Injectable } from '@nestjs/common';
import * as Bcrypt from 'bcrypt';
@Injectable()
export class BcryptService {
  async encodePassword(password: string) {
    const saltOrRounds = 10;
    return await Bcrypt.hash(password, saltOrRounds);
  }
}
