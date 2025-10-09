import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO } from 'src/dto/login.dto';
import { register } from 'module';
import { CreateUserDTO } from 'src/dto/create-users.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() data: CreateUserDTO) {
    return this.authService.register(data);
  }

  @Post('login')
  login(@Body() data: loginDTO) {
    return this.authService.login(data);
  }
}
