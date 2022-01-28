import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Injectable()
export class UtilService {
  private host: string;
  constructor(private configService: ConfigService) {
    this.host = this.configService.get<string>('app.siteUrl');
  }

  async parsePerfixImageWithHost(
    str: string,
    path: string = join('/', 'public'),
  ): Promise<string> {
    if (!str || str === undefined || str === 'undefined') {
      return this.host + join('/', 'common', 'no-image.png');
    }
    if (validURL(str)) return str;
    const param = str[0] === '/' ? str : '/' + str;
    return this.host + path + param;
  }
}

export const validURL = (str: string): boolean => {
  const regex =
    /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\\/]))?/;
  return regex.test(str);
};
