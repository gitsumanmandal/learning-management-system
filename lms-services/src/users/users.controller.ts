import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectId } from 'mongodb';
import { AuthGuard } from 'src/auth/auth.guard';
import { Public } from 'src/base/public.decorator';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';

@ApiTags('Users')
@UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Public()
  @Post()
  @ApiOperation({ description: 'No Auth required. Create a ADMIN / TEACHER / STUDENT user' })
  @ApiBody({ type: CreateUserDto })
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiBearerAuth('Bearer')
  @Get()
  @Roles(['ADMIN'])
  @ApiOperation({ description: 'Only ADMIN can view all students data. So to proceed,, use a ADMIN login and it\'s token' })
  findAll() {
    return this.usersService.findAll();
  }

  @ApiBearerAuth('Bearer')
  @Get('profile')
  @ApiOperation({ description: 'Results current profile data' })
  profile(@Request() req: any) {
    return this.usersService.profile(req);
  }

  @ApiBearerAuth('Bearer')
  @ApiParam({ name: 'id', type: 'string', required: true })
  @Get(':id')
  @Roles(['ADMIN'])
  @ApiOperation({ description: 'Only ADMIN can view a specific student details. So to proceed,, use a ADMIN login and it\'s token' })
  findOne(@Param('id') id: ObjectId) {
    return this.usersService.findOne(id);
  }

  @ApiBearerAuth('Bearer')
  @ApiParam({ name: 'id', type: 'string', required: true })
  @ApiBody({ type: UpdateUserDto })
  @Patch(':id')
  @ApiOperation({ description: 'Update a user details' })
  update(
    @Param('id') id: ObjectId,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiBearerAuth('Bearer')
  @ApiParam({ name: 'id', type: 'string', required: true })
  @Delete(':id')
  @Roles(['ADMIN'])
  @ApiOperation({ description: 'Only ADMIN can remove a specific student details. So to proceed,, use a ADMIN login and it\'s token' })
  remove(@Param('id') id: ObjectId) {
    return this.usersService.remove(id);
  }
}
