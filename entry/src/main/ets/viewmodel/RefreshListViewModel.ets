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

import { promptAction } from '@kit.ArkUI';
import Constants, { RefreshConstant, RefreshState } from '../common/constants/Constants';
import NewsViewModel from './NewsViewModel';
import { NewsData } from './NewsData';
import RefreshLoadingClass from './RefreshLoadingClass';

@Observed
export default class RefreshListViewModel {
  private downY = 0;
  private lastMoveY = 0;
  private isRefreshing: boolean = false;
  private isCanRefresh = false;
  private isPullRefreshOperation = false;

  public newsData: Array<NewsData> = [];
  public refreshLayoutClass: RefreshLoadingClass = new RefreshLoadingClass($r('app.media.ic_pull_down_refresh'),
    $r('app.string.pull_down_refresh_text'), 0);

  public offsetY: number = 0;

  listTouchEvent(event: TouchEvent) {
    switch (event.type) {
      case TouchType.Down:
        this.downY = event.touches[0].y;
        this.lastMoveY = event.touches[0].y;
        break;
      case TouchType.Move:
        if (this.isRefreshing) {
          return;
        }
        let isDownPull = event.touches[0].y - this.lastMoveY > 0;
        if (isDownPull && !this.isCanRefresh) {
          // Touch move pull refresh.
          this.touchMovePullRefresh(event);
        }
        this.lastMoveY = event.touches[0].y;
        break;
      case TouchType.Up:
        if (this.isRefreshing) {
          return;
        }
        if (this.isPullRefreshOperation) {
          // Touch up pull refresh.
          this.touchUpPullRefresh();
        }
        break;
      default:
        break;
    }
  }

  touchMovePullRefresh(event: TouchEvent) {

      this.isPullRefreshOperation = true;
      let height = vp2px(Constants.CUSTOM_LAYOUT_HEIGHT);
      this.offsetY = event.touches[0].y - this.downY;
      // Check offsetY to Refresh.
      if (this.offsetY >= height) {
        this.pullRefreshState(RefreshState.Release);
        this.offsetY = height + this.offsetY * Constants.Y_OFF_SET_COEFFICIENT;
      } else {
        this.pullRefreshState(RefreshState.DropDown);
      }
      if (this.offsetY < 0) {
        this.offsetY = 0;
        this.isPullRefreshOperation = false;
      }

  }

  touchUpPullRefresh() {
    if (this.isCanRefresh) {
      this.offsetY = vp2px(Constants.CUSTOM_LAYOUT_HEIGHT);
      this.pullRefreshState(RefreshState.Refreshing);
      setTimeout(() => {
        NewsViewModel.getNewsList().then((data: NewsData[]) => {
          this.newsData = data;
          this.closeRefresh(true);
        }).catch((errMsg: string | Resource) => {
          promptAction.showToast({ message: errMsg });
          this.closeRefresh(false);
        });
      }, Constants.DELAY_TIME);
    } else {
      this.closeRefresh(false);
    }
  }

  pullRefreshState(state: number) {
    switch (state) {
      case RefreshState.DropDown:
        this.isCanRefresh = false;
        this.isRefreshing = false;
        this.refreshLayoutClass = new RefreshLoadingClass($r('app.media.ic_pull_down_refresh'),
          $r('app.string.pull_down_refresh_text'), Constants.CUSTOM_LAYOUT_HEIGHT);
        break;
      case RefreshState.Release:
        this.refreshLayoutClass.imageSrc = $r('app.media.ic_pull_up_refresh');
        this.refreshLayoutClass.textValue = $r('app.string.release_refresh_text');
        this.isCanRefresh = true;
        this.isRefreshing = false;
        break;
      case RefreshState.Refreshing:
        this.refreshLayoutClass.imageSrc = $r('app.media.ic_pull_up_load');
        this.refreshLayoutClass.textValue = $r('app.string.refreshing_text');
        this.isCanRefresh = true;
        this.isRefreshing = true;
        break;
      case RefreshState.Success:
        this.refreshLayoutClass.imageSrc = $r('app.media.ic_succeed_refresh');
        this.refreshLayoutClass.textValue = $r('app.string.refresh_success_text');
        this.isCanRefresh = true;
        this.isRefreshing = true;
        break;
      case RefreshState.Fail:
        this.refreshLayoutClass.imageSrc = $r('app.media.ic_fail_refresh');
        this.refreshLayoutClass.textValue = $r('app.string.refresh_fail_text');
        this.isCanRefresh = true;
        this.isRefreshing = true;
        break;
      default:
        break;
    }
  }

  closeRefresh(isRefreshSuccess: boolean) {
    setTimeout(() => {
      if (this.isCanRefresh) {
        this.pullRefreshState(isRefreshSuccess ? RefreshState.Success : RefreshState.Fail);
      }
      animateTo({
        duration: RefreshConstant.CLOSE_PULL_DOWN_REFRESH_TIME,
        delay: this.isCanRefresh ? RefreshConstant.DELAY_PULL_DOWN_REFRESH : 0,
        onFinish: () => {
          this.pullRefreshState(RefreshState.DropDown);
          this.refreshLayoutClass.heightValue = 0;
          this.isPullRefreshOperation = false;
        }
      }, () => {
        this.offsetY = 0;
      });
    }, this.isCanRefresh ? Constants.DELAY_ANIMATION_DURATION : 0);
  }
}