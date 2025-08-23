import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { UserBookmarkedCourse } from './entities/user-bookmarked-course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { QueryBuilderService } from 'src/query-builder/query-builder.service';
import { CourseService } from 'src/course/course.service';
import { Course } from 'src/course/entities/course.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserBookmarkedCoursesService extends BaseService<UserBookmarkedCourse> {
  constructor(
    @InjectRepository(UserBookmarkedCourse) private userBookmarkedCourseRepo: MongoRepository<UserBookmarkedCourse>,
    private readonly userBookmarkedCourse: QueryBuilderService<UserBookmarkedCourse>,
    private readonly courseService: CourseService
  ) {
    super(userBookmarkedCourseRepo,userBookmarkedCourse)
  }

  async findForUser(id : string) : Promise<{id:ObjectId,course:Course}[]> {
    const coursesInfo : UserBookmarkedCourse[] = await this.userBookmarkedCourseRepo.find({where:{userId:new ObjectId(id)},select:['id','courseId']});
    const courses : {id:ObjectId,course:Course}[] = [];
    for(const courseInfo of coursesInfo) {
      const course = await this.courseService.findOne(courseInfo.courseId) as Course;
      courses.push({id: courseInfo.id,course});
    }
    return courses;
  }

}
