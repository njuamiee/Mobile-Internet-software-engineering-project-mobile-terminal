import { router } from '@kit.ArkUI';
import Constants from '../common/constants/Constants';
import { fetchUserProfile, UserObj } from '../common/utils/UserService'; // 假设有一个服务获取用户数据
import { showToast } from '../common/utils/ToastUtil';

/**
 * UserProfilePage.
 */


@Entry
@Component
struct UserProfilePage {
  @State user: UserObj | null = null;
  /* 打的桩:
{
    username: "123",
    role: "hhh",
    imgURL: "",
    createTime: "2024-12-11",
    followList: [],
    fansList: [],
    likeNewsList: [],
    collectNewsList: [],
    createNewsList: [],
    likeCommentList: [],
    createCommentList: []
  }
 */

  aboutToAppear() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    fetchUserProfile().then((data : UserObj) => {
      this.user = {
        id: data.id,
        username: data.username,
        role: data.role,
        imgURL: data.imgURL,
        createTime: new Date(data.createTime).toLocaleString(),
        followList: data.followList || [],
        fansList: data.fansList || [],
        likeNewsList: data.likeNewsList || [],
        collectNewsList: data.collectNewsList || [],
        createNewsList: data.createNewsList || [],
        likeCommentList: data.likeCommentList || [],
        createCommentList: data.createCommentList || [],
      };
    }).catch(() => {
      showToast('Failed to load user profile.');
    });
  }

  build() {
    if (!this.user) {
      Column() {
        Text('请登录以查看您的个人信息')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .margin({ bottom: 20 });

        Button('登录/注册')
          .onClick(() => router.push({ url: 'pages/UserLogin' })) // 跳转到登录/注册页面
          .backgroundColor(Color.Blue)
          .width('60%')
          .height(50)
          .margin({ top: 20 });
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
        Text('关注数: ' + this.user.followList.length).fontSize(16).margin({ bottom: 5 });
        Text('粉丝数: ' + this.user.fansList.length).fontSize(16).margin({ bottom: 5 });
        Text('点赞的新闻: ' + this.user.likeNewsList.length).fontSize(16).margin({ bottom: 5 });
        Text('收藏的新闻: ' + this.user.collectNewsList.length).fontSize(16).margin({ bottom: 5 });
        Text('创建的新闻: ' + this.user.createNewsList.length).fontSize(16).margin({ bottom: 5 });
        Text('点赞的评论: ' + this.user.likeCommentList.length).fontSize(16).margin({ bottom: 5 });
        Text('创建的评论: ' + this.user.createCommentList.length).fontSize(16).margin({ bottom: 20 });
      }
      .padding({ left: 20, right: 20 });

      // 返回按钮
      Button('返回')
        .onClick(() => router.back())
        .backgroundColor(Color.Blue)
        .width('80%')
        .height(50)
        .alignSelf(ItemAlign.Center)
        .margin({ top: 20 });
    }
    .padding(20);
  }
}
