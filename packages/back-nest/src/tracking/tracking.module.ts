import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackingEvent } from './entities/event.entity';
import { TrackingService } from './tracking.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrackingEvent])],
  controllers: [],
  providers: [TrackingService],
  exports: [TrackingService],
})
export class TrackingModule {}
