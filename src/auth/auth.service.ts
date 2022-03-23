import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor() {}
  async validateUser(username: string, password: string): Promise<any> {
    // here you should find the user and validate the password
    const user = {
      uuid: '123',
      fullName: 'John Doe',
      username: 'admin',
      password: 'admin',
    };
    if (username === user.username && password === user.password) {
      return user;
    }
    // if (user && (await compareSync(password, user.password))) {
    //   return user;
    // }
    return null;
  }
}
