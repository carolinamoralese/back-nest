import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getStatus() {
    return {
      code: 200,
      time: new Date().toLocaleString(),
    };
  }
}
