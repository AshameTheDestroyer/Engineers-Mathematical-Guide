import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { QueryBuilderService } from 'src/query-builder/query-builder.service';
import { DeepPartial, MongoRepository } from 'typeorm';
import { Course } from './entities/course.entity';
import { ObjectId } from 'mongodb';
import { join } from 'path';
import { existsSync, unlinkSync } from 'fs';

@Injectable()
export class CourseService extends BaseService<Course> {
  constructor(
    @InjectRepository(Course) private courseRepo: MongoRepository<Course>,
    private readonly courseQueryBuilder: QueryBuilderService<Course>
  ) {
    super(courseRepo,courseQueryBuilder)
  }

  private deleteFile(filePath: string): void {
    const fullPath = join(process.cwd(),'uploads', filePath);
    if (existsSync(fullPath)) {
      unlinkSync(fullPath);
    }
  }

  async update(id: string, updateDto: DeepPartial<Course>): Promise<Course> {
    if(updateDto.image) {
      const course = await this.findOne(id);
      if(course.image) {
        this.deleteFile(course.image);
      }
    }
    return await super.update(id,updateDto);
  }

  async remove(id: string): Promise<boolean> {
    const course = await this.findOne(id);
    if(course.image) {
      this.deleteFile(course.image);
    }
    return await super.remove(id);
  }

  async increaseEnrollmentCount(courseId: string) {
    await this.courseRepo.updateOne({_id: new ObjectId(courseId)},{$inc:{enrollmentCount:1}})
  }

  async addRating(courseId:string, newRate: number) {
    let course = await this.findOne(courseId);
    let ratingsSum = course.ratingsSum + newRate;
    let ratingsCount = course.ratingsCount + 1;
    let averageRate = ratingsSum / ratingsCount;
    let ratingsTotalNumber = course.ratingsTotalNumber + 1;
    await this.update(courseId,{ratingsSum,ratingsCount,averageRate,ratingsTotalNumber});
  }

  async changeRating(courseId:string, oldRate: number, newRate: number) {
    let course = await this.findOne(courseId);
    let ratingsSum = course.ratingsSum - oldRate + newRate;
    let ratingsCount = course.ratingsCount;
    let averageRate = ratingsSum / ratingsCount;
    await this.update(courseId,{ratingsSum,ratingsCount,averageRate});
  }
  
  async deleteRating(courseId:string, rate: number) {
    let course = await this.findOne(courseId);
    let ratingsSum = course.ratingsSum - rate;
    let ratingsCount = (course.ratingsCount - 1);
    let averageRate = ratingsSum / (ratingsCount||1);
    let ratingsTotalNumber = course.ratingsTotalNumber - 1;
    await this.update(courseId,{ratingsSum,ratingsCount,averageRate,ratingsTotalNumber});
  }
}
