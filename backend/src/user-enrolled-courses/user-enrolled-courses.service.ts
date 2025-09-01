import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEnrolledCourse } from './entities/user-enrolled-course.entity';
import { QueryBuilderService } from 'src/query-builder/query-builder.service';
import { BaseService } from 'src/base/base.service';
import { DeepPartial, MongoRepository } from 'typeorm';
import { CourseService } from 'src/course/course.service';
import { Course } from 'src/course/entities/course.entity';
import { ObjectId } from 'mongodb';
import { CompleteLessonDto } from './dto/complete-lesson.dto';
import { ChapterService } from 'src/chapter/chapter.service';
import { Chapter } from 'src/chapter/entities/chapter.entity';
import { UserPassedCourse } from 'src/user-passed-courses/entities/user-passed-course.entity';

@Injectable()
export class UserEnrolledCoursesService extends BaseService<UserEnrolledCourse> {
  constructor(
    @InjectRepository(UserEnrolledCourse) private userEnrolledCourseRepo: MongoRepository<UserEnrolledCourse>,
    @InjectRepository(UserPassedCourse) private userPassedCourseRepo: MongoRepository<UserPassedCourse>,
    private readonly userEnrolledCourse: QueryBuilderService<UserEnrolledCourse>,
    private readonly courseService: CourseService,
    private readonly chapterService: ChapterService,
  ) {
    super(userEnrolledCourseRepo,userEnrolledCourse)
  }

  async create(createDto: DeepPartial<UserEnrolledCourse>): Promise<UserEnrolledCourse> {
    if(await this.userEnrolledCourseRepo.findOne({where:{userId:createDto.userId,courseId:createDto.courseId}}))
      throw new ConflictException("You are already enrolled in this course");
    if(await this.userPassedCourseRepo.findOne({where:{userId:createDto.userId,courseId:createDto.courseId}}))
      throw new ConflictException("You are already passed this course");
    const course: Course = await this.courseService.findOne(createDto.courseId as string);
    createDto.chapterId = course.chapters?.[0];
    const chapter: Chapter = await this.chapterService.findOne(createDto.chapterId||"68a82a954dd027b8dcb10273");
    createDto.lessonId = chapter.lessons[0];
    return await super.create(createDto);
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

  async findTop10Users(courseId: string) : Promise<UserEnrolledCourse[]> {
    return await this.userEnrolledCourseRepo.find({
      where:{ courseId },
      order:{ XP : 'DESC' },
      take:10
    });
  }

  async completeLesson(id: string, completeLessonDto: CompleteLessonDto) : Promise<UserEnrolledCourse> {
    let info: UserEnrolledCourse = await this.findOne(id);
    if(info.chapterNum != completeLessonDto.chapterNum || info.lessonNum != completeLessonDto.lessonNum)
      throw new ConflictException("The data are inconsistent.")
    const chapter: Chapter = await this.chapterService.findOne(info.chapterId);
    info.lessonNum++;
    if(info.lessonNum > chapter.lessons.length) {
      info.canDoExam = true;
    }
    else {
      info.lessonId = chapter.lessons[info.lessonNum-1];
    }
    return await this.update(id,info);
  }
}