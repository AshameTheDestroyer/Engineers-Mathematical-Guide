import { Test, TestingModule } from '@nestjs/testing';
import { FollowersController } from './followers.controller';
import { FollowersService } from './followers.service';

describe('FollowersController', () => {
  let controller: FollowersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FollowersController],
      providers: [FollowersService],
    }).compile();

    controller = module.get<FollowersController>(FollowersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
