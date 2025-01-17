/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import NewsItem from './NewsItem';
import { NewsData } from '../viewmodel/NewsData';
import Constants from '../common/constants/Constants';
import NewsViewModel from '../viewmodel/NewsViewModel';
import { showToast } from '../common/utils/ToastUtil';
import { httpNewResult } from '../common/utils/HTTP';

/**
 * The news list component.
 *
 */



@Component
export default struct NewsList {
  index: number = 0;
  @Watch('changeCategory') @Link currentIndex: number;
  @State newsData: Array<NewsData> = [];


   getNewsTypeByIndex(index: number): string | null {
  switch (index) {
    case 1:
      return "DOMESTIC";
    case 2:
      return "INTERNATIONAL";
    case 3:
      return "ENTERTAINMENT";
    case 4:
      return "MILITARY";
    case 5:
      return "SPORTS";
    case 6:
      return "TECHNOLOGY";
    default:
      console.warn(`Invalid index: ${index}`);
      return null;  // 返回 null 如果索引无效
  }
}

  changeCategory() {
    if (this.currentIndex !== this.index) {
      return;
    }
if(this.currentIndex==0) {
  NewsViewModel.getNewsList()
    .then((data) => {
      const response: string = JSON.stringify(data.result)
      console.log(JSON.parse(response));
      let res: httpNewResult = JSON.parse(data.result.toString()) as httpNewResult;
      this.newsData = res.result;
    })
    .catch((err: string | Resource) => {
      showToast(err);
    });
}else{
  const newsType = this.getNewsTypeByIndex(this.currentIndex);
  NewsViewModel.getNewsListType(newsType as string)
    .then((data) => {
      const response: string = JSON.stringify(data.result)
      console.log(JSON.parse(response));
      let res: httpNewResult = JSON.parse(data.result.toString()) as httpNewResult;
      this.newsData = res.result;
    })
    .catch((err: string | Resource) => {
      showToast(err);
    });
}

  }

  aboutToAppear() {
    // Load data on appearance
    this.changeCategory();
  }

  build() {
    Column() {
      // Main layout for displaying news items
      this.ListLayout();
    }
    .width(Constants.FULL_PERCENT)
    .height(Constants.FULL_PERCENT)
    .justifyContent(FlexAlign.Center);
  }

  @Builder ListLayout() {
    List({ space: Constants.LIST_SPACE }) {
      ForEach(this.newsData, (item: NewsData) => {
        ListItem() {
          NewsItem({ newsData: item });
        }
        .backgroundColor($r('app.color.white'))
        .borderRadius($r('app.float.item_border_radius'));
      }, (item: NewsData, index?: number) => JSON.stringify(item) + index);
    }
    .width(Constants.FULL_PERCENT)
    .height(Constants.FULL_PERCENT)
    .padding({ left: $r('app.float.common_padding'), right: $r('app.float.common_padding') })
    .backgroundColor($r('app.color.listColor'));
  }
}