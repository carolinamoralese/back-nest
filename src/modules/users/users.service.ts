import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from '../../interface';

@Injectable()
export class UsersService {
  private users: IUser[] = [
    {
      id: 1,
      name: 'Caro',
      email: 'caromorales1396@gmail.com',
      password: '123456',
      age: 29,
    },
    {
      id: 2,
      name: 'Dani',
      email: 'Dani@gmail.com',
      password: '456',
    },
  ];
  findAll(): IUser[] {
    return this.users;
  }
  findOne(id: number): IUser {
    const userFind = this.users.find((user) => user.id === id);
    if (!userFind) throw new NotFoundException('usuario no encontrado');
    return userFind;
  }

  createUser(user: Omit<IUser, 'id'>): IUser {
    const newId =
      this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1;
    if (user.age && user.age >= 18) {
      const newUser: IUser = { id: newId, ...user };
      this.users.push(newUser);
      return newUser;
    }
    throw new BadRequestException('El usuario debe ser mayor de edad');
  }

  updateUser(id: number, newUser: Omit<IUser, 'id'>): IUser {
    const user = this.findOne(id);
    Object.assign(user, newUser);
    return user;
  }

  remove(id: number): { deleted: boolean } {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) throw new NotFoundException('Usuario no encontrado');
    this.users.splice(index, 1);
    return { deleted: true };
  }
}
