import { httpRequestGet } from './HttpUtil';
import { GlobalContext } from '../../viewmodel/GlobalContext';

export interface UserObj {
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
 * Fetches the user profile using HTTP GET request.
 * @returns A promise that resolves with the user profile data.
 */
export async function fetchUserProfile(): Promise<UserObj> {
  const authToken = GlobalContext.getContext().getObject('authToken'); // 获取用户认证令牌

  // 添加 Authorization Header
  const url = 'https://your-backend-api.com/user/profile';
  const response = await httpRequestGet(url);

  if (Number(response.code) !== 200) {
    throw new Error('Failed to fetch user profile');
  }

  try {
    // 将 response.data 解析为 UserObj 类型
    const userProfile: UserObj = response.data as UserObj;
    return userProfile;
  } catch (error) {
    console.error('Error parsing user profile data:', error);
    throw new Error('Invalid response format.');
  }
}
