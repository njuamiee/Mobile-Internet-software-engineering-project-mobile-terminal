/*
 *  Copyright (c) 2023 Huawei Device Co., Ltd.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { NewsData } from './NewsData';
import ResponseResult from './ResponseResult';
import Constants from '../common/constants/Constants';
import { httpRequestGet, httpRequestPost } from '../common/utils/HttpUtil';
import Logger from '../common/utils/Logger';
import { http } from '@kit.NetworkKit';
import { data } from '@kit.TelephonyKit';
import { httpNewResult } from '../common/utils/HTTP';

class NewsViewModel {
  /**
   * Get news type list from server.
   *
   * @return NewsData[] newsDataList
   */
  async getNewsList() {
    const url = 'http://192.168.1.6:8080/api/news/all'; // TODO

    const httpRequest = http.createHttp();
    try {
      const response = await httpRequest.request(url, {
        method: http.RequestMethod.GET,
        header: {
          'Content-Type': 'application/json',
        },
        connectTimeout: 5000,
        readTimeout: 5000,
      });

      // 确保响应是正确类型
      if (response.responseCode !== 200) {
        throw new Error('请求失败');
      }




        return response;

    } catch (error) {
      throw new Error(`请求异常: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  }

  async getNewsListType(str:string) {
    const url = 'http://192.168.1.6:8080/api/news/type/'+str; // TODO

    const httpRequest = http.createHttp();
    try {
      const response = await httpRequest.request(url, {
        method: http.RequestMethod.GET,
        header: {
          'Content-Type': 'application/json',
        },
        connectTimeout: 5000,
        readTimeout: 5000,
      });

      // 确保响应是正确类型
      if (response.responseCode !== 200) {
        throw new Error('请求失败');
      }




      return response;

    } catch (error) {
      throw new Error(`请求异常: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  }

  /**
   * Upload news data.
   *
   * @param newsData
   * @returns NewsData[] newsDataList
   */
  uploadNews(newsData: NewsData){
    const url = 'http://192.168.1.6:8080/api/news/create'; // TODO

    const httpRequest = http.createHttp();
    return httpRequest.request(url, {
      method: http.RequestMethod.POST,
      header: {
        'Content-Type': 'application/json',
      },
      extraData: JSON.stringify(newsData),
      connectTimeout: 5000,
      readTimeout: 5000,
    }).then((response) => {
      if (response.responseCode != 200) {
        throw new Error('Upload failed');
      }

    });
  }
}

let newsViewModel = new NewsViewModel();

export default newsViewModel as NewsViewModel;