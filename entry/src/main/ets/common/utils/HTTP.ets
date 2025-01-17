import { NewsData } from '../../viewmodel/NewsData';
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

export interface httpNewResult {
  code: string;
  msg: string;
  result: NewsData[];

}

export interface GetInfoParams {
  id: number;
  username: string;
  role: string;
  imgURL: string;
  createTime: string;
  followList: never[];
  fansList: never[];
  likeNewsList: never[];
  collectNewsList: never[];
  createNewsList: never[];
  likeCommentList: never[];
  createCommentList: never[];
}