import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { QueryBuilderService } from 'src/query-builder/query-builder.service';
import { MongoRepository } from 'typeorm';
import { UserPassedCourse } from './entities/user-passed-course.entity';

@Injectable()
export class UserPassedCoursesService extends BaseService<UserPassedCourse> {
  constructor(
    @InjectRepository(UserPassedCourse) private userPassedCourseRepo: MongoRepository<UserPassedCourse>,
    private readonly userPassedCourseQueryBuilder: QueryBuilderService<UserPassedCourse>
  ) {
    super(userPassedCourseRepo,userPassedCourseQueryBuilder)
  }

}
