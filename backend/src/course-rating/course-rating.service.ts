import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { CourseRating } from './entities/course-rating.entity';
import { MongoRepository } from 'typeorm';
import { QueryBuilderService } from 'src/query-builder/query-builder.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { ObjectId } from 'mongodb';
import { Course } from 'src/course/entities/course.entity';

@Injectable()
export class CourseRatingService extends BaseService<CourseRating> {
  constructor(
    @InjectRepository(CourseRating) private courseRatingRepo: MongoRepository<CourseRating>,
    @InjectRepository(User) private userRepo: MongoRepository<User>,
    @InjectRepository(Course) private courseRepo: MongoRepository<Course>,
    private readonly courseRatingQueryBuilder: QueryBuilderService<CourseRating>
  ) {
    super(courseRatingRepo,courseRatingQueryBuilder)
  }

  async findForCourse(courseId: string) : Promise<(CourseRating&{user:User})[]> {
    const ratingInfo = await this.courseRatingRepo.find({where:{courseId}});
    const result : (CourseRating&{user:User})[] = [];
    for(const rating of ratingInfo) {
      const user: User = (await this.userRepo.find({where:{_id: new ObjectId(rating.userId)},select:['id','name','image','username','surname','streak','country','email']}))[0];
      result.push({...rating,user});
    }
    return result;
  }

  async findForUser(userId: string) : Promise<(CourseRating&{course:Course})[]> {
    const ratingInfo = await this.courseRatingRepo.find({where:{userId}});
    const result : (CourseRating&{course:Course})[] = [];
    for(const rating of ratingInfo) {
      const course: Course = (await this.courseRepo.find({where:{_id: new ObjectId(rating.courseId)},select:['id','title','averageRate','enrollmentCount']}))[0];
      result.push({...rating,course});
    }
    return result;
  }
}
