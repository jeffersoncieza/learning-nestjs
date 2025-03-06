import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post, UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { MockAuthGuard } from '../auth/mock-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post()
  @UseGuards(MockAuthGuard)
  create(@Body(new ValidationPipe()) dto: CreateUserDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @UseGuards(MockAuthGuard)
  update(
    @Body(new ValidationPipe()) dto: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.update({ ...dto, id });
  }
}
