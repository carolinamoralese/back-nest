import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from 'src/dto/create-users.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}
  findAll() {
    return this.usersRepo.find();
  }
  async findOne(id: number) {
    const userFind = await this.usersRepo.findOne({ where: { id: id } });
    if (!userFind) throw new NotFoundException('usuario no encontrado');
    return userFind;
  }

  createUser(neewUser: CreateUserDTO) {
    const userCreate = this.usersRepo.create(neewUser);
    return this.usersRepo.save(userCreate);
  }

  async updateUser(id: number, updateUser: UpdateUserDTO) {
    const hashedPassword = await bcrypt.hash(updateUser.password, 10);
    await this.usersRepo.update(id, {
      ...updateUser,
      password: hashedPassword,
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.usersRepo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('usuario no encontrado');
    return { deleted: true };
  }
}
