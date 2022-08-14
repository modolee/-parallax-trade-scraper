import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('_health_check')
  healthCheck(): string {
    return `I'm Healthy`;
  }
}
