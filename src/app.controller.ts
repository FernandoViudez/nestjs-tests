import { Controller, Get } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Throttle(3, 60) // maximum 3 request per minute
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
