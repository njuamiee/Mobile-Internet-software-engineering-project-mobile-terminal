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

import { NewsData } from '../viewmodel/NewsData';
import Constants from '../common/constants/Constants';
import NewsViewModel from '../viewmodel/NewsViewModel';
import { router } from '@kit.ArkUI';

/**
 * The news list item component.
 */
@Component
export default struct NewsItem {
  newsData: NewsData = new NewsData();

  // 点赞事件
  async likeNews() {
    try {
      await NewsViewModel.likeNews(this.newsData.id.toString()); // 调用点赞接口
      this.newsData.likeCount += 1; // 增加点赞数
    } catch (error) {
      console.error('点赞失败:', error);
    }
  }

  build() {
    Column() {
      Row() {
        Image($r('app.media.ic_news'))
          .height("30fp")
          .aspectRatio(Constants.TYPE_ASPECT_RATIO)
        Text(this.newsData?.title)
          .fontSize("30fp")
          .fontColor($r('app.color.title_color'))
          .layoutWeight(1)
          .maxLines(1)
          .lineHeight($r('app.float.title_line_height'))
          .fontFamily($r('app.string.harmony_hei_ti_medium'))
          .margin({ left: $r('app.float.normal_padding') })
          .textOverflow({ overflow: TextOverflow.Ellipsis })
          .fontWeight(Constants.TITLE_FONT_WEIGHT)
      }
      .alignItems(VerticalAlign.Center)
      .width(Constants.FULL_PERCENT)

      Text(this.newsData?.content)
        .fontSize("20fp")
        .fontFamily($r('app.string.harmony_hei_ti'))
        .opacity(Constants.DESC_OPACITY)
        .fontColor($r('app.color.title_color'))
        .lineHeight($r('app.float.desc_line_height'))
        .width(Constants.FULL_PERCENT)
        .maxLines(Constants.CONTENT_MAX_LINE)
        .fontWeight(Constants.DESC_FONT_WEIGHT)
        .textOverflow({ overflow: TextOverflow.Ellipsis })

      Text(this.newsData?.source)
        .fontSize($r('app.float.source_font'))
        .fontColor($r('app.color.fontColor_text2'))
        .width(Constants.FULL_PERCENT)
        .margin({ top: $r('app.float.normal_padding') })

      Row() {
        Image($r('app.media.ic_like'))
          .width(40)
          .height(40)
          .margin({ bottom: 0, right: 0 })
          .onClick(() => this.likeNews())
        Text(`点赞数: ${this.newsData.likeCount == null ? 0 : this.newsData.likeCount}`)
          .fontSize($r('app.float.desc_font'))
          .fontColor($r('app.color.title_color'))
          .margin({ left: 10 })
      }
      .alignItems(VerticalAlign.Center)
      .justifyContent(FlexAlign.Start)
      .margin({ top: 10 })
    }
    .padding($r('app.float.common_padding'))
    .backgroundColor($r('app.color.white'))
    .borderRadius(10);
  }

}
