import { AuthenticatedUser } from '@auth/interface/dto';

export interface RequestWithUser extends Request {
  user: AuthenticatedUser;
}
