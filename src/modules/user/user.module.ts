import { UserRepositoryProvider } from '@adapters/repositories/user.repository.adapter';
import { Module } from '@nestjs/common';
import { UserRestController } from '@user/interface/rest.controller';
import {
  CreateUserService,
  DeleteUserService,
  UpdateUserService,
} from '@user/useCases';

@Module({
  controllers: [UserRestController],
  providers: [
    UserRepositoryProvider,
    CreateUserService,
    UpdateUserService,
    DeleteUserService,
  ],
})
export class UserModule {}
