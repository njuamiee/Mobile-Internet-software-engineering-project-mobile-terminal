import NewsTypeBean from "@bundle:com.example.newsrelease/entry/ets/viewmodel/NewsTypeModel";
import type ResponseResult from './ResponseResult';
import Constants from "@bundle:com.example.newsrelease/entry/ets/common/constants/Constants";
import { httpRequestGet } from "@bundle:com.example.newsrelease/entry/ets/common/utils/HttpUtil";
const DEFAULT_NEWS_TYPES: NewsTypeBean[] = [
    new NewsTypeBean(0, { "id": 16777240, "type": 10003, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" }),
    new NewsTypeBean(1, { "id": 16777241, "type": 10003, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" }),
    new NewsTypeBean(2, { "id": 16777243, "type": 10003, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" }),
    new NewsTypeBean(3, { "id": 16777242, "type": 10003, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" }),
    new NewsTypeBean(4, { "id": 16777244, "type": 10003, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" }),
    new NewsTypeBean(5, { "id": 16777246, "type": 10003, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" }),
    new NewsTypeBean(6, { "id": 16777245, "type": 10003, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" })
];
class NewsTypeViewModel {
    /**
     * Get news type list from server.
     *
     * @return NewsTypeBean[] newsTypeList
     */
    getNewsTypeList(): Promise<NewsTypeBean[]> {
        return new Promise((resolve: Function) => {
            let url = `${Constants.SERVER}/${Constants.GET_NEWS_TYPE}`;
            httpRequestGet(url).then((data: ResponseResult) => {
                if (data.code === Constants.SERVER_CODE_SUCCESS) {
                    resolve(data.data);
                }
                else {
                    resolve(DEFAULT_NEWS_TYPES);
                }
            }).catch(() => {
                resolve(DEFAULT_NEWS_TYPES);
            });
        });
    }
    /**
     * Get default news type list.
     *
     * @return NewsTypeBean[] newsTypeList
     */
    getDefaultTypeList(): NewsTypeBean[] {
        return DEFAULT_NEWS_TYPES;
    }
}
let newsTypeViewModel = new NewsTypeViewModel();
export default newsTypeViewModel as NewsTypeViewModel;
