import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto) {
    //verificamos se o id já existe, se não, atribuimos 0 a ele.
    const currentMaxId = this.users[this.users.length - 1]?.id || 0;

    //atribuimos ao campo id a logica
    const id = currentMaxId + 1;

    //criamos o obj
    const user = {
      id,
      ...createUserDto,
    };

    this.users.push(user);
    return user;
  }

  //retorna todod os dados
  findAll() {
    return this.users;
  }

  //retornamos apenas um usuario
  findOne(id: number) {
    const index = this.users.findIndex((user) => user.id === id);

    return this.users[index];
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);

    const newUser = {
      ...user,
      ...updateUserDto,
    };

    const index = this.users.findIndex((user) => user.id === id);

    this.users[index] = newUser;

    return newUser;
  }

  remove(id: number) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not  found.`);
    }
    this.users.splice(index, 1);

    return;
  }
}
