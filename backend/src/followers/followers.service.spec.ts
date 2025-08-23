import { Test, TestingModule } from '@nestjs/testing';
import { FollowersService } from './followers.service';

describe('FollowersService', () => {
  let service: FollowersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FollowersService],
    }).compile();

    service = module.get<FollowersService>(FollowersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
