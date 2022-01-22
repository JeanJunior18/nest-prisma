import { Pagination } from '@ports/utils';
import { User } from '@user/domain/user.entity';
import {
  CreateUserDto,
  QueryParamsUserDto,
  UpdateUserDto,
} from '@user/interface/dto';

export abstract class UserRepositoryPort {
  create: (data: CreateUserDto) => Promise<User>;
  update: (id: string, data: UpdateUserDto) => Promise<User>;
  findById: (id: string) => Promise<User>;
  findByEmail: (email: string) => Promise<User>;
  findAll: (query: QueryParamsUserDto) => Promise<Pagination<User>>;
  delete: (id: string) => Promise<void>;
  hardDelete: (id: string) => Promise<void>;
}
