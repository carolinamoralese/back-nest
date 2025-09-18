import { Injectable, NotFoundException } from '@nestjs/common';

export type IUser = { id: number; name: string; email: string };

@Injectable()
export class UsersService {
  private users: IUser[] = [
    {
      id: 1,
      name: 'Caro',
      email: 'caromorales1396@gmail.com',
    },
    {
      id: 2,
      name: 'Dani',
      email: 'Dani@gmail.com',
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
  createUser(id: number, name: string, email: string): IUser {
    const newUser: IUser = { id, name, email };
    this.users.push(newUser);
    return newUser;
  }
}
