import { Module } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { AchievementController } from './achievement.controller';

@Module({
  controllers: [AchievementController],
  providers: [AchievementService],
})
export class AchievementModule {}
