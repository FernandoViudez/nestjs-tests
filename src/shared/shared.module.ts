import { Module } from '@nestjs/common';
import { DbService } from './services/db/db.service';
import { BcryptService } from './services/bcrypt/bcrypt.service';

@Module({
  providers: [DbService, BcryptService],
  exports: [DbService, BcryptService],
})
export class SharedModule {}
