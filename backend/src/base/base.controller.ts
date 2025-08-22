import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BaseService } from './base.service';
import { CreateBaseDto } from './dto/create-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto';

@Controller('base')
export class BaseController {}
