import { Injectable } from '@nestjs/common';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'Jeff Cieza',
      email: 'jcieza90@gmail.com',
    },
    {
      id: 2,
      name: 'Luz Sanchez',
      email: 'luz92m@gmail.com',
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  create(user: CreateUserDto) {
    this.users.push({
      ...user,
      id: this.users.length + 1,
    });
  }

  update(user: UpdateUserDto & { id: number }) {
    const index = this.users.findIndex((u) => u.id === user.id);

    if (index === -1) {
      throw new Error('User not found');
    }

    this.users[index] = {
      name: user.name ?? this.users[index].name,
      email: user.email ?? this.users[index].email,
      id: this.users[index].id,
    };
  }
}
