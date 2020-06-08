<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="phone"
        left-icon="phone-o"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      />
      <van-field
        v-model="password"
        left-icon="comment-o"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <template #button>
          <van-button
            native-type="button"
            size="small"
            type="default"
            :disabled="disabled"
            @click.native="getCaptcha"
          >{{captcha}}</van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// import { Toast } from "vant";
export default {
  data() {
    return {
      // 表单
      phone: "",
      password: "",
      // 验证码按钮
      captcha: "获取验证码",
      disabled: false,
      reciprocal: 60
    };
  },
  methods: {
    //   获取验证码
    getCaptcha() {
      if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.$toast.fail({
          message: "请输入正确的11位手机号",
          duration: 1000
        });
      } else {
        //   
        this.countdown();
        // this.$axios.get(`/v1_0/sms/codes/:${this.phone}`).then(res => {
        //     console.log(res)
        // });
      }
    },
    // 60s倒计时
    countdown() {
      if (this.reciprocal <= 0) {
        this.captcha = "获取验证码";
        this.disabled = false;
        this.reciprocal = 60;
        clearTimeout(timer);
        return;
      } else {
        this.disabled = true;
        this.captcha = `重新发送（${this.reciprocal}s）`;
        this.reciprocal--;
      }
      let timer = setTimeout(() => {
        this.getCaptcha();
      }, 1000);
    },
    // 登录
    onSubmit() {}
  }
};
</script>

<style lang="less">
.login {
  .van-cell {
    padding: 15px;
  }
}
</style>