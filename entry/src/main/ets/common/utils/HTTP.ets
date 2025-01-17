import {UserObj} from './UserService';
export interface httpResult {
  code: string;
  msg: string;
  result: UserObj;

}
export interface UserDto {
  username: string;
  password: string;
}

export interface registerResult {
  code: string;
  msg: string;
  result: null;
}