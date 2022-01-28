import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
  Query,
  ParseIntPipe,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SERIALIZE_GROUP } from '../../database/common/enum/serialization-group.enum';
import { SearchQueryStringDto } from '../../shared/dto/paginationQueryString.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RoleEntity } from '../../database/entities/role.entity';
import { plainToClass } from 'class-transformer';
import { ENUMErrorMessages } from '../../shared/enum/error-message.enum';
import { Roles } from '../../shared/decorator/roles.decorator';
import { ENUMUserType } from '../../shared/enum/user.enum';
import { PaginationResponse } from '../../shared/interface/pagination-response.interface';

@Controller('v1/role')
@ApiTags('role')
@UseGuards(JwtAuthGuard)
@Roles(ENUMUserType.ADMIN, ENUMUserType.SUPER_ADMIN)
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @SerializeOptions({
    groups: [SERIALIZE_GROUP.GROUP_ALL_ROLE],
  })
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.createRole(createRoleDto);
  }

  @Get()
  async findAll(@Query() qs: SearchQueryStringDto) {
    const [_role, cnt] = await this.roleService.findAndCount({
      where: (qb) => {
        qb.where('"isDelete" = :isDelete', { isDelete: false });
        if (qs.search) {
          qb.andWhere('"name" ILike :name', { name: `%${qs.search.trim()}%` });
        }
      },
      order: { id: qs.orderby },
      take: qs.limit,
      skip: qs.limit * (qs.page - 1),
    });

    const resp: PaginationResponse = {
      item: plainToClass(RoleEntity, _role, {
        groups: [SERIALIZE_GROUP.GROUP_ALL_ROLE],
        strategy: 'excludeAll',
      }),
      total: cnt,
      perpage: qs.limit,
      page: qs.page,
      totalPage: Math.ceil(cnt / qs.limit),
    };
    return resp;
  }

  @Get(':id')
  @SerializeOptions({
    groups: [SERIALIZE_GROUP.GROUP_ALL_ROLE],
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const _role = await this.roleService.findAll({
      where: { id: id, isDelete: false },
    });
    if (_role.length < 1) {
      throw new NotFoundException(ENUMErrorMessages.NOTFOUND_ROLE);
    }
    return _role;
  }

  @Put(':id')
  @SerializeOptions({
    groups: [SERIALIZE_GROUP.GROUP_ALL_ROLE],
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    const _role = await this.roleService.findOne({
      where: { id: id, isDelete: false },
    });
    if (!_role) {
      throw new NotFoundException(ENUMErrorMessages.NOTFOUND_ROLE);
    }
    return await this.roleService.updateRole(id, updateRoleDto);
  }

  @Delete(':id')
  @SerializeOptions({
    groups: [SERIALIZE_GROUP.GROUP_ALL_ROLE],
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.roleService.softDelete({ id: id });
  }
}
