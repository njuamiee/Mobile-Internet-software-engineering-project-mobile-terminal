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
import LoadMoreLayout from './LoadMoreLayout';
import RefreshLayout from './RefreshLayout';
import { NewsData } from '../viewmodel/NewsData';
import Constants, { PageState } from '../common/constants/Constants';
import NewsViewModel from '../viewmodel/NewsViewModel';
import { showToast } from '../common/utils/ToastUtil';
import FailureLayout from './FailureLayout';
import LoadingLayout from './LoadingLayout';
import NoMoreLayout from './NoMoreLayout';
import RefreshListViewModel from '../viewmodel/RefreshListViewModel';

/**
 * The news list component.
 */
@Component
export default struct NewsList {
  index: number = 0;
  @Watch('changeCategory') @Link currentIndex: number;
  @State refreshStore: RefreshListViewModel = new RefreshListViewModel();

  changeCategory() {
    if (this.currentIndex !== this.index) {
      return;
    }

    NewsViewModel.getNewsList().then((data: NewsData[]) => {


      this.refreshStore.newsData = data;
    }).catch((err: string | Resource) => {
      showToast(err);

    });
  }

  aboutToAppear() {
    // Load data.
    this.changeCategory();
  }

  reloadAction() {

    this.changeCategory();
  }

  build() {
    Column() {

        FailureLayout({ reloadAction: () => {
          this.reloadAction();
        } })

    }
    .width(Constants.FULL_PERCENT)
    .height(Constants.FULL_PERCENT)
    .justifyContent(FlexAlign.Center)

  }

  @Builder ListLayout() {
    List({ space: Constants.LIST_SPACE }) {
      ListItem() {
       RefreshLayout({ refreshLoadingClass: this.refreshStore.refreshLayoutClass })
      }
      ForEach(this.refreshStore.newsData, (item: NewsData) => {
        ListItem() {
          NewsItem({ newsData: item })
        }
        .backgroundColor($r('app.color.white'))
        .borderRadius($r('app.float.item_border_radius'))
      }, (item: NewsData, index?: number) => JSON.stringify(item) + index)
      ListItem() {

      }
    }
    .width(Constants.FULL_PERCENT)
    .height(Constants.FULL_PERCENT)
    .padding({ left: $r('app.float.common_padding'), right: $r('app.float.common_padding') })
    .backgroundColor($r('app.color.listColor'))
    .edgeEffect(EdgeEffect.None)

  }
}