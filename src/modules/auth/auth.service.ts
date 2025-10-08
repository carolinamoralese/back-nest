import { Injectable, UnauthorizedException } from '@nestjs/common';
import { loginDTO } from 'src/dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async login(data: loginDTO) {
    const user = await this.userRepo.findOne({ where: { email: data.email } });
    if (!user) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    const isPasswordValid = data.password === user.password;

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    return {
      user: { id: user.id, name: user.name, email: user.email, age: user.age },
      accesToker: `fake-toke ${user.id}-${Date.now()}`,
    };
  }
}
