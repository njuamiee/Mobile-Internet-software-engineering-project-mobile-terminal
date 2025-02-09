/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Constants from '../common/constants/Constants';
import NewsList from '../view/NewsList';
import { router } from '@kit.ArkUI';
import NewsTypeViewModel from '../viewmodel/NewsTypeViewModel';
import NewsTypeBean from '../viewmodel/NewsTypeModel';
import { GlobalContext } from '../viewmodel/GlobalContext';

/**
 * MainPage
 */
@Entry
@Component
struct MainPage {
  @State tabBarArray: NewsTypeBean[] = NewsTypeViewModel.getDefaultTypeList();
  @State currentIndex: number = 0;

  @Builder TabBuilder(index: number) {
    Column() {
      Text(this.tabBarArray[index].name)
        .height(Constants.FULL_PERCENT)
        .fontSize(this.currentIndex === index ? $r('app.float.bar_selected_font') : $r('app.float.bar_normal_font'))
        .fontWeight(this.currentIndex === index ? Constants.TYPE_FONT_WEIGHT : Constants.DESC_FONT_WEIGHT)
        .fontColor($r('app.color.title_color'))
    }
    .padding({ left: $r('app.float.normal_padding'), right: $r('app.float.normal_padding') })
    .margin({
      left: index === 0 ? $r('app.float.common_padding') : 0,
      right: index === this.tabBarArray.length - 1 ? $r('app.float.common_padding') : 0
    })
  }

  aboutToAppear() {
    // Request news category.

      this.tabBarArray =  NewsTypeViewModel.getDefaultTypeList();

  }

  onPageShow() {
    if (GlobalContext.getContext().getObject('isBackRouter') === true) {
      GlobalContext.getContext().setObject('isBackRouter', false);
      let tempIndex = this.currentIndex;
      this.currentIndex = -1;
      this.currentIndex = tempIndex;
    }
  }

  build() {
    Stack() {
      Tabs() {
        ForEach(this.tabBarArray, (tabsItem: NewsTypeBean, index?: number) => {
          TabContent() {
            NewsList({ index, currentIndex: $currentIndex })
          }
          .tabBar(this.TabBuilder(tabsItem.id))
        }, (tabsItem: NewsTypeBean) => JSON.stringify(tabsItem));
      }
      .barHeight($r('app.float.nav_height'))
      .height(Constants.FULL_PERCENT)
      .barMode(BarMode.Scrollable)
      .onChange((index: number) => {
        this.currentIndex = index;
      })
      .vertical(false)
      Image($r('app.media.ic_user'))
        .width($r('app.float.btn_size'))
        .height($r('app.float.btn_size'))
        .margin({ bottom: "96vp", right: $r('app.float.btn_margin') })
        .onClick(() => {
          router.pushUrl({ url: Constants.USER_INFO_PAGE });
        })
      Image($r('app.media.ic_add'))
        .width($r('app.float.btn_size'))
        .height($r('app.float.btn_size'))
        .margin({ bottom: $r('app.float.btn_margin'), right: $r('app.float.btn_margin') })
        .onClick(() => {
          router.pushUrl({ url: Constants.NEWS_EDIT_PAGE });
        })
    }
    .width(Constants.FULL_PERCENT)
    .height(Constants.FULL_PERCENT)
    .alignContent(Alignment.BottomEnd)
    .backgroundColor($r('app.color.listColor'))
  }
}