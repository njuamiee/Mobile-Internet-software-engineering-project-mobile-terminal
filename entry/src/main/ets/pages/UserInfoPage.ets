import { router } from '@kit.ArkUI';
import Constants from '../common/constants/Constants';
import { fetchUserProfile, UserObj } from '../common/utils/UserService'; // 假设有一个服务获取用户数据
import { taskpool } from '@kit.ArkTS';
import { showToast } from '../common/utils/ToastUtil';
import { GlobalContext } from '../viewmodel/GlobalContext';

/**
 * UserProfilePage.
 */


@Entry
@Component
struct UserProfilePage {
  @State user: UserObj | null = null;

  aboutToAppear() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const temp = GlobalContext.getContext().getObject('user');
    if (temp) {
      console.error(temp.toString());
      try {
        this.user = JSON.parse(temp.toString());
      } catch (error) {
        console.error('Error parsing user data from GlobalContext:', error);
        showToast('无法加载用户信息');
      }
    } else {
      showToast('用户信息未找到');
    }
  }

  build() {
    if (!this.user) {
      Column() {
        Text('请登录以查看您的个人信息')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .margin({ bottom: 20, left: 48, top: "30%" });

        Button('登录/注册')
          .onClick(() => router.push({ url: 'pages/UserLogin' })) // 跳转到登录/注册页面
          .backgroundColor(Color.Blue)
          .width('60%')
          .height(50)
          .margin({ top: 20, left: 45 });
        Button('返回')
          .onClick(() => router.back())
          .backgroundColor(Color.Blue)
          .width('60%')
          .height(50)
          .alignSelf(ItemAlign.Center)
          .margin({ top: 20, left: 45 });
      }
      .align(Alignment.Center)
      .padding(20);

    }else Column() {
      // 用户头像和基本信息
      Column() {
        Image(this.user.imgURL || $r('app.media.ic_user'))
          .width("200px")
          .height("200px")
          .objectFit(ImageFit.Cover)
          .borderRadius("20px")
          .margin({ bottom: 10 });

        Text(`用户名: ${this.user.username}`)
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .margin({ bottom: 5 });

        Text(`角色: ${this.user.role}`)
          .fontSize(16)
          .fontColor(Color.Grey)
          .margin({ bottom: 5 });

        Text(`创建时间: ${this.user.createTime}`)
          .fontSize(16)
          .fontColor(Color.Grey)
          .margin({ bottom: 20 });
      }
      .align(Alignment.Center);

      // 用户详情信息
      Column() {
        // 确保这些列表是存在且不为 null 或 undefined
        Text('点赞的新闻: ' + (this.user.likeNewsList?.length || 0)).fontSize(16).margin({ bottom: 5 });
        Text('收藏的新闻: ' + (this.user.collectNewsList?.length || 0)).fontSize(16).margin({ bottom: 5 });
        Text('创建的新闻: ' + (this.user.createNewsList?.length || 0)).fontSize(16).margin({ bottom: 5 });
      }
      .padding({ left: 20, right: 20 });

      // 返回按钮
      Button('返回')
        .onClick(() => router.replace({url: "pages/MainPage"}))
        .backgroundColor(Color.Blue)
        .width('100%')
        .height(50)
        .alignSelf(ItemAlign.Center)
        .margin({ top: 20 });
    }
    .padding(20);
  }
}
