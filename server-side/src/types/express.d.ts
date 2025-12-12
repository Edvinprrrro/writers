import { UserDto } from "../modules/users/user.dto";

declare global {
  namespace Express {
    interface Request {
      user: UserDto;
    }
  }
}
