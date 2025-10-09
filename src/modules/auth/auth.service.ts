import { Injectable, UnauthorizedException } from '@nestjs/common';
import { loginDTO } from 'src/dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from 'src/dto/create-users.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(data: CreateUserDTO) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userCreated = this.userRepo.create({
      ...data,
      password: hashedPassword,
    });
    await this.userRepo.save(userCreated);
    return {
      message: 'Usuario creado con exito',
      user: { id: userCreated.id, email: userCreated.email },
    };
  }

  async login(data: loginDTO) {
    const user = await this.userRepo.findOne({ where: { email: data.email } });
    if (!user) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    const payloadToken = {
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
    };

    const token = await this.jwtService.signAsync(payloadToken);

    return {
      user: { sub: user.id, name: user.name, email: user.email, age: user.age },
      accesToker: token,
    };
  }
}
