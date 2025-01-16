import { GlobalContext } from '../../viewmodel/GlobalContext';
import { http } from '@kit.NetworkKit';

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
interface httpResult {
  code: number;
  msg: string;
  data: UserObj;
}

interface registerResult {
  code: number;
  msg: string;
  data: null;
}

export async function fetchUserProfile(): Promise<UserObj> {
  const userId = GlobalContext.getContext().getObject('id'); // 获取用户 ID

  const url = 'https://your-backend-api.com/user/profile'; // TODO
  const httpRequest = http.createHttp();
  const response = await httpRequest.request(url, {
    method: http.RequestMethod.POST,
    header: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GlobalContext.getContext().getObject('authToken')}`,
    },
    extraData: {
      id: userId,
    },
    connectTimeout: 5000,
    readTimeout: 5000,
  });

  if (response.responseCode !== 200) {
    console.error('HTTP Error:', response.responseCode, response.result);
    throw new Error('Failed to fetch user profile');
  }

  try {
    if (typeof response.result !== 'string') {
      throw new Error('Invalid response format: result is not a string');
    }

    // 解析 JSON 数据
    const result: httpResult = JSON.parse(response.result);

    if (result.code !== 200) {
      throw new Error(result.msg || 'Server error occurred.');
    }

    return result.data;
  } catch (error) {
    console.error('Error parsing user profile data:', error);
    throw new Error('Invalid response format.');
  }
}

export function loginService(username: string, password: string): Promise<void> {
  const url = 'http://192.168.1.6:8080/api/users/login'; // TODO

  const httpRequest = http.createHttp();
  return httpRequest.request(url, {
    method: http.RequestMethod.POST,
    header: {
      'Content-Type': 'application/json',
    },
    extraData: {
      username: username,
      password: password,
    },
    connectTimeout: 5000,
    readTimeout: 5000,
  }).then((response) => {
    if (response.responseCode !== 200) {
      throw new Error('Login failed');
    }

    const result : httpResult = JSON.parse(response.result as string);
    if (result.code !== 200) {
      throw new Error(result.msg || 'Login failed');
    }

    // 假设需要保存用户信息到全局上下文
    GlobalContext.getContext().setObject('id', result.data.id);
  });
}

export function registerService(username: string, password: string): Promise<void> {
  interface UserDto {

    username: string;
    password: string;

  }

  // 构建请求体
  const userDto: UserDto = {


    username: username,
    password: password,
  };
  const url = 'http://192.168.1.6:8080/api/users/register'; // TODO

  const httpRequest = http.createHttp();
  return httpRequest.request(url, {
    method: http.RequestMethod.POST,
    header: {
      'Content-Type': 'application/json',
    },
    extraData: JSON.stringify(userDto),
    connectTimeout: 5000,
    readTimeout: 5000,
  }).then((response) => {
    if (response.responseCode !== 200) {
      throw new Error('Registration failed');
    }

    const result : registerResult = JSON.parse(response.result as string);
    if (result.code !== 200) {
      throw new Error(result.msg || 'Registration failed');
    }
  });
}
