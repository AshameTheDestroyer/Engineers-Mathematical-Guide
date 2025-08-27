import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { QueryBuilderService } from 'src/query-builder/query-builder.service';
import { DeepPartial, MongoRepository } from 'typeorm';
import { UserExam } from './entities/user-exam.entity';
import { FinishExamDto } from './dto/finish-exam.dto';
import { User } from 'src/user/entities/user.entity';
import { QuestionService } from 'src/question/question.service';
import { Question } from 'src/question/entities/question.entity';
import { ObjectId } from 'mongodb';
import { ChapterService } from 'src/chapter/chapter.service';
import { UserEnrolledCourse } from 'src/user-enrolled-courses/entities/user-enrolled-course.entity';
import { CourseService } from 'src/course/course.service';
import { Course } from 'src/course/entities/course.entity';
import { UserPassedCourse } from 'src/user-passed-courses/entities/user-passed-course.entity';
import { Chapter } from 'src/chapter/entities/chapter.entity';

@Injectable()
export class UserExamService extends BaseService<UserExam> {
  constructor(
    @InjectRepository(UserExam) private userExamRepo: MongoRepository<UserExam>,
    @InjectRepository(User) private userRepo: MongoRepository<User>,
    @InjectRepository(UserEnrolledCourse) private userEnrolledCourseRepo: MongoRepository<UserEnrolledCourse>,
    @InjectRepository(UserPassedCourse) private userPassedCourseRepo: MongoRepository<UserPassedCourse>,
    private readonly questionService: QuestionService,
    private readonly chapterService: ChapterService,
    private readonly courseService: CourseService,
    private readonly userExamQueryBuilder: QueryBuilderService<UserExam>
  ) {
    super(userExamRepo,userExamQueryBuilder)
  }

  async create(createDto: DeepPartial<UserExam>): Promise<UserExam> {
    const courseId : string = (await this.chapterService.findOne(createDto.chapterId as string)).courseId;
    const userCourseInfo : UserEnrolledCourse = (await this.userEnrolledCourseRepo.findOne({where:{userId:createDto.userId,courseId}})) as UserEnrolledCourse;
    if(!userCourseInfo?.canDoExam) throw new ConflictException("You Can Not Do The Exam");
    return await super.create(createDto);
  }

  async finishExam(examId: string, finishExamDto: FinishExamDto) : Promise<(UserExam&FinishExamDto)> {
    const exam : UserExam = await this.findOne(examId);
    const courseId : string = (await this.chapterService.findOne(exam.chapterId)).courseId;
    const examDuration : number = (await this.chapterService.findOne(exam.chapterId)).examDuration;
    let durationInMillisecond : number = examDuration * 60 * 1000;
    let endDate : number = exam.startDate.getTime() + durationInMillisecond;
    if (endDate < (new Date()).getTime()) {
      await this.remove(String(exam.id));
      throw new ConflictException('The Exam Has Been Finished, You Are So Late');
    }
    exam.finishDate = new Date();
    let correctAnswer : number = 0;
    let gainedXP : number = 0;
    let questionCnt : number = finishExamDto.result.length;
    let finalResult: FinishExamDto = {result:[]};
    for(const {questionId, answers} of finishExamDto.result) {
      const question : Question = await this.questionService.findOne(questionId);
      if(answers.length === question.answers.length) {
        let correct : boolean = true;
        for(const answer of answers) if(!question.answers.find(val => val==answer)) correct = false;
        if(correct) {
          correctAnswer++;
          gainedXP += question.XP;
        }
      }
      finalResult.result.push({questionId,answers:question.answers});
    }
    exam.grade = (correctAnswer/questionCnt) * 100;
    exam.XP = gainedXP;
    await this.userRepo.updateOne({_id: new ObjectId(exam.userId)},{$inc:{XP:gainedXP}});
    if(exam.grade >= 50) {
      const course: Course = await this.courseService.findOne(courseId);
      let info: UserEnrolledCourse = await this.userEnrolledCourseRepo.findOne({where:{userId: exam.userId,courseId}}) as UserEnrolledCourse;
      info.chapterNum++;
      info.lessonNum = 1;
      info.XP += gainedXP;
      info.lastStudied = new Date();
      info.canDoExam = false;
      if (info.chapterNum > course.chapters.length) {
        await this.userEnrolledCourseRepo.delete({id: new ObjectId(info.id)});
        await this.userPassedCourseRepo.save({userId:exam.userId,courseId,gradedDate: new Date()});
      }
      else {
        info.chapterId = course.chapters[info.chapterNum-1];
        const chapter: Chapter = await this.chapterService.findOne(info.chapterId);
        info.lessonId = chapter.lessons[0];
        await this.userEnrolledCourseRepo.update(info.id,info);
      }
    }
    else
      await this.userEnrolledCourseRepo.updateOne({userId: exam.userId,courseId},{$inc:{XP:gainedXP},$set:{lastStudied:new Date()}});
    await this.update(String(exam.id),exam);
    return {...exam,...finalResult};
  }

  async findExamsForUser(userId: string) : Promise<UserExam[]> {
    return await this.userExamRepo.find({where:{userId}});
  }
}
