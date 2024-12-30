import type { NewsData } from './NewsData';
import type ResponseResult from './ResponseResult';
import Constants from "@bundle:com.example.newsrelease/entry/ets/common/constants/Constants";
import { httpRequestGet, httpRequestPost } from "@bundle:com.example.newsrelease/entry/ets/common/utils/HttpUtil";
import Logger from "@bundle:com.example.newsrelease/entry/ets/common/utils/Logger";
class NewsViewModel {
    /**
     * Get news type list from server.
     *
     * @return NewsData[] newsDataList
     */
    getNewsList(currentPage: number, pageSize: number): Promise<NewsData[]> {
        return new Promise(async (resolve: Function, reject: Function) => {
            let url = `${Constants.SERVER}/${Constants.GET_NEWS_LIST}`;
            url += '?currentPage=' + currentPage + '&pageSize=' + pageSize;
            httpRequestGet(url).then((data: ResponseResult) => {
                if (data.code === Constants.SERVER_CODE_SUCCESS) {
                    resolve(data.data);
                }
                else {
                    Logger.error('getNewsList failed', JSON.stringify(data));
                    reject({ "id": 16777226, "type": 10003, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
                }
            }).catch((err: Error) => {
                Logger.error('getNewsList failed', JSON.stringify(err));
                reject({ "id": 16777224, "type": 10003, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            });
        });
    }
    /**
     * Upload news data.
     *
     * @param newsData
     * @returns NewsData[] newsDataList
     */
    uploadNews(newsData: NewsData): Promise<NewsData[]> {
        return new Promise((resolve: Function, reject: Function) => {
            let url = `${Constants.SERVER}/${Constants.UPLOAD_NEWS}`;
            httpRequestPost(url, newsData).then((result: ResponseResult) => {
                if (result && result.code === Constants.SERVER_CODE_SUCCESS) {
                    resolve(result.data);
                }
                else {
                    reject({ "id": 16777248, "type": 10003, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
                }
            }).catch((err: Error) => {
                Logger.error('uploadNews failed', JSON.stringify(err));
                reject({ "id": 16777248, "type": 10003, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            });
        });
    }
}
let newsViewModel = new NewsViewModel();
export default newsViewModel as NewsViewModel;
