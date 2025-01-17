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

import { router } from '@kit.ArkUI';
import Constants from '../common/constants/Constants';
import { fileSelect,  } from '../common/utils/FileUtil';
import { NewsFile, NewsData } from '../viewmodel/NewsData';
import NewsViewModel from '../viewmodel/NewsViewModel';
import { showToast } from '../common/utils/ToastUtil';
import UploadingLayout from '../view/UploadingLayout';
import ResponseResult from '../viewmodel/ResponseResult';
import { GlobalContext } from '../viewmodel/GlobalContext';

/**
 * NewsEditPage.
 */
@Entry
@Component
struct NewsEditPage {
  title: string = '';
  content: string = '';
  type: string = '国内';





  uploadNewsData() {
    // 检查标题是否为空
    if (this.title === '') {
      showToast($r('app.string.prompt_no_title'));
      return;
    }

    // 检查内容是否为空
    if (this.content === '') {
      showToast($r('app.string.prompt_no_content'));
      return;
    }
    this.handleNewsUpload();

  }

  // 封装处理新闻上传的逻辑
  handleNewsUpload() {


    let newsData: NewsData = new NewsData();
    newsData.title = this.title;
    newsData.content = this.content;
    newsData.type = this.type;
    newsData.authorId =  Number(GlobalContext.getContext().getObject('id')) ;
    NewsViewModel.uploadNews(newsData).then(() => {

      GlobalContext.getContext().setObject('isBackRouter', true);
      router.back(); // 成功后返回
    }).catch(() => {

      showToast($r('app.string.upload_error_message')); // 上传失败提示
    });
  }

  build() {
    Stack() {
      Navigation() {
        Column() {
          Column() {
            //下拉框组件
            Select([
              { value: '国内'},
              { value: '国际'},
              { value: '娱乐'},
              { value: '军事'},
              { value: '体育'},
              { value: '科技'}
            ]).selected(0)  //默认选择的城市
              .value('请选择新闻类型,默认国内') //提示文本
              .font({size:10, weight: FontWeight.Medium})
              .onSelect((index,value) =>{
               this.type=value;
              })

              .margin({ bottom: $r('app.float.normal_padding') })

            Divider()
              .opacity($r('app.float.divider_opacity'))
              .color($r('app.color.title_color'))
              .width(Constants.DIVIDER_WIDTH)

            TextInput({ placeholder: $r('app.string.title_default_text') })
              .fontSize($r('app.float.title_font'))
              .placeholderFont({ size: $r('app.float.title_font') })
              .margin({ top: $r('app.float.common_padding') })
              .fontColor($r('app.color.title_color'))
              .backgroundColor(Color.White)
              .onChange((value: string) => {
                this.title = value;
              })
              .width(Constants.FULL_PERCENT)
              .height($r('app.float.input_height'))
            Divider()
              .opacity($r('app.float.divider_opacity'))
              .color($r('app.color.title_color'))
              .width(Constants.DIVIDER_WIDTH)
            TextArea({ placeholder: $r('app.string.content_default_text') })
              .placeholderFont({ size: $r('app.float.title_font') })
              .fontColor($r('app.color.title_color'))
              .height($r('app.float.area_height'))
              .fontSize($r('app.float.title_font'))
              .margin({ top: $r('app.float.normal_padding') })
              .backgroundColor(Color.White)
              .onChange((value: string) => {
                this.content = value;
              })



          }
          .borderRadius($r('app.float.edit_view_radius'))
          .backgroundColor(Color.White)
          .width(Constants.FULL_PERCENT)

          Button($r('app.string.release_btn'))
            .fontSize($r('app.float.title_font'))
            .height($r('app.float.release_btn_height'))
            .width($r('app.float.release_btn_width'))
            .margin({ bottom: $r('app.float.common_padding') })
            .onClick(() => this.uploadNewsData())
        }
        .padding({
          left: $r('app.float.common_padding'),
          right: $r('app.float.common_padding'),
          bottom: $r('app.float.common_padding')
        })
        .height(Constants.FULL_PERCENT)
        .justifyContent(FlexAlign.SpaceBetween)
      }
      .height(Constants.FULL_PERCENT)
      .title(Constants.RELEASE_TITLE)
      .titleMode(NavigationTitleMode.Mini)
      .backgroundColor($r('app.color.listColor'))


    }
  }
}

