import { router } from '@kit.ArkUI';
import { showToast } from '../common/utils/ToastUtil';
import { registerService } from '../common/utils/UserService'; // 假设有一个注册服务

@Entry
@Component
struct RegisterPage {
  @State username: string = '';
  @State password: string = '';
  @State confirmPassword: string = '';
  @State isRegistering: boolean = false;

  register() {
    if (!this.username || !this.password || !this.confirmPassword) {
      showToast('用户名或密码不能为空');
      return;
    }

    if (this.password !== this.confirmPassword) {
      showToast('两次密码输入不一致');
      return;
    }

    this.isRegistering = true;

    registerService(this.username, this.password)
      .then(() => {
        this.isRegistering = false;
        showToast('注册成功');
        router.replace({ url: 'pages/LoginPage' }); // 注册成功后跳转到登录页
      })
      .catch(() => {
        this.isRegistering = false;
        showToast('注册失败，请重试');
      });
  }

  build() {
    Column() {
      // 标题
      Text('注册')
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
        .margin({ bottom: 20 })
        .onChange((value: string) => {
          this.password = value;
        })
        .width('80%')
        .height(50)
        .padding({ left: 10 });

      // 确认密码输入框
      TextInput({ placeholder: '请再次输入密码'})
        .fontSize(18)
        .backgroundColor(Color.White)
        .margin({ bottom: 30 })
        .onChange((value: string) => {
          this.confirmPassword = value;
        })
        .width('80%')
        .height(50)
        .padding({ left: 10 });

      // 注册按钮
      Button('注册')
        .onClick(() => this.register())
        .backgroundColor(Color.Blue)
        .fontSize(18)
        .width('80%')
        .height(50)
        .alignSelf(ItemAlign.Center);

      // 返回登录按钮
      Text('已有账号？')
        .fontSize(16)
        .margin({ top: 20 });

      Button('返回登录')
        .onClick(() => router.replace({ url: 'pages/LoginPage' })) // 跳转到登录页面
        .backgroundColor(Color.Gray)
        .fontSize(16)
        .width('60%')
        .height(40)
        .alignSelf(ItemAlign.Center)
        .margin({ top: 10 });
    }
    .align(Alignment.Center)
    .padding(20);
  }
}
