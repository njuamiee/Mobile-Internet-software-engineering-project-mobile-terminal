import {UserObj} from './UserService';
export interface httpResult {
  code: number;
  msg: string;
  data: UserObj;
}
export interface UserDto {
  username: string;
  password: string;
}

export interface registerResult {
  code: number;
  msg: string;
  data: null;
}