import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { UserController } from './controller/user.controller';
import { UserService } from './provider/user.service';

@Module({
  imports: [SharedModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
