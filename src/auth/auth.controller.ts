import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { JWT_TYPE } from './enum/jwt.enum';
import { IRespLogin } from './interface/auth.interface';
import { IJwtPayload } from './interface/jwt.interface';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() signInDto: SignInDto) {
    const { username, password } = signInDto;
    const user = await this.authService.validateUser(username, password);
    if (!user) throw new UnauthorizedException();
    const payload: IJwtPayload = {
      uuid: user.uuid,
      role: user.role.name,
    };
    const acToken = this.jwtService.sign({
      ...payload,
      type: JWT_TYPE.AC_TOKEN,
    });

    const _resp: IRespLogin = {
      userInfo: {
        fullName: user.fullName,
        role: user.role.name,
      },
      accessToken: acToken,
    };
    return _resp;
  }
}
