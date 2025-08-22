import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEnrolledCourse } from './entities/user-enrolled-course.entity';
import { QueryBuilderService } from 'src/query-builder/query-builder.service';
import { BaseService } from 'src/base/base.service';
import { MongoRepository } from 'typeorm';
import { CourseService } from 'src/course/course.service';
import { Course } from 'src/course/entities/course.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserEnrolledCoursesService extends BaseService<UserEnrolledCourse> {
  constructor(
    @InjectRepository(UserEnrolledCourse) private userEnrolledCourseRepo: MongoRepository<UserEnrolledCourse>,
    private readonly userEnrolledCourse: QueryBuilderService<UserEnrolledCourse>,
    private readonly courseService: CourseService
  ) {
    super(userEnrolledCourseRepo,userEnrolledCourse)
  }

  async findForUser(id : string) : Promise<(Partial<UserEnrolledCourse>&{course:Course}[])> {
    const coursesInfo : UserEnrolledCourse[] = await this.userEnrolledCourseRepo.find({where:{userId:new ObjectId(id)}});
    const courses : (Partial<UserEnrolledCourse>&{course:Course})[] = [];
    for(const courseInfo of coursesInfo) {
      const course = await this.courseService.findOne(courseInfo.courseId) as Course;
      courses.push({...courseInfo,course});
    }
    return courses;
  }
}