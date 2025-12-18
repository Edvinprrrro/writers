import { UserDto } from "../modules/users/user.dto";

declare global {
  namespace Express {
    interface Request {
      user?: UserDto;
      responseData?: {
        status: number;
        message?: string;
        location?: string;
      };
    }
  }
}
