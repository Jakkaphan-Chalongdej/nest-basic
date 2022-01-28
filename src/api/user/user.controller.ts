import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { SERIALIZE_GROUP } from '../../database/common/enum/serialization-group.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserEntity } from '../../database/entities/user.entity';
import { ENUMErrorMessages } from '../../shared/enum/error-message.enum';
import { PaginationResponse } from '../../shared/interface/pagination-response.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserInfo } from '../../shared/decorator/userinfo.decorator';
import { Roles } from '../../shared/decorator/roles.decorator';
import { ENUMUserType } from '../../shared/enum/user.enum';
import { UserQueryString } from './dto/user-service.dtoo';

@Controller('v1/user')
@ApiTags('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(ENUMUserType.ADMIN, ENUMUserType.SUPER_ADMIN)
  @SerializeOptions({
    groups: [SERIALIZE_GROUP.GROUP_ALL_USER],
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.createUser(createUserDto);
    return;
  }

  @Get()
  @Roles(ENUMUserType.ADMIN, ENUMUserType.SUPER_ADMIN)
  async findAll(@Query() qs: UserQueryString) {
    const [user, cnt] = await this.userService.findAndCount({
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          role: 'user.role',
        },
      },
      where: (qb) => {
        qb.where('user.isDelete = false');
        if (qs.name) {
          qb.andWhere('user.fullName ILIKE :name', {
            name: `%${qs.name.trim()}%`,
          });
        }
        if (qs.role) {
          qb.andWhere('role.id = :role', { role: qs.role });
        }
      },
      take: qs.limit,
      skip: qs.limit * (qs.page - 1),
    });
    const resp: PaginationResponse<UserEntity[]> = {
      item: plainToClass(UserEntity, user, {
        groups: [
          SERIALIZE_GROUP.GROUP_ALL_USER,
          SERIALIZE_GROUP.GROUP_ALL_ROLE,
        ],
        strategy: 'excludeAll',
      }),
      total: cnt,
      perpage: qs.limit,
      page: qs.page,
      totalPage: Math.ceil(cnt / qs.limit),
    };
    return resp;
  }

  @Get('profile')
  @SerializeOptions({
    groups: [SERIALIZE_GROUP.GROUP_ALL_USER],
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async userProfile(@UserInfo() userInfo: any) {
    const { username } = userInfo;
    const user = await this.userService.findOne({
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          role: 'user.role',
        },
      },
      where: { isDelete: false, username: username },
    });
    if (!user) {
      throw Error('Please login with user account');
    }
    return user;
  }

  @Put('profile')
  @SerializeOptions({
    groups: [SERIALIZE_GROUP.GROUP_USER_PROFILE],
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async updateProfile(
    @Body() updateUserDto: UpdateUserDto,

    @UserInfo() userInfo: any,
  ) {
    const { username } = userInfo;
    const user = await this.userService.findOne({
      where: { isDelete: false, username: username },
    });
    if (!user) {
      throw Error('Please login with user account');
    }
    return await this.userService.updateUser(user, updateUserDto);
  }

  @Get(':id')
  @Roles(ENUMUserType.ADMIN, ENUMUserType.SUPER_ADMIN)
  @SerializeOptions({
    groups: [SERIALIZE_GROUP.GROUP_ALL_USER],
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    const user = await this.userService.findOne({
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          role: 'user.role',
        },
      },
      where: {
        id: id,
        isDelete: false,
      },
    });
    if (!user) {
      throw new NotFoundException(ENUMErrorMessages.NOTFOUND_USER);
    }
    return user;
  }

  @Put(':id')
  @Roles(ENUMUserType.ADMIN, ENUMUserType.SUPER_ADMIN)
  @SerializeOptions({
    groups: [SERIALIZE_GROUP.GROUP_ALL_USER],
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.findOne({
      where: {
        id: id,
        isDelete: false,
      },
    });
    return await this.userService.updateUser(user, updateUserDto);
  }

  @Delete(':id')
  @Roles(ENUMUserType.ADMIN, ENUMUserType.SUPER_ADMIN)
  @SerializeOptions({
    groups: [SERIALIZE_GROUP.GROUP_ALL_USER],
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.userService.softDelete({ id: id });
  }
}
