import http from "@ohos:net.http";
import type { NewsData } from '../../viewmodel/NewsData';
import ResponseResult from "@bundle:com.example.newsrelease/entry/ets/viewmodel/ResponseResult";
import Constants from "@bundle:com.example.newsrelease/entry/ets/common/constants/Constants";
import type { ContentType } from "@bundle:com.example.newsrelease/entry/ets/common/constants/Constants";
/**
 * Initiate an HTTP GET request to the specified URL.
 *
 * @param url URL for initiating an HTTP request.
 */
export function httpRequestGet(url: string) {
    return httpRequest(url, http.RequestMethod.GET);
}
/**
 * Initiate an HTTP POST request to the specified URL.
 *
 * @param url URL for initiating an HTTP request
 * @param newsData Additional data of the request
 * @returns
 */
export function httpRequestPost(url: string, newsData: NewsData) {
    return httpRequest(url, http.RequestMethod.POST, newsData);
}
/**
 * Initiates an HTTP request to a given URL.
 *
 * @param url URL for initiating an HTTP request
 * @param method Request method.
 * @param extraData Additional data of the request.
 * @returns Returns {@link ResponseResult}.
 */
function httpRequest(url: string, method: http.RequestMethod, params?: NewsData): Promise<ResponseResult> {
    let httpRequest = http.createHttp();
    let responseResult = httpRequest.request(url, {
        method: method,
        readTimeout: Constants.HTTP_READ_TIMEOUT,
        header: {
            'Content-Type': "application/json"
        },
        connectTimeout: Constants.HTTP_READ_TIMEOUT,
        extraData: params
    });
    let serverData = new ResponseResult();
    // Processes the data and returns.
    return responseResult.then((value: http.HttpResponse) => {
        if (value.responseCode === Constants.HTTP_CODE_200) {
            // Obtains the returned data.
            let result = `${value.result}`;
            let resultJson: ResponseResult = JSON.parse(result);
            if (resultJson.code === Constants.SERVER_CODE_SUCCESS) {
                serverData.data = resultJson.data;
            }
            serverData.code = resultJson.code;
            serverData.msg = resultJson.msg;
        }
        else {
            serverData.msg = `${{ "id": 16777224, "type": 10003, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" }}&${value.responseCode}`;
        }
        return serverData;
    }).catch(() => {
        serverData.msg = { "id": 16777224, "type": 10003, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" };
        return serverData;
    });
}
