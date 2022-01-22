import { Injectable, Logger, Provider } from '@nestjs/common';
import { PrismaService } from '@plugins/prisma';
import { UserRepositoryPort } from '@ports/repository';
import { Pagination } from '@ports/utils';
import { User } from '@user/domain/user.entity';
import { CreateUserDto, QueryParamsUserDto } from '@user/interface/dto';

@Injectable()
export class UserRepositoryAdapter implements UserRepositoryPort {
  private readonly logger = new Logger(UserRepositoryAdapter.name);

  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateUserDto): Promise<User> {
    this.logger.log(`Creating user with data: ${JSON.stringify(data)}`);
    return this.prisma.user.create({ data });
  }
  async findAll(query: QueryParamsUserDto): Promise<Pagination<User>> {
    this.logger.log(`Finding users with params: ${JSON.stringify(query)}`);

    const limit = +query?.limit || 10;
    const page = +query?.page || 1;
    const results = await this.prisma.user.findMany({
      take: limit,
      skip: (page - 1) * limit,
    });
    const total = await this.prisma.user.count();

    return new Pagination<User>(
      total,
      page,
      limit,
      Math.ceil(total / limit),
      results,
    );
  }
  findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email } });
  }
  findById(id: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }
  update(id: string, data: CreateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
  async delete(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
  async hardDelete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}

export const UserRepositoryProvider: Provider = {
  provide: UserRepositoryPort,
  useClass: UserRepositoryAdapter,
};
