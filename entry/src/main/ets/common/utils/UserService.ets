import { GlobalContext } from '../../viewmodel/GlobalContext';
import { http } from '@kit.NetworkKit';

import {httpResult,registerResult,UserDto, GetInfoParams} from './HTTP';

export interface UserObj {
  id: number,
  username: string;
  role: string;
  imgURL: string;
  createTime: string;
  followList: number[];
  fansList: number[];
  likeNewsList: number[];
  collectNewsList: number[];
  createNewsList: number[];
  likeCommentList: number[];
  createCommentList: number[];
}



/**
 * Fetches the user profile using HTTP POST request.
 * @returns A promise that resolves with the user profile data.
 */


export  async function fetchUserProfile(): Promise<UserObj> {
  const userId : string | undefined = GlobalContext.getContext().getObject('id')?.toString(); // 获取用户 ID
  console.error(userId)
  let id = 0;
  if (userId) {
    id = parseInt(userId);
  }
  const user: GetInfoParams = {
    id: id,
    username: "123",
    role: "hhh",
    imgURL: "",
    createTime: "2024-12-11",
    followList: [],
    fansList: [],
    likeNewsList: [],
    collectNewsList: [],
    createNewsList: [],
    likeCommentList: [],
    createCommentList: []
  };
  const url = 'https://192.168.1.22:8080/api/users/info'; // TODO
  const httpRequest = http.createHttp();
  console.error("hhhhhhhh")
  const response = await httpRequest.request(url, {
    method: http.RequestMethod.POST,
    header: {
      'Content-Type': 'application/json',
      /*Authorization: `Bearer ${GlobalContext.getContext().getObject('authToken')}`,*/
    },
    extraData: JSON.stringify(user),
    connectTimeout: 5000,
    readTimeout: 5000,
  });
  if (response.responseCode != 200) {
    console.error('HTTP Error:', response.responseCode, response.result);
    throw new Error('Failed to fetch user profile');
  }
  try {
    if (typeof response.result !== 'string') {
      throw new Error('Invalid response format: result is not a string');
    }

    // 解析 JSON 数据
    const result: httpResult = JSON.parse(response.result);

    if (result.code != "000") {
      throw new Error(result.msg || 'Server error occurred.');
    }
    return result.result;
  } catch (error) {
    console.error('Error parsing user profile data:', error);
    throw new Error('Invalid response format.');
  }
}


export async  function loginService(username: string, password: string): Promise<void> {
  // 构建请求体
  const userDto: UserDto = {
    username: username,
    password: password,
  };
  const url = 'http://192.168.1.22:8080/api/users/login'; // TODO

  const httpRequest = http.createHttp();
  return await httpRequest.request(url, {
    method: http.RequestMethod.POST,
    header: {
      'Content-Type': 'application/json',
    },
    extraData: JSON.stringify(userDto),
    connectTimeout: 5000,
    readTimeout: 5000,
  }).then((response) => {
    if (response.responseCode != 200) {
      throw new Error('Login failed');
    }

    const result : httpResult = JSON.parse(response.result as string);
    if (result.code != "000") {

      throw new Error(result.msg || 'Login failed');
    }

    // 假设需要保存用户信息到全局上下文//这里有问题
    console.error(JSON.stringify(result.result));
    GlobalContext.getContext().setObject('id', result.result.id.toString());
    GlobalContext.getContext().setObject('user', JSON.stringify(result.result));
  });
}

@Concurrent
export async  function registerService(username: string, password: string): Promise<void> {
  // 构建请求体
  const userDto: UserDto = {
    username: username,
    password: password,
  };
  const url = 'http://192.168.1.22:8080/api/users/register'; // TODO

  const httpRequest = http.createHttp();
  return  await httpRequest.request(url, {
    method: http.RequestMethod.POST,
    header: {
      'Content-Type': 'application/json',
    },
    extraData: JSON.stringify(userDto),
    connectTimeout: 5000,
    readTimeout: 5000,
  }).then((response) => {
     if (response.responseCode != 200) {
       throw new Error('Registration failed');
     }

     const result : registerResult = JSON.parse(response.result as string);
     if (result.code != "000") {
       throw new Error(result.msg || 'Registration failed');
     }
  });
}





