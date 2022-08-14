import { Module } from '@nestjs/common';
import { ScrapService } from './scrap.service';

@Module({
  imports: [],
  providers: [ScrapService],
  exports: [ScrapService],
})
export class ScrapModule {}
