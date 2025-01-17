import { router } from '@kit.ArkUI';
import { showToast } from '../common/utils/ToastUtil';
import { loginService } from '../common/utils/UserService';
import { taskpool } from '@kit.ArkTS';

@Entry
@Component
struct LoginPage {
  @State username: string = '';
  @State password: string = '';
  @State isLoggingIn: boolean = false;

  login() {
    if (!this.username || !this.password) {
      showToast('用户名和密码不能为空');
      return;
    }

    this.isLoggingIn = true;

    loginService(this.username, this.password)
      .then(() => {
        this.isLoggingIn = false;
        showToast('登录成功');
        router.replace({ url: 'pages/UserInfoPage' }); // 登录成功后跳转到用户个人信息页
      })
      .catch((err: string) => {
        console.error("Login failed: " + err);
        this.isLoggingIn = false;
        showToast('登录失败，请检查用户名和密码');
      });
  }

  build() {
    Column() {
      // 标题
      Text('登录')
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .margin({ bottom: 30 });

      // 用户名输入框
      TextInput({ placeholder: '请输入用户名' })
        .fontSize(18)
        .backgroundColor(Color.White)
        .margin({ bottom: 20 })
        .onChange((value: string) => {
          this.username = value;
        })
        .width('80%')
        .height(50)
        .padding({ left: 10 });

      // 密码输入框
      TextInput({ placeholder: '请输入密码'})
        .fontSize(18)
        .backgroundColor(Color.White)
        .margin({ bottom: 30 })
        .onChange((value: string) => {
          this.password = value;
        })
        .width('80%')
        .height(50)
        .padding({ left: 10 });

      // 登录按钮
      Button('登录')
        .onClick(() => this.login())
        .backgroundColor(Color.Blue)
        .fontSize(18)
        .margin({left: 32})
        .width('80%')
        .height(50)
        .alignSelf(ItemAlign.Center);

      // 注册按钮
      Text('还没有账号？')
        .fontSize(16)
        .margin({ top: 20, left: 30 });

      Button('注册')
        .onClick(() => router.push({ url: 'pages/UserRegister' })) // 跳转到注册页
        .backgroundColor(Color.Gray)
        .fontSize(16)
        .width('60%')
        .height(40)
        .alignSelf(ItemAlign.Center)
        .margin({ top: 10, left: 30 });
    }
    .align(Alignment.Center)
    .padding(20);
  }
}
