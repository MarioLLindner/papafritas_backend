import { IsOptional } from "class-validator";
class UserLoginDto{
  userId:number;
  @IsOptional()
  email: string;
  @IsOptional()
  password:string;
  nombre?:string;
  admin?:boolean;
}

export default UserLoginDto;
