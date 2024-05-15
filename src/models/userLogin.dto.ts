/* import { IsInt, IsOptional, IsString } from 'class-validator'; */

import { IsOptional } from "class-validator";

class UserLoginDto{
  @IsOptional()
  email: string;
  @IsOptional()
  password:string;
  admin?:boolean;
}

export default UserLoginDto;
