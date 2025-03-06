import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ExternalUserDataService } from '../external-services/external-user-data.service';

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

  constructor(
    @Inject('EXTERNAL_USER_DATA_SERVICE')
    private externalUserDataService: ExternalUserDataService,
  ) {}

  async findAll(): Promise<User[]> {
    const externalUsers = await this.externalUserDataService.fetchUsers();
    return [...this.users, ...externalUsers];
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
  x;
}
