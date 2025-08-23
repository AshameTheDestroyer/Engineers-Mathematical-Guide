import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { QueryBuilderService } from 'src/query-builder/query-builder.service';
import { MongoRepository } from 'typeorm';
import { CoursesTag } from './entities/courses-tag.entity';
import { ObjectId } from 'mongodb';
import { Course } from 'src/course/entities/course.entity';
import { Tag } from 'src/tags/entities/tag.entity';

@Injectable()
export class CoursesTagsService extends BaseService<CoursesTag> {
  constructor(
    @InjectRepository(CoursesTag) private coursesTagRepo: MongoRepository<CoursesTag>,
    @InjectRepository(Course) private courseRepo: MongoRepository<Course>,
    @InjectRepository(Tag) private tagRepo: MongoRepository<Tag>,
    private readonly coursesTagQueryBuilder: QueryBuilderService<CoursesTag>
  ) {
    super(coursesTagRepo,coursesTagQueryBuilder)
  }

  async findForTag(tagId: string) : Promise<(CoursesTag&{course: Course})[]> {
    const coursesInfo : CoursesTag[] = await this.coursesTagRepo.find({where:{tagId}});
    const result : (CoursesTag&{course: Course})[] = [];

    for(const courseInfo of coursesInfo) {
      const doc = (await this.courseRepo.find({where:{_id: new ObjectId(courseInfo.courseId)},select:['id','title','description','enrollmentCount','averageRate']}))[0];
      result.push({course:doc,...courseInfo});
    }
    return result;
  }

  async findForCourse(courseId: string) : Promise<(CoursesTag&{tag: Tag})[]> {
    const coursesInfo : CoursesTag[] = await this.coursesTagRepo.find({where:{courseId}});
    const result : (CoursesTag&{tag: Tag})[] = [];

    for(const courseInfo of coursesInfo) {
      const doc = (await this.tagRepo.find({where:{_id: new ObjectId(courseInfo.tagId)}}))[0];
      result.push({tag:doc,...courseInfo});
    }
    return result;
  }

}
