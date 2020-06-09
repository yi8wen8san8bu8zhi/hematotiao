<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="mobile"
        left-icon="mobile-o"
        placeholder="请输入手机号"
        :rules="[{ pattern: /^1[3456789]\d{9}$/, message: '请输入手机号' }]"
      />
      <van-field
        v-model="code"
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
import { login } from "@/util/api.js";
export default {
  data() {
    return {
      // 表单
      mobile: "",
      code: "",
      // 验证码按钮
      captcha: "获取验证码",
      disabled: false,
      reciprocal: 60
    };
  },
  methods: {
    //   获取验证码
    getCaptcha() {
      if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
        this.$toast.fail({
          message: "请输入正确的11位手机号",
          duration: 1000
        });
      } else {
        this.countdown();
        this.$axios
          .get("/v1_0/sms/codes/" + this.mobile)
          .then(res => {
            this.$toast.fail("验证码已发送");
          })
          .catch(err => {
            if (err.response.status == 429) {
              this.$toast.fail("访问太频繁");
            } else {
              this.$toast.fail("失败，请重试");
            }
          });
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
        this.countdown();
      }, 1000);
    },
    // 登录
    async onSubmit() {
      try {
        let res = await login(this.mobile, this.code);
        this.$store.commit("setUser", res.data.data);
        this.$router.push("/");
      } catch (error) {
        this.$toast.fail("登录失败，请重试！");
      }
    }
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